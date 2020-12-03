import React, { FunctionComponent, useState } from "react";
import SearchArea, { IssueSearchParam } from "../components/SearchArea";
import IssueList from "../components/IssueList/IssueList";
import { useQueryParam } from "../utils/hooks/network";
import { IssueStatus } from "./IssueList";

const IssueViewer: FunctionComponent = () => {
  const query = useQueryParam();
  const [searchObj, setSearchObj] = useState<IssueSearchParam>({
    searchText: query.get("searchtext"),
    issueState:
      query.get("issuetype") == "null"
        ? null
        : (query.get("issuetype") as IssueStatus),
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
