import React, { useState, useEffect } from 'react'
import { Timeline, Radio } from 'antd'
import './style.less'

const MonitorSetting = () => {
    const [monitorType, setMonitorType] = useState('1')

    const fixedNetworkOptions = [
        { name: '页面监测', key: 'F' },
        { name: '文件监测', key: 'S' },
        { name: 'Ping监测', key: 'P' },
        { name: 'MTR监测', key: 'R' },
        { name: '事务监测', key: 'F' },
        { name: '流媒体监测', key: 'F' },
        { name: '私有协议', key: 'F' },
    ]

    const moveOptions = [
        { name: '页面监测', key: 'F' }
    ]





    const generate = (p) => {
        p = p || Promise;
        return function (condition, action, ctx) {
            var whilst = function (data) {
                try {
                    if (ctx == null) ctx = this;
                    if (!condition.call(ctx, data)) return p.resolve(data);
                    return p.resolve(action.call(ctx, data)).then(whilst);
                } catch (e) {
                    return p.reject(e);
                }
            };
            return whilst();
        };
    }

    const monitorTypeOnChange = e => {
        setMonitorType(e.target.value)

        let list = [1,2,3,4]

        let whileSend = generate();
        let arr = [];
        let count = 0;

        whileSend(() => {
            return !(list.length === count);
        }, async () => {
            let tableData = await new Promise((res)=>{
                setTimeout(() => {
                    res(count)
                }, 1000);
            })
            console.log(tableData)
            count++
            arr.push(tableData)
            return arr;

        }).then((res) => {
            // 处理成功回调函数
            console.log("成功", res);

        }).catch((error) => {

            console.log(error.message || error);

        });







    };







    return (
        <div className="monitor-setting-page">
            <Timeline>
                <Timeline.Item>
                    <h6>监测类型</h6>
                    <div style={{ margin: '20px 0' }}>
                        <Radio.Group value={monitorType} onChange={monitorTypeOnChange}>
                            <Radio.Button value="1">固网监测</Radio.Button>
                            <Radio.Button value="102">移动监测</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div>
                        <Radio.Group value={monitorType} onChange={monitorTypeOnChange}>
                            <Radio.Button value="a">固网监测</Radio.Button>
                            <Radio.Button value="b">移动监测</Radio.Button>
                        </Radio.Group>
                    </div>
                </Timeline.Item>
                <Timeline.Item>是的撒大苏打</Timeline.Item>
                <Timeline.Item>是的撒大苏打</Timeline.Item>
                <Timeline.Item>是的撒大苏打</Timeline.Item>
            </Timeline>
        </div>
    )
}

export default MonitorSetting
