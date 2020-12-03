import { gql } from "@apollo/client";
import { IssueConnection } from "../../SchemaTypes/types";
import { IssueSearchParam } from "../SearchArea";

export const ISSUE_LIST_QUERY = gql`
  query GetIssueBy($searchText: String!, $first: Int, $after: String) {
    search(query: $searchText, type: ISSUE, first: $first, after: $after)
      @connection(key: "search", filter: ["query"]) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      issueCount
      edges {
        node {
          ... on Issue {
            id
            title
            url
            state
            createdAt
            author {
              login
            }
            comments {
              __typename
              totalCount
            }
            number
          }
        }
      }
    }
  }
`;


export type IssueStatus = "CLOSED" | "OPEN";
export type IssueListParam = {
  searchText: string;
  first: number;
  after?: string;
};
export type IssueListResponse = {
  search: IssueConnection;
};
export const IssueListQueryBuilder = (
  searchParam: IssueSearchParam,
  endCursor?: string
): IssueListParam => {
  const { searchText, issueState } = searchParam;
  return {
    first: 20,
    after: endCursor ? endCursor : null,
    searchText: `repo:facebook/react ${
      issueState ? `is:${issueState}` : ``
    } in:title  in:body ${searchText}`,
  };
};
