import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  const { issueState, searchText } = data;
  const [tempSearchState, setTempSearchState] = useState<string>(searchText);
  useEffect(() => {
    setTempSearchState(searchText);
  }, [searchText]);
  const updateHistory = (searchText: string, issueState: string) => {
    history.push({
      search: `?searchtext=${searchText}&issuetype=${issueState}`,
    });
  };
  const onSearch = (e: string) => {
    setSearchState({
      ...data,
      searchText: e,
    });
    updateHistory(e, issueState);
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTempSearchState(event.target.value);
  };
  const handleChange = (e: IssueStatus) => {
    setSearchState({
      ...data,
      issueState: e,
    });
    updateHistory(searchText, e);
  };

  return (
    <div className="search-and-select">
      <Search
        placeholder="Search text in title/body"
        onSearch={onSearch}
        onChange={onChange}
        enterButton="Search"
        value={tempSearchState}
        style={{ width: "30%", marginRight: "15px" }}
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
    </div>
  );
};

export default SearchArea;
