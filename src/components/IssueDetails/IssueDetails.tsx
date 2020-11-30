import React from "react";
import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { IssueRouteParam } from "../../App";
export const IssueDetails: FunctionComponent = () => {
  const { issueId } = useParams<IssueRouteParam>();
  return <>Details {issueId}</>;
};
