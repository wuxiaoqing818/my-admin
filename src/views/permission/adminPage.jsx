import React, { useState, useEffect } from 'react';
import TypingCard from '@/components/TypingCard'
import { Card, Empty, Table } from "antd";
import { getAdminList } from "@/api/admin";
import './style.less'

const columns = [
  {
    key: 'id',
    title: 'id',
    dataIndex: 'id',

  },
  {
    key: 'author',
    title: '姓名',
    dataIndex: 'author',

  },
  {
    key: 'title',
    title: '标题',
    dataIndex: 'title',

  },
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',

  },
  {
    key: 'readings',
    title: '阅读量',
    dataIndex: 'readings',

  },
  {
    key: 'date',
    title: '时间',
    dataIndex: 'date',

  },
  {
    key: 'star',
    title: '等级',
    dataIndex: 'star',

  },
]

const AdminPage = () => {
  const [adminList, setAdminList] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,  //改变每页size
    pageSizeOptions: ['10', '20', '50', '100'],
    hideOnSinglePage: false,    //只有一页隐藏分页器
    showQuickJumper: true,
    total: 0, //总条数
    showTotal: total => `共${total}条数据`,


  })

  useEffect(() => {
    const parmasInfo = {
      pageNumber: 1,
      pageSize: 10,
      star: 1
    }

    getAdminList(parmasInfo).then(res => {
      console.log(res)

      if (res.data.code == 200) {
        const list = res.data.data.list
        const total = res.data.data.total
        setAdminList([...list])
        setPagination({ ...pagination, total })
      }
    })
  }, [])

  //分页
  const handleTableChange = obj => {

    console.log(obj)
    const { current:pageNumber, pageSize } = obj
    const star = 1
    getAdminList({ pageNumber, pageSize, star }).then(res => {
      console.log(res)
      if (res.data.code == 200) {
        const list = res.data.data.list
        const total = res.data.data.total
        setAdminList([...list])
        setPagination({ ...pagination, total })
        setPagination(obj)
      }
    })
  }

  return (
    <div className="admin-page">
      <Card title="管理员" bordered={false}>
        <Table
          columns={columns}
          dataSource={adminList}
          pagination={pagination}
          onChange={handleTableChange}
          bordered={true}
          scroll={{ x: 'max-content' }}
          rowKey={(record, index) => index}
          size="small"
        />
      </Card>
    </div>
  );
}

export default AdminPage;