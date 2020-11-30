import React, { FunctionComponent } from "react";
import { Table } from "antd";
import { useHistory } from "react-router-dom";

interface IssueSummary {
  id: string;
  title: string;
}

const IssueList: FunctionComponent = () => {
  const history = useHistory();
  const handleClick = (id: string) => {
    history.push(`/issues/${id}`);
  };
  const data: IssueSummary[] = [];
  for (let i = 0; i <= 55; i++) {
    data.push({
      id: i.toString(),
      title: "Jack " + i,
    });
  }
  return (
    <React.Fragment>
      <Table<IssueSummary>
        dataSource={data}
        pagination={{
          total: data.length,
          showSizeChanger: false,
          defaultPageSize: 20,
        }}
      >
        <Table.Column<IssueSummary> key="id" title="id" dataIndex="id" />
        <Table.Column<IssueSummary>
          key="title"
          title="Title"
          dataIndex="title"
        />
        <Table.Column
          title="Action"
          key="action"
          render={(text, record: IssueSummary) => (
            <a onClick={() => handleClick(record.id)}>Invite {record.title}</a>
          )}
        />
      </Table>
    </React.Fragment>
  );
};

export default IssueList;
