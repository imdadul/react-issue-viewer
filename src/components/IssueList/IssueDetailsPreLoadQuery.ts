import { gql } from "@apollo/client";
import { Issue } from "../../schemaTypes/types";

export const ISSUE_DETAILS_PRE_LOAD_QUERY = gql`
  query GetIssueBy($issueNumber: Int!) {
    repository(name: "react", owner: "facebook") {
      issue(number: $issueNumber) {
        id
        bodyHTML
        comments(first: 50) {
          edges {
            node {
              author {
                login
              }
              bodyHTML
            }
          }
        }
      }
    }
  }
`;
export type IssueDetailsPreLoadParam = {
  issueNumber: number;
};
export type IssueDetailsPreLoadResponse = {
  repository: { issue: Issue };
};
