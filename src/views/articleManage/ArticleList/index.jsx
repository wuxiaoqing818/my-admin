import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, Message, Button, message } from 'antd'
import { getArticleList,deleteArticle } from "@/api/article";
import './style.less'
const { confirm } = Modal


const ArticleList = (props) => {

    const [list, setList] = useState([])



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
                deleteArticle({id}).then(res => {
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
    const updateArticle = id=>{
        props.history.push('/articleManage/addArticle/'+id)
    }


    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={1}>
                            <b>操作</b>
                        </Col>

                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => {
                    return (
                        <List.Item>
                            <Row className="list-div">
                                <Col span={8}>
                                    {item.title}
                                </Col>
                                <Col span={4}>
                                    {item.typeName}
                                </Col>
                                <Col span={4}>
                                    {item.addTime}
                                </Col>
                                <Col span={4}>
                                    {item.view_count}
                                </Col>
                                <Col span={4}>
                                    <Button type="primary" style={{marginRight:'20px'}} onClick={()=>updateArticle(item.id)}>修改</Button>
                                    <Button onClick={() => delArticle(item.id)}>删除</Button>
                                </Col>

                            </Row>
                        </List.Item>
                    )
                }

                }
            />

        </div>
    )
}

export default ArticleList
