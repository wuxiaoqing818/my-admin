import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, Message, Button, message, Table } from 'antd'
import { getArticleList, deleteArticle } from "@/api/article";
import './style.less'
const { confirm } = Modal




const ArticleList = (props) => {
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
            align: "center",
            render: text => (`${text}`),
        },
        {
            title: "发布时间",
            key: "addTime",
            dataIndex: "addTime",
            width: 140,
            align: "center"
        },
        {
            title: "浏览量",
            key: "view_count",
            dataIndex: "view_count",
            width: 100,
            align: "center",
            sorter: (a, b) => a.view_count - b.view_count,
            sortDirections: ['descend'],
            defaultSortOrder: 'descend',
            render: (text) => (
                <div style={{ color: 'green' }}>{text}</div>
            ),
        },
        {
            title: "操作",
            key: "id",
            dataIndex: "id",
            width: 140,
            align: "center",
            render: (text, item) => (
                <div>
                    <Button type="primary" style={{ marginRight: '20px' }} onClick={() => updateArticle(text)}>修改</Button>
                    <Button onClick={() => delArticle(text)}>删除</Button>
                </div>
            ),
        },

    ];

    const [list, setList] = useState([])
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        showSizeChanger: true,  //改变每页size
        pageSizeOptions: ['5', '10', '15','20'],
        hideOnSinglePage: false,    //只有一页隐藏分页器
        showQuickJumper: true,
        size: "middle"
    })



    useEffect(() => {
        getList()
    }, [])

    const getList = () => {
        getArticleList().then(res => {
            setList(res.data.list)

        })
    }

    //删除文章
    const delArticle = id => {
        confirm({
            title: '确定要删除这篇博客文章吗?',
            content: '如果你点击OK，文章将永远被删除，无法恢复',
            onOk() {
                deleteArticle({ id }).then(res => {
                    message.success('文章删除成功')
                    getList()
                })


            },
            onCancel() {
                message.success('已取消')
            }
        })

    }

    //修改文章
    const updateArticle = id => {
        props.history.push('/articleManage/addArticle/' + id)
    }

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
            style={{ width: '90%', margin: '20px' }}
        />
        // <div>
        //     <List
        //         header={
        //             <Row className="list-div">
        //                 <Col span={8}>
        //                     <b>标题</b>
        //                 </Col>
        //                 <Col span={4}>
        //                     <b>类别</b>
        //                 </Col>
        //                 <Col span={4}>
        //                     <b>发布时间</b>
        //                 </Col>
        //                 <Col span={4}>
        //                     <b>浏览量</b>
        //                 </Col>
        //                 <Col span={1}>
        //                     <b>操作</b>
        //                 </Col>

        //             </Row>
        //         }
        //         bordered
        //         dataSource={list}
        //         renderItem={item => {
        //             return (
        //                 <List.Item>
        //                     <Row className="list-div">
        //                         <Col span={8}>
        //                             {item.title}
        //                         </Col>
        //                         <Col span={4}>
        //                             {item.typeName}
        //                         </Col>
        //                         <Col span={4}>
        //                             {item.addTime}
        //                         </Col>
        //                         <Col span={4}>
        //                             {item.view_count}
        //                         </Col>
        //                         <Col span={4}>
        //                             <Button type="primary" style={{marginRight:'20px'}} onClick={()=>updateArticle(item.id)}>修改</Button>
        //                             <Button onClick={() => delArticle(item.id)}>删除</Button>
        //                         </Col>

        //                     </Row>
        //                 </List.Item>
        //             )
        //         }

        //         }
        //     />

        // </div>
    )
}

export default ArticleList
