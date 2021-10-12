import React from 'react'
import {Table} from "antd"
import './index.less'

const TableComponent = ({columns,tableList}) => {


   
    return (
        <Table
            columns={columns}
            dataSource={tableList}
            // pagination={pagination}
            // onChange={handleTableChange}
            bordered={true}
            scroll={{ x: 'max-content' }}
            rowKey={(record, index) => index}
            size="small"
        />
    )
}

export default TableComponent
