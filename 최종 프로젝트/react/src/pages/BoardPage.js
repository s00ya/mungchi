import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./BoardPage.module.css";

const initialPosts = [
  {
    id: 1,
    title: "요가 시작하는 방법",
    author: "운동매니아",
    date: "2023-09-24",
  },
  {
    id: 2,
    title: "근력 운동의 중요성",
    author: "헬스마스터",
    date: "2023-09-25",
  },
  {
    id: 3,
    title: "매일 러닝의 효과",
    author: "RunningMan",
    date: "2023-09-26",
  },
  // Add 30 more posts here.
  {
    id: 4,
    title: "다이어트 팁 공유",
    author: "배고퍼",
    date: "2023-09-27",
  },
  {
    id: 5,
    title: "스트레칭의 중요성",
    author: "감자",
    date: "2023-09-28",
  },
  {
    id: 6,
    title: "헬스장 운영 시간 안내",
    author: "명호사랑",
    date: "2023-09-29",
  },
  {
    id: 7,
    title: "체력 향상을 위한 팁",
    author: "정우부인",
    date: "2023-09-30",
  },
  {
    id: 8,
    title: "실내 운동장 이용 안내",
    author: "아이린",
    date: "2023-10-01",
  },
  {
    id: 9,
    title: "수영 기술 향상을 위한 노하우",
    author: "키범이",
    date: "2023-10-02",
  },
  {
    id: 10,
    title: "사이클링 스타일 가이드",
    author: "모모",
    date: "2023-10-03",
  },
  {
    id: 11,
    title: "트레일 러닝 경험 공유",
    author: "여봉봉",
    date: "2023-10-04",
  },
  {
    id: 12,
    title: "요가 자세 개선 방법",
    author: "각설이",
    date: "2023-10-05",
  },
  {
    id: 13,
    title: "운동 의상 추천",
    author: "운동시작",
    date: "2023-10-06",
  },
  {
    id: 14,
    title: "체중 감량을 위한 식사 계획",
    author: "헬쳉",
    date: "2023-10-07",
  },
  {
    id: 15,
    title: "스트레스 해소를 위한 요가",
    author: "StressReliever",
    date: "2023-10-08",
  },
  {
    id: 16,
    title: "매일 조깅 습관의 힘",
    author: "DailyJogger",
    date: "2023-10-09",
  },
  {
    id: 17,
    title: "유산소 운동의 장점",
    author: "AerobicsFan",
    date: "2023-10-10",
  },
  {
    id: 18,
    title: "헬스장 회원 가입 안내",
    author: "GymMembership",
    date: "2023-10-11",
  },
  {
    id: 19,
    title: "자전거 여행 경험 공유",
    author: "BikeTraveler",
    date: "2023-10-12",
  },
  {
    id: 20,
    title: "요가 매트 추천",
    author: "YogaMatExpert",
    date: "2023-10-13",
  },
  {
    id: 21,
    title: "근력 운동의 장점",
    author: "StrengthBenefits",
    date: "2023-10-14",
  },
  {
    id: 22,
    title: "운동과 영양의 조화",
    author: "NutritionFitness",
    date: "2023-10-15",
  },
  {
    id: 23,
    title: "실내 운동 장비 추천",
    author: "IndoorGear",
    date: "2023-10-16",
  },
  {
    id: 24,
    title: "유연성 향상을 위한 스트레칭",
    author: "FlexibilityGains",
    date: "2023-10-17",
  },
  {
    id: 25,
    title: "매일 러닝의 팁",
    author: "DailyRunner",
    date: "2023-10-18",
  },
  {
    id: 26,
    title: "헬스장 운영 시간 업데이트",
    author: "GymHoursUpdate",
    date: "2023-10-19",
  },
  {
    id: 27,
    title: "자전거 타이어 선택 가이드",
    author: "BikeTireGuide",
    date: "2023-10-20",
  },
  {
    id: 28,
    title: "요가 자세 연습",
    author: "YogaPosePractice",
    date: "2023-10-21",
  },
  {
    id: 29,
    title: "스트레칭 루틴 공유",
    author: "StretchingRoutine",
    date: "2023-10-22",
  },
  {
    id: 30,
    title: "수영 자세 개선 팁",
    author: "SwimmingTechnique",
    date: "2023-10-23",
  },
  {
    id: 31,
    title: "매일 사이클링 습관의 힘",
    author: "DailyCyclist",
    date: "2023-10-24",
  },
  {
    id: 32,
    title: "요가 동작 해설",
    author: "YogaPoseExplained",
    date: "2023-10-25",
  },
  {
    id: 33,
    title: "걷기의 효과",
    author: "WalkingBenefits",
    date: "2023-10-26",
  },
];

export default function BoardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  const totalPages = Math.ceil(initialPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = initialPosts.slice(startIndex, endIndex);

  return (
    <div className={styles.App}>
      <h1>운동뭉치 게시판</h1>

      <table className={styles["post-table"]}>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles["pagination-buttons"]}>
        <button onClick={() => setCurrentPage(1)}>첫 페이지</button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전 페이지
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음 페이지
        </button>
        <button onClick={() => setCurrentPage(totalPages)}>마지막 페이지</button>
        <Link to="/createpostpage">
          <button>글 작성</button>
        </Link>
      </div>
    </div>
  );
}