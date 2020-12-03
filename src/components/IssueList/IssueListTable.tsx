import React, { FunctionComponent } from "react";
import { Badge, Button, Table } from "antd";
import { Link } from "react-router-dom";
import {
  ISSUE_DETAILS_PRE_LOAD_QUERY,
  IssueDetailsPreLoadParam,
  IssueDetailsPreLoadResponse,
} from "./IssueDetailsPreLoadQuery";
import { timeSince } from "../../utils/helpers/date";
import { IssueListResponse } from "./IssueListQuery";
import { ApolloClient } from "@apollo/client";
import { IssueSummary } from "./IssueList";
import { RightCircleFilled } from "@ant-design/icons";
type IssueTableProp = {
  data: IssueListResponse;
  fetchMore: (endCursor: string) => void;
  client: ApolloClient<any>;
};
export const IssueListTable: FunctionComponent<IssueTableProp> = ({
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
      <div className="h-center">
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
      </div>
    </React.Fragment>
  );
};
