import React,{useState,useRef,useEffect} from 'react'
import ReactEcharts from 'echarts-for-react';


/*
这个公共的折线图  需要传递
legend:data
xAxis:data
series

*/
const Spline = props => {

    const [currentSeriesInfo, setCurrentSeriesInfo] = useState({})

   

    const getOption = () => {
        // console.log(props)
        return {
            title: {
                text: '',
                subtext: ''
            },
            // 需要添加的代码：使用鼠标滚轮可以放大缩小
            dataZoom: [
                {
                    id: 'dataZoomX',
                    type: 'inside',
                    xAxisIndex: [0],
                    filterMode: 'none',
                    start: 0,
                    end: 50
                }
            ],
            toolbox: { //可视化的工具箱
                show: true,
                feature: {
                    dataView: { //数据视图
                        show: true,
                        readOnly: false,       //是否显示不可编辑(只读)
                        title: '数据视图'
                    },
                    restore: { //重置
                        show: true,
                        title: '重置'
                    },
                    dataZoom: { //数据缩放视图
                        show: true,
                        title:{
                            zoom:'区域缩放',
                            back:'缩放还原'
                        }
                    },
                    saveAsImage: {//保存图片
                        show: true,
                        title: '保存图片'
                    },
                    magicType: {//动态类型切换
                        type: ['line', 'bar', 'stack'],
                        title:{
                            line:'切换为折线图',
                            bar:'切换为柱状图',
                            stack:'切换为累计数值'
                        }
                    }
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter(params) {
                    // console.log(`%c折线数据`,'color:red;')
                    // console.log(params)

                    let numberValue = 0
                    let newParams = [...params]
                    newParams.sort((a, b) => b.data - a.data)
                    var res = '<div><p>时间：' + newParams[0].name + '</p></div>'
                    for (var i = 0; i < newParams.length; i++) {
                        if (newParams[i].data || newParams[i].data == 0) {

                            if (newParams[i].data !== '') {

                                numberValue = Number(newParams[i].data)

                                if (!Number.isInteger(numberValue)) {
                                    numberValue = Math.round(numberValue * Math.pow(10, 4)) / Math.pow(10, 2) + '%'
                                }
        
                                res += '<p>' + '<span>' + newParams[i].marker + " " + '</span>' + `<span style="color:${currentSeriesInfo?.seriesName==newParams[i].seriesName?'#f15a22':''};font-size:${currentSeriesInfo?.seriesName==newParams[i].seriesName?'18px':'14px'}">` + newParams[i].seriesName + '</span>' + '：' + '<span>' + numberValue + '</span>' + '</p>'
                            }
                        }
                    }
                    return res;
                    // style="color:${currentSeriesInfo?.seriesName==newParams[i].seriesName?'red':'white'}"
                }
                // formatter(params) {
                //     let newParams = [...params]
                //     newParams.sort((a,b)=>b.data-a.data)
                //     console.log(newParams)
                //     var res = '<div><p>时间：' + params[0].name + '</p></div>'
                //     for (var i = 0; i < params.length; i++) {
                //         if(params[i].data||params[i].data==0){
                //             if(params[i].data!==''){
                //                 res += '<p>'+'<span>'+params[i].marker+" "+'</span>'+'<span>' + params[i].seriesName + '</span>' + '：' + '<span style="color:white;">' +  Math.round(params[i].data*Math.pow(10,4))/Math.pow(10,4) + '</span>'+ '</p>'
                //             }
                //         }
                //     }                                                                                                                          
                //     return res;
                // }
            },
            legend: {
                data: props?.legendList,  // ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                type: 'scroll',
                bottom: 10,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: props?.xAxisList   // ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: props?.seriesList
            // series: [
            //     {
            //         name: '最高气温',
            //         type: 'line',
            //         data: [10, 11, 13, 11, 12, 12, 9],              
            //     },
            //     {
            //         name: '最低气温',
            //         type: 'line',
            //         data: [1, -2, 2, 5, 3, 2, 0],                     
            //     }
            // ]

        }

    }

    // ReactEcharts.on('click', function (params) {
    //     console.log(params)
    //     let data = {
    //       x: params.name,
    //       y: params.value
    //     }
    //     console.log(data)
    //     alert(JSON.stringify(data))

    //   });

      // 定义onEvents  click事件
      const onEvents = {
        'click': (params) => {
            let obj = {
                seriesName:params.seriesName,
                name:params.name,
                value:params.value

            }
            setCurrentSeriesInfo({...obj})
        },
    };




    return (
        <div>
            <h3>
                当前点击指标信息:
                指标：<span style={{color:'#f15a22',marginRight:'20px'}}>{currentSeriesInfo?.seriesName||'无'}</span>
                时间：<span style={{color:'#f15a22',marginRight:'20px'}}>{currentSeriesInfo?.name||'无'}</span>
                数值：<span style={{color:'#f15a22'}}>{currentSeriesInfo?.value||'无'}</span>
            </h3>
            <ReactEcharts
                style={{ width: '100%', height: '300px' }}
                option={getOption()}
                notMerge={true}
                onEvents={onEvents} // 监听事件方法
            />
        </div>
    )
}
export default Spline
