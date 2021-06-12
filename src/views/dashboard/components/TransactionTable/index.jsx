import React, { Component } from "react";
import { Table, Tag } from "antd";
import { getArticleList } from "@/api/article";

const columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
    width: 200,
  },
  {
    title: "类别",
    dataIndex: "typeName",
    key: "typeName",
    width: 195,
    render: text => (`${text}`),
  },
  {
    title: "发布时间",
    key: "addTime",
    dataIndex: "addTime",
    width: 100,
    // render: (tag) => (
    //   <Tag color={tag === "pending" ? "magenta" : "green"} key={tag}>
    //     {tag}
    //   </Tag>
    // ),
  },
  {
    title: "浏览量",
    key: "view_count",
    dataIndex: "view_count",
    width: 100,
    // render: (tag) => (
    //   <Tag color={tag === "pending" ? "magenta" : "green"} key={tag}>
    //     {tag}
    //   </Tag>
    // ),
  },
];

class TransactionTable extends Component {
  _isMounted = false;   // 这个变量是用来标志当前组件是否挂载
  state = {
    list: [],
  };
  fetchData = () => {
    getArticleList().then(res => {
      const list = res.data.list
      console.log(res.data.list)
      if (this._isMounted) {
        this.setState({ list });
      }
    });
  };
  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <Table
        columns={columns}
        dataSource={this.state.list}
        pagination={false}
        rowKey={record=>record.id}
      />
    );
  }
}

export default TransactionTable;
