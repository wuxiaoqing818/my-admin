import React, { useState ,useEffect,useRef} from 'react';
import { Button } from 'antd'
import {nanoid} from 'nanoid'

// import service from '../../service';

// const { getBlogsList, getTableData } = service;

function Test() {
  const [flag, setFlag] = useState(true);
  // const [status, setStatus] = useState(true);  //true就轮询 false中断
  

  let timer = useRef();
  let statusTimer = useRef();

  useEffect(()=>{

    return ()=>{
      console.log('离开页面')
 
      clearInterval(timer.current);
      clearInterval(statusTimer.current);
    }
},[])

  // 测试按钮
  const handleClick = () => {
    // flag 控制按钮是否为 loading 状态
    setFlag(false);
    // getBlogsList接口请求函数，这里已经封装好了
    let status = true
    // setTimeout(() => {
    //   status = false
    //   console.log('超时')
    // }, 20000);
    statusTimer.current = setTimeout(() =>{
      status = false
      console.log('超时')
    }, 20000);
    setTimeout(() => {
      const downCheck = () => {
        // getTableData接口请求函数，这里已经封装好了
        setTimeout(() => {
          
      
          // let timer;
          // 如果后端数据中的 successResponse 字段返回 true，就会轮询，直到返回 false，停止轮询
          if (status) {
            console.log(status)
            timer.current = null;
            timer.current = setTimeout(() => downCheck(), 1000);

          } else {
            setFlag(true);
            // 清除时间间隔函数
            clearInterval(timer.current);
          }

        }, 2000);

      }
      downCheck();
    }, 2000);


    // getBlogsList().then(res => {
    //   if(res && res.success){
    //     // 轮询函数
    //     const downCheck = () => {
    //       // getTableData接口请求函数，这里已经封装好了
    //       getTableData().then((res) => {              
    //         if (res && res.success) {
    //           let timer;
    //           // 如果后端数据中的 successResponse 字段返回 true，就会轮询，直到返回 false，停止轮询
    //           if(res.successResponse){                 
    //             timer=null;
    //             timer = setTimeout(()=>downCheck(), 1000);
    //           }else{
    //             setFlag(true);
    //             // 清除时间间隔函数
    //             clearInterval(timer);
    //           }                
    //         }
    //       });
    //     }
    //     downCheck();
    //   }
    // })
  }

  // const zhongzhi = () => {
  //   setStatus(false)
  //   console.log(status)
  // }
  return (
    <div>
      <Button type="primary" onClick={handleClick} loading={!flag} >{flag ? "导出可用兑换码" : "正在导出兑换码"}</Button>
      {/* <Button type="primary" onClick={zhongzhi} style={{ marginLeft: '20px' }} >请求成功终止轮询</Button> */}
    </div>
  );
}

export default Test;