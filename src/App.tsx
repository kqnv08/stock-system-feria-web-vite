import { Button, PageHeader, Space, Table, Tag } from "antd";

import './App.css'
import { ColumnsType } from "antd/lib/table";
import 'antd/dist/antd.css';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
function App() {


  return (

    <>
      <PageHeader
        title="Roles"
        extra={[
          <Button
            type="primary"
            style={{ float: "right" }}
          >
            Nuevo
          </Button>,
        ]}
      />
      <Table columns={columns} dataSource={data} />
      {/* <TableWrapper
          columns={columns}
          dataSource={data?.roleList?.result as Role[]}
          loading={loading}
          useDefaultMenu={false}
          onCriteriaChange={setTableCriteria}
          onUpdate={handleEdit}
          onDelete={handleDelete}
          pageInfo={{
            pageSize: 10,
            total: data?.roleList?.pageInfo?.total!,
          }}
          defaultSort={defaultSort}
        ></TableWrapper> */}
    </>
  )
}

export default App
