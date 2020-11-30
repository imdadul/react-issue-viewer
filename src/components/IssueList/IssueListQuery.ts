import { gql } from "@apollo/client";
import { IssueConnection } from "../../SchemaTypes/types";

export const IssueListQuery = gql`
  {
    search(
      query: "repo:facebook/react in:title in:title in:body Improved \\"memory leak\\""
      type: ISSUE
      first: 50
    ) {
      edges {
        node {
          ... on Issue {
            id
            createdAt
            title
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
  state: IssueStatus;
};
export type IssueListResponse = {
  search: IssueConnection;
};
