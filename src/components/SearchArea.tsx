import React, { FunctionComponent, useState } from "react";
import { Input, Select } from "antd";
import { IssueStatus } from "./IssueList";
const { Option } = Select;
const { Search } = Input;

interface SearchAreaTypes {
  setSearchState: (searchText: string, issueStatus: IssueStatus) => void;
}
const SearchArea: FunctionComponent<SearchAreaTypes> = ({ setSearchState }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedIssueState, setSelectedIssueState] = useState<IssueStatus>(
    null
  );
  const onSearch = (e: any) => {
    setSearchState(searchText, selectedIssueState);
  };
  const handleChange = (e: any) => {
    setSearchState(searchText, selectedIssueState);
  };

  return (
    <React.Fragment>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        enterButton="Search"
        style={{ width: 200 }}
      />
      <Select
        defaultValue={null}
        style={{ width: 400 }}
        onChange={handleChange}
      >
        <Option value={null}>All</Option>
        <Option value="OPEN">Open</Option>
        <Option value="CLOSED">Closed</Option>
      </Select>
    </React.Fragment>
  );
};

export default SearchArea;
