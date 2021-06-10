import React from "react";
import TypingCard from "@/components/TypingCard";
import wechat from "@/assets/images/wechat.jpg";
import reward from "@/assets/images/reward.jpg";
const About = () => {
  const cardContent = `
    <p>大家好，我是阿晴。</p>
    <p>本人菜鸡一个，求各位大佬指教</p> 
    <p>以下是本人信息和联系方式</p> 
    <img src="${wechat}" alt="wechat" style="height:550px"/>
    <img src="${reward}" alt="reward" style="height:550px"/>
  `;
  return (
    <div className="app-container">
      <TypingCard title="关于作者" source={cardContent} />
    </div>
  );
};

export default About;
