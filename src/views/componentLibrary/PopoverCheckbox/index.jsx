import React, { useState, useEffect } from "react";

import { Popover, Checkbox, Button } from 'antd'
import './index.less'


const CheckboxGroup = Checkbox.Group;




const PopoverCheckbox = ({ checkList, popTitle, popBtnTitle, getCheckedList }) => {



    const [checkOptions,setCheckOptions] = useState([])

    const [checkedList, setCheckList] = useState([])

    const [indeterminate, setIndeterminate] = useState(false)

    const [checkAll, setCheckAll] = useState(true)

    useEffect(() => {
        const checkOptions = checkList.map(item => item.name)
        const defaultCheckedList =  [...checkOptions]

        setCheckOptions(checkOptions)
        setCheckList(defaultCheckedList)
        setIndeterminate(!!defaultCheckedList.length && defaultCheckedList.length < checkOptions.length)
        setCheckAll(defaultCheckedList.length === checkOptions.length)
         //传递给父组件
         getCheckedList(defaultCheckedList)
    }, [checkList])







    const onChange = checkedList => {
        setCheckList(checkedList)
        setIndeterminate(!!checkedList.length && checkedList.length < checkOptions.length)
        setCheckAll(checkedList.length === checkOptions.length)

        //传递给父组件
        getCheckedList(checkedList)

    };

    const onCheckAllChange = e => {

        setCheckList(e.target.checked ? checkOptions : [])
        setIndeterminate(false)
        setCheckAll(e.target.checked)
        //传递给父组件
        getCheckedList(e.target.checked ? checkOptions : [])

    };

    const content = (
        <div>
            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChange}
                    checked={checkAll}
                >
                    全选
                </Checkbox>
            </div>
            <br />
            <CheckboxGroup
                options={checkOptions}
                value={checkedList}
                onChange={onChange}
            />
        </div>
    )




    return (
        <Popover content={content} title={popTitle} trigger="click" placement="right">
            <Button type="primary">{popBtnTitle}</Button>
        </Popover>
    )

}

export default PopoverCheckbox