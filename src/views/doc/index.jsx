import React from 'react';
import TypingCard from '@/components/TypingCard'
const Doc = () => {
  const cardContent = `
    目前正在编写完善中...
  `
  return (
    <div className="app-container">
      <TypingCard title='开发文档' source={cardContent} />
    </div>
  );
}

export default Doc;