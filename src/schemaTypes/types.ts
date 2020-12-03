/*
In reality this types will be generated by graphql-codegen from the graph schema through CI & will be used for other clients via npm.
* */

export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JSON: any;
  MongoID: any;
};
export type Maybe<T> = T | null;
export interface Issue {
  __typename?: "Issue";
  id: string;
  title: string;
  url: string;
  state: string;
  author: User;
  bodyHTML: string;
  createdAt: string;
  comments: CommentConnection;
  number: number;
}

interface Comment {
  id: string;
  author: User;
  bodyHTML: string;
}
interface User {
  __typename?: "User";
  login: string;
}
export type CommentConnection = {
  __typename?: "CommentConnection";
  totalCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<CommentsEdge>;
};
export type IssueConnection = {
  __typename?: "IssueConnection";
  issueCount: Scalars["Int"];
  pageInfo: PageInfo;
  edges: Array<IssueEdge>;
};

export type IssueEdge = {
  __typename?: "SearchResultItemEdge";
  node: Issue;
  cursor: Scalars["String"];
};
export type CommentsEdge = {
  __typename?: "CommentsEdge";
  node: Comment;
  cursor: Scalars["String"];
};

export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: boolean;
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
};