import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { Input, Select } from "antd";
import { IssueStatus } from "./IssueList";
const { Option } = Select;
const { Search } = Input;
export type IssueSearchParam = {
  searchText: string;
  issueState: IssueStatus;
};
export type SearchAreaTypes = {
  data: IssueSearchParam;
  setSearchState: (param: IssueSearchParam) => void;
};
const SearchArea: FunctionComponent<SearchAreaTypes> = ({
  data,
  setSearchState,
}) => {
  const { issueState, searchText } = data;
  const [tempSearchState, setTempSearchState] = useState<string>(searchText);
  useEffect(() => {
    setTempSearchState(searchText);
  }, [searchText]);
  const onSearch = (e: string) => {
    setSearchState({
      ...data,
      searchText: e,
    });
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTempSearchState(event.target.value);
  };
  const handleChange = (e: IssueStatus) => {
    setSearchState({
      ...data,
      issueState: e,
    });
  };

  return (
    <React.Fragment>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        onChange={onChange}
        enterButton="Search"
        value={tempSearchState}
        style={{ width: 200 }}
      />
      <Select
        defaultValue={issueState}
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
