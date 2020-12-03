import React, { FunctionComponent, useState } from "react";
import SearchArea, { IssueSearchParam } from "../components/SearchArea";
import IssueList from "../components/IssueList/IssueList";

const IssueViewer: FunctionComponent = () => {
  const [searchObj, setSearchObj] = useState<IssueSearchParam>({
    issueState: null,
    searchText: "",
  });

  return (
    <React.Fragment>
      <SearchArea
        data={{
          issueState: searchObj.issueState,
          searchText: searchObj.searchText,
        }}
        setSearchState={(data: IssueSearchParam) => {
          setSearchObj(data);
        }}
      />
      <IssueList param={searchObj} />
    </React.Fragment>
  );
};

export default IssueViewer;
