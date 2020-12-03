import React, { FunctionComponent } from "react";
import { Badge, Button, Skeleton, Table } from "antd";
import { Link } from "react-router-dom";
import { Issue as IssueSchemaType } from "../../SchemaTypes/types";
import { ApolloClient, useQuery } from "@apollo/client";
import {
  ISSUE_LIST_QUERY,
  IssueListParam,
  IssueListQueryBuilder,
  IssueListResponse,
} from "./IssueListQuery";
import { timeSince } from "../../utils/helpers/date";
import { RightCircleFilled } from "@ant-design/icons";
import { IssueSearchParam } from "../SearchArea";
import {
  ISSUE_DETAILS_PRE_LOAD_QUERY,
  IssueDetailsPreLoadParam,
  IssueDetailsPreLoadResponse,
} from "./IssueDetailsPreLoadQuery";
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
  fetchMore: (endCursor: string) => void;
  client: ApolloClient<any>;
};

const IssueList: FunctionComponent<issueListProps> = ({
  param: { issueState, searchText },
}) => {
  const { data, error, loading, fetchMore, client } = useQuery<
    IssueListResponse,
    IssueListParam
  >(ISSUE_LIST_QUERY, {
    variables: IssueListQueryBuilder({ issueState, searchText }),
  });
  if (!data && loading) {
    return <Skeleton active />;
  }
  if (error) {
    return <>Data loading error</>;
  }
  const fetchMoreWrapper = async (endCursor: string): Promise<void> => {
    await fetchMore({
      variables: IssueListQueryBuilder({ issueState, searchText }, endCursor),
    });
  };
  return (
    <IssueListTable data={data} fetchMore={fetchMoreWrapper} client={client} />
  );
};

const IssueListTable: FunctionComponent<IssueTableProp> = ({
  data,
  fetchMore,
  client,
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
              <Link
                to={{
                  pathname: `issues/${record.number}`,
                  state: { id: record.number },
                }}
                onMouseOver={() =>
                  client.query<
                    IssueDetailsPreLoadResponse,
                    IssueDetailsPreLoadParam
                  >({
                    query: ISSUE_DETAILS_PRE_LOAD_QUERY,
                    variables: { issueNumber: record.number },
                  })
                }
                style={{ textDecoration: "none" }}
              >
                {record.title}
              </Link>
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
