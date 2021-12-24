import React, { useState, useEffect, useCallback } from "react";
import { Card } from 'antd'
import PopoverCheckbox from "./PopoverCheckbox";  //多选
import UploadComponent from './Upload'  //上传
import TableComponent from "./Table"
import FormComponent from './Form'
import "./index.less"

const ComponentLibrary = () => {
    const cardTitle = '卡片'

    const [popoverCheckboxData, setPopoverCheckboxData] = useState({
        popTitle: '',
        popBtnTitle: '',
        checkList: []
    })

    const [columns, setColumns] = useState([])
    const [tableList, setTableList] = useState([])


    useEffect(() => {
        const checkList = [
            { id: 1, name: 'title1' },
            { id: 2, name: 'title2' },
            { id: 3, name: 'title3' },
            { id: 4, name: 'title4' },
            { id: 5, name: 'title5' },
            { id: 6, name: 'title6' },
        ]
        const popTitle = '选择table表头'
        const popBtnTitle = '动态生成table表头'
        setPopoverCheckboxData({ checkList, popTitle, popBtnTitle })


    }, [])


    //  多选组件 接受子组件
    const getCheckedList = useCallback((arr) => {

        const columns = arr.map(item => {
            return {
                title: item,
                dataIndex: item,

            }
        })

        const tableList = new Array(5).fill({
            title1: 'title1',
            title2: 'title2',
            title3: 'title3',
            title4: 'title4',
            title5: 'title5',
            title6: 'title6'
        })

        setColumns(columns)
        setTableList(tableList)
    }, [])

    // 上传组件











    return (

        <div style={{ padding: '20px' }}>
            <Card title={cardTitle} extra={<a href="#">回到首页</a>} style={{ width: '100%' }}>
                {/* 气泡卡片和多选功能 */}
                <div style={{ marginBottom: '20px' }}>
                    <PopoverCheckbox {...popoverCheckboxData} getCheckedList={getCheckedList} />
                </div>

                {/* table组件 */}
                <TableComponent columns={columns} tableList={tableList} />

                {/* 上传组件 */}
                <UploadComponent />

                {/* form组件 */}
                <FormComponent />


                {/* <div onClick={()=>console.log('haha')}>
                    <input type="text" style={{ width: '300px' }} />
                </div> */}









            </Card>

        </div>


    )
}

export default ComponentLibrary