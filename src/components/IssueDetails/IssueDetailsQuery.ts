import { gql } from "@apollo/client";
import { IssueDetail } from "./IssueDetails";

export const ISSUE_DETAILS_QUERY = gql`
  query GetIssueBy($issueNumber: Int!) {
    repository(name: "react", owner: "facebook") {
      issue(number: $issueNumber) {
        id
        title
        bodyHTML
        url
        state
        createdAt
        author {
          login
        }
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
export type IssueDetailsParam = {
  issueNumber: number;
};
export type IssueDetailsResponse = {
  repository: { issue: IssueDetail };
};
