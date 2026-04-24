// src/pages/Announcements.jsx
import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const announcements = [
  { title: "選課時程", url: "https://in.ncu.edu.tw/ncu57170/course/COUR_S.pdf" },
  { title: "課程時間表使用說明", url: "https://in.ncu.edu.tw/ncu57170/course/COUR_U.pdf" },
  { title: "國立中央大學學生選課辦法", url: "https://in.ncu.edu.tw/ncu57170/course/COUR_R.pdf" },
  { title: "選課程序相關說明", url: "https://in.ncu.edu.tw/ncu57170/course/COUR_D.pdf" },
  { title: "「通識課程」選課說明", url: "https://in.ncu.edu.tw/ncu57170/course/COUR_09.pdf" },
  { title: "「體育課程」選課說明", url: "https://in.ncu.edu.tw/ncu57170/course/COUR_01.pdf" },
  { title: "「大一國文」選課說明", url: "https://in.ncu.edu.tw/ncu57170/course/COUR_11.pdf" },
  { title: "「大一英文」與「進修英文」選課說明", url: "https://in.ncu.edu.tw/ncu57170/course/COUR_00.pdf" },
  { title: "「大二歷史」選課說明", url: "https://in.ncu.edu.tw/ncu57170/course/COUR_15.pdf" },
  { title: "「服務學習」選課說明", url: "https://in.ncu.edu.tw/ncu57170/course/COUR_08.pdf" },
  { title: "「微積分」選課說明", url: "https://in.ncu.edu.tw/ncu57170/course/COUR_21.pdf" },
  { title: "「普通物理」選課說明", url: "https://in.ncu.edu.tw/ncu57170/course/COUR_22.pdf" },
  { title: "「教育學程」選課說明", url: "https://in.ncu.edu.tw/ncu57170/course/COUR_06.pdf" },
  { title: "「軍訓課程」選課說明", url: "https://in.ncu.edu.tw/ncu57170/course/COUR_05.pdf" },
  { title: "上課教室代碼及大樓名稱對照表(含平面圖)", url: "https://in.ncu.edu.tw/ncu57170/course/building.pdf" },
  { title: "本校學生至他校校際選課程序", url: "https://in.ncu.edu.tw/ncu57170/course/ICCS_ncu.pdf" },
  { title: "他校學生至中大校際選課程序", url: "https://in.ncu.edu.tw/ncu57170/course/ICCS_other.pdf" },
];

const Announcements = () => {
  return (
    <Card className="m-3">
      <Card.Header as="h5">選課公告</Card.Header>
      <ListGroup variant="flush">
        {announcements.map((item, index) => (
          <ListGroup.Item key={index}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default Announcements;