import React, { FunctionComponent } from "react";
import { Badge, Button, Table } from "antd";
import { useHistory } from "react-router-dom";
import { Issue as IssueSchemaType } from "../../SchemaTypes/types";
import { useQuery } from "@apollo/client";
import {
  ISSUE_LIST_QUERY,
  IssueListParam,
  IssueListQueryBuilder,
  IssueListResponse,
} from "./IssueListQuery";
import { timeSince } from "../../utils/helpers/date";
import { RightCircleFilled } from "@ant-design/icons";
import { IssueSearchParam } from "../SearchArea";
type IssueSummary = Pick<
  IssueSchemaType,
  | "id"
  | "title"
  | "url"
  | "author"
  | "createdAt"
  | "comments"
  | "number"
  | "state"
>;
type issueListProps = {
  param: IssueSearchParam;
};

type IssueTableProp = {
  data: IssueListResponse;
  handleClick: (issuenr: number) => void;
  fetchMore: (endCursor: string) => void;
};

const IssueList: FunctionComponent<issueListProps> = ({
  param: { issueState, searchText },
}) => {
  const history = useHistory();
  const handleClick = (id: number) => {
    history.push(`/issues/${id}`);
  };
  const { data, loading, fetchMore } = useQuery<
    IssueListResponse,
    IssueListParam
  >(ISSUE_LIST_QUERY, {
    variables: IssueListQueryBuilder({ issueState, searchText }),
  });
  if (!data && loading) {
    return <>Loading</>;
  }
  if (!loading && !data) {
    return <>Data laoding error</>;
  }
  const fetchMoreWrapper = async (endCursor: string): Promise<void> => {
    await fetchMore({
      variables: IssueListQueryBuilder({ issueState, searchText }, endCursor),
    });
  };
  return (
    <IssueListTable
      data={data}
      handleClick={handleClick}
      fetchMore={fetchMoreWrapper}
    ></IssueListTable>
  );
};

const IssueListTable: FunctionComponent<IssueTableProp> = ({
  data,
  handleClick,
  fetchMore,
}) => {
  return (
    <React.Fragment>
      <Table<IssueSummary>
        dataSource={data.search.edges
          .map((e) => e.node)
          .filter((e) => e.__typename == "Issue")}
        pagination={false}
        scroll={{
          scrollToFirstRowOnChange: false,
        }}
      >
        <Table.Column
          title="Title"
          key={"id"}
          render={(text, record: IssueSummary) => (
            <React.Fragment>
              <a onClick={() => handleClick(record.number)}>{record.title}</a>
              <br />
              <span>#{record.number}</span> created by {record.author.login}{" "}
              {timeSince(new Date(record.createdAt))} ago
              <br />
              {record.state == "CLOSED" && <Badge count={"Closed"} />}
              {record.state == "OPEN" && (
                <Badge
                  className="site-badge-count-109"
                  count={"Open"}
                  style={{ backgroundColor: "#35900b" }}
                />
              )}
              {record.comments.totalCount > 0 && (
                <Badge
                  count={"comments " + record.comments.totalCount}
                  style={{ backgroundColor: "#a19f9a" }}
                  className="site-badge-count-4"
                />
              )}
            </React.Fragment>
          )}
        />
      </Table>
      {data.search.pageInfo.hasNextPage && (
        <Button
          size={"large"}
          type="primary"
          onClick={() => fetchMore(data.search.pageInfo.endCursor)}
          icon={<RightCircleFilled />}
        >
          Load More
        </Button>
      )}
    </React.Fragment>
  );
};
export default IssueList;
