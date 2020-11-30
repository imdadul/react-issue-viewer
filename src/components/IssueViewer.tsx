import React, { FunctionComponent } from "react";
import SearchArea from "../components/SearchArea";
import IssueList from "../components/IssueList/IssueList";

const IssueViewer: FunctionComponent = () => {
  return (
    <React.Fragment>
      <SearchArea
        setSearchState={(a, b) => {
          const c = 1;
        }}
      />
      <IssueList />
    </React.Fragment>
  );
};

export default IssueViewer;
