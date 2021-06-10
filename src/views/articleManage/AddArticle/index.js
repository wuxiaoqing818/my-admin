/*
 * @Author: 吴晓晴
 * @Date: 2021-05-26 20:20:07
 * @LastEditTime: 2021-06-11 00:16:45
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\my-admin\src\views\articleManage\AddArticle\index.js
 */
import React, { useState, useEffect } from 'react'
import marked from 'marked'
import './style.less'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import moment from 'moment';
import { getTypeInfo,addArticle ,updateArticle,getArticleById } from "@/api/article";
const { Option } = Select
const { TextArea } = Input


const AddArticle = (props) => {

    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState(1) //选择的文章类别
    // const [defaultTime,setDefaultTime] = useState(moment(new Date(), 'YYYY-MM-DD'))


    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    useEffect(() => {
        // console.log(moment().format('YYYY-MM-DD'))
        // setShowDate(moment().format('YYYY-MM-DD'))
        //时间回显处理
        // if(showDate===undefined){

        // }

        getTypeData()
        let tmpId = props.match.params.id
        console.log(props)
        if (tmpId) {
            setArticleId(tmpId)
            getArticleData(tmpId)
        }

    }, [])

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html = marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = e => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const getArticleData = id => {
        getArticleById({ id }).then(res => {
            let articleInfo = res.data.data[0]
            setArticleTitle(articleInfo.title)
            setArticleContent(articleInfo.article_content)
            let html = marked(articleInfo.article_content)
            setMarkdownContent(html)
            setIntroducemd(articleInfo.introduce)
            let tmpInt = marked(articleInfo.introduce)
            setIntroducehtml(tmpInt)
            setShowDate(articleInfo.addTime)
            setSelectType(articleInfo.typeId)

        })
    }



    const getTypeData = () => {
        getTypeInfo().then(res => {
            console.log(res)
            if (res) {
                if (res.data.data == '没有登录') {
                    props.history.push('/')
                } else {
                    setTypeInfo(res.data.data)
                }

            }


        })
    }
    const selectedTypeHander = (value) => {
        setSelectType(value)

    }

    const saveArticle = () => {
        const arrState = [selectedType, articleTitle, articleContent, introducemd, showDate]
        const messageObj = [
            '必须选择文章类型',
            '文章名称不能为空',
            '文章内容不能为空',
            '文章简介不能为空',
            '发布日期不能为空'
        ]
        let flag = true
        arrState.forEach((item, index) => {
            if (!flag) return false
            if (!item) {
                flag = false
                message.error(messageObj[index])
            }

        })
        if (!flag) return false
        // if (!selectedType) {
        //     message.error('必须选择文章类型')
        //     return false
        // } else if (!articleTitle) {
        //     message.error('文章名称不能为空')
        //     return false
        // }
        // else if (!articleContent) {
        //     message.error('文章内容不能为空')
        //     return false
        // }
        // else if (!introducemd) {
        //     message.error('文章简介不能为空')
        //     return false
        // }
        // else if (!showDate) {
        //     message.error('发布日期不能为空')
        //     return false
        // }
        let dataProps = {}
        dataProps.type_id = selectedType
        dataProps.title = articleTitle
        dataProps.article_content = articleContent
        dataProps.introduce = introducemd
        let dateText = showDate.replace('-', '/')
        dataProps.addTime = (new Date(dateText).getTime()) / 1000
        if (articleId == 0) {
            dataProps.view_count = 0
            addArticle(dataProps).then(res => {
                console.log(res)
                setArticleId(res.data.insertId)
                if (res.isSuccess) {
                    message.success('文章添加成功')
                } else {
                    message.success('文章添加失败')
                }
            })
        } else {
            dataProps.id = articleId
            updateArticle(dataProps).then(res => {
                console.log(res)
                if (res.data.isSuccess) {
                    message.success('文章修改成功')
                } else {
                    message.error('文章修改失败')
                }
            })

        }


    }


    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input placeholder="博客标题" size="large" value={articleTitle} onChange={e => setArticleTitle(e.target.value)} />
                        </Col>
                        <Col span={4}>
                            <Select value={selectedType} size="large" onChange={selectedTypeHander}>

                                {
                                    typeInfo.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.Id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>

                    <Row gutter={10} style={{ marginTop: '20px' }}>
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={35}
                                placeholder="文章内容"
                                value={articleContent}
                                onChange={changeContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div className="show-html" dangerouslySetInnerHTML={{ __html: markdownContent }}>


                            </div>
                        </Col>

                    </Row>

                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large" style={{ marginRight: '20px' }}>暂存文章</Button>
                            <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
                        </Col>
                        <Col span={24} style={{ marginTop: '20px' }}>
                            <TextArea
                                rows={4}
                                placeholder="文章简介"
                                value={introducemd}
                                onChange={changeIntroduce}
                            />
                            <div className="introduce-html" dangerouslySetInnerHTML={{ __html: introducehtml }} style={{ marginTop: '20px' }}>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    placeholder="发布日期"
                                    size="large"
                                    value={
                                        showDate === undefined ? moment().format('YYYY-MM-DD') && setShowDate(moment().format('YYYY-MM-DD')) : moment(showDate, 'YYYY-MM-DD')
                                    }
                                    defaultValue={moment(new Date(), 'YYYY-MM-DD')}
                                    placeholder='选择日期'
                                    onChange={(date, dateString) => setShowDate(dateString)}
                                />
                            </div>
                        </Col>
                    </Row>

                </Col>

            </Row>
        </div>
    )

}


export default AddArticle