import React from "react";
import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { IssueRouteParam } from "../../App";
import { useQuery } from "@apollo/client";
import { Col, Divider, Row, Skeleton } from "antd";
import {
  ISSUE_DETAILS_QUERY,
  IssueDetailsParam,
  IssueDetailsResponse,
} from "./IssueDetailsQuery";
import { Issue as IssueSchemaType } from "../../SchemaTypes/types";
import parse from "html-react-parser";
import { timeSince } from "../../utils/helpers/date";
export type IssueDetail = IssueSchemaType;
export const IssueDetails: FunctionComponent = () => {
  const { issueId } = useParams<IssueRouteParam>();
  const { data, error, loading } = useQuery<
    IssueDetailsResponse,
    IssueDetailsParam
  >(ISSUE_DETAILS_QUERY, {
    variables: { issueNumber: parseInt(issueId) },
  });
  if (!data && loading) {
    return <Skeleton active />;
  }
  if (error) {
    return <>Data loading error</>;
  }
  return <DetailsComponent issue={data.repository.issue}></DetailsComponent>;
};

const DetailsComponent: FunctionComponent<{ issue: IssueDetail }> = ({
  issue,
}) => {
  return (
    <Row>
      <Col span={8}>
        <span>#{issue.number}</span> created by {issue.author.login}{" "}
        {timeSince(new Date(issue.createdAt))} ago
      </Col>
      <Col span={24}>
        <p> {parse(issue.bodyHTML)} </p>
      </Col>
      <Col span={24}>
        <Divider orientation="left">Comments</Divider>
        {issue.comments.edges.map(({ node: comment }, index) => {
          return (
            <React.Fragment key={index}>
              <Divider orientation="left">
                {comment.author.login} replied
              </Divider>
              <br />
              <p> {parse(comment.bodyHTML)} </p>
            </React.Fragment>
          );
        })}
      </Col>
    </Row>
  );
};
