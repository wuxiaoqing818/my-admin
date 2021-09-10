import React, { useState, useEffect } from 'react'
import { Card ,Empty} from "antd";
import './style.less'
import EchartsSpline from './components/Spline'

const ArticleMarket = () => {
    const [splineObj, setSplineObj] = useState({})
    useEffect(() => {
        const obj = {
          
            legendList:['吴晓晴','李上华'],
            xAxisList:['2021','2022','2023','2024','2025','2026','2027'],
            seriesList:[
                {
                    name:'吴晓晴',
                    type:'line',
                    data:[1,2,3,4,5,6,7]
                },
                {
                    name:'李上华',
                    type:'line',
                    data:[2,5,6,7,4,5,8]
                },
            ],

        }
        setSplineObj(obj)
    }, [])
    return (
        <div className="article-market">
            <span className="weichat">我的微信</span>
            {
                splineObj?.seriesList?.length > 0 ?
                    <div style={{ width: '100%', height: '300px', margin: '10px auto 0' }}>
                        <EchartsSpline {...splineObj} />
                    </div> :
                    <div style={{ height: '166px', border: '1px solid #e8e8e8', borderRadius: '0 0 4px 4px', marginTop: '20px' }}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} imageStyle={{ marginTop: '50px' }} />
                    </div>
            }

        </div>
    )
}

export default ArticleMarket
