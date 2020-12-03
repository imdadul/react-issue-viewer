import React from "react";
import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { IssueRouteParam } from "../../App";
import { useQuery } from "@apollo/client";
import { Col, Divider, Row, Skeleton } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Typography } from "antd";

const { Text } = Typography;
import { Button } from "antd";
import {
  ISSUE_DETAILS_QUERY,
  IssueDetailsParam,
  IssueDetailsResponse,
} from "./IssueDetailsQuery";
import { Issue as IssueSchemaType } from "../../schemaTypes/types";
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
  return <DetailsComponent issue={data.repository.issue} />;
};

const DetailsComponent: FunctionComponent<{ issue: IssueDetail }> = ({
  issue,
}) => {
  const { goBack } = useHistory();

  return (
    <Row>
      <Col span={24} className="details-header">
        <div className="details-header-title-area">
          <Button
            className="back-button"
            size="large"
            type="primary"
            icon={<LeftOutlined />}
            onClick={goBack}
          >
            back
          </Button>
          <h1>{issue.title}</h1>
        </div>
        <i>
          <span>#{issue.number}</span> created by {issue.author.login}{" "}
          {timeSince(new Date(issue.createdAt))} ago
        </i>
      </Col>
      <Col span={24}>
        <React.Fragment> {parse(issue.bodyHTML)} </React.Fragment>
      </Col>
      <Col span={24}>
        <h1>
          <Text keyboard>Comments</Text>
        </h1>
        {issue.comments.edges.map(({ node: comment }, index) => {
          return (
            <React.Fragment key={index}>
              <Divider orientation="left">
                {comment.author.login} replied
              </Divider>
              <br />
              <React.Fragment> {parse(comment.bodyHTML)} </React.Fragment>
            </React.Fragment>
          );
        })}
      </Col>
    </Row>
  );
};
