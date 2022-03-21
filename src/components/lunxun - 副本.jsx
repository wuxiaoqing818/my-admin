import React,{ useState } from 'react';
import {Button} from 'antd'
// import service from '../../service';
 
// const { getBlogsList, getTableData } = service;
 
function Test() {
  const [flag, setFlag] = useState(true);
  // 测试按钮
  const handleClick = () => {
    // flag 控制按钮是否为 loading 状态
    setFlag(false);
    // getBlogsList接口请求函数，这里已经封装好了
    getBlogsList().then(res => {
      if(res && res.success){
        // 轮询函数
        const downCheck = () => {
          // getTableData接口请求函数，这里已经封装好了
          getTableData().then((res) => {              
            if (res && res.success) {
              let timer;
              // 如果后端数据中的 successResponse 字段返回 true，就会轮询，直到返回 false，停止轮询
              if(res.successResponse){                 
                timer=null;
                timer = setTimeout(()=>downCheck(), 1000);
              }else{
                setFlag(true);
                // 清除时间间隔函数
                clearInterval(timer);
              }                
            }
          });
        }
        downCheck();
      }
    })
  }
  return (
    <div>
      <Button type="primary" onClick={handleClick} loading={!flag} >{flag ? "导出可用兑换码": "正在导出兑换码"}</Button>
    </div>
  );
}
 
export default Test;