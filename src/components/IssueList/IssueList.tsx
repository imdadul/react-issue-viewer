import React, { FunctionComponent } from "react";
import { Skeleton } from "antd";
import { Issue as IssueSchemaType } from "../../schemaTypes/types";
import { useQuery } from "@apollo/client";
import {
  ISSUE_LIST_QUERY,
  IssueListParam,
  IssueListQueryBuilder,
  IssueListResponse,
} from "./IssueListQuery";
import { IssueSearchParam } from "../SearchArea";
import { IssueListTable } from "./IssueListTable";
export type IssueSummary = Pick<
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
export default IssueList;
