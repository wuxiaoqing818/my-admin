import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import { getArticleList } from "@/api/article";

const columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    width: 200,
    ellipsis: true,
  },
  {
    title: "类别",
    dataIndex: "typeName",
    key: "typeName",
    width: 100,
    align:"center",
    render: text => (`${text}`),
  },
  {
    title: "发布时间",
    key: "addTime",
    dataIndex: "addTime",
    width: 140,
    align:"center"
  },
  {
    title: "浏览量",
    key: "view_count",
    dataIndex: "view_count",
    width: 100,
    align:"center",
    sorter: (a, b) => a.view_count - b.view_count,
    sortDirections: ['descend'],
    defaultSortOrder: 'descend',
    render: (tag) => (
      <div style={{ color: 'green' }}>{tag}</div>
    ),
  },
];


const TransactionTable = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    showSizeChanger: true,  //改变每页size
    pageSizeOptions: ['5', '10'],
    hideOnSinglePage: false,    //只有一页隐藏分页器
    showQuickJumper: true,
    size: "small"
  })
  const [list, setList] = useState([])
  const fetchData = () => {
    getArticleList().then(res => {
      const list = JSON.parse(JSON.stringify(res.data.list))
      console.log(res.data.list)
      setList(list)
    });
  };

  useEffect(() => {
    fetchData();
  }, [])

  //分页
  const handleTableChange = obj => {
    console.log(obj)
    setPagination(obj)
  }

  return (
    <Table
      columns={columns}
      dataSource={list}
      pagination={pagination}
      onChange={handleTableChange}
      rowKey={record => record.id}
      bordered={true}
      size="small"
    />
  );

}

export default TransactionTable;
