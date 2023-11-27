import React, { useState } from 'react';
import styles from "./MatchingListPage.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { resetUserId } from './action.js';
import { useSelector } from 'react-redux';
import { useEffect } from "react";

const MatchingListPage = () => {
  const userId = useSelector(state => state.userId);
  const [expandedContainers, setExpandedContainers] = useState([]);
  useEffect(() => {
        // 사용자가 로그인하지 않은 경우, 로그인 페이지로 리디렉션
        if (userId == null) {
          // 리디렉션하는 방법은 페이지 내에서 window.location 또는 history.push 등을 사용할 수 있습니다.
           window.location.href = '/loginpage'; // 예시: 페이지 전체 리로드
           alert("로그인이 필요합니다.");
        }
      }, [userId]);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetUserId());
  };



  const toggleContainer = (index) => {
    if (expandedContainers.includes(index)) {
      setExpandedContainers(expandedContainers.filter((i) => i !== index));
    } else {
      setExpandedContainers([...expandedContainers, index]);
    }
  };

  const mockMatchedUsers = [
    {
      profileImage: "/cat.jpg",
      nickname: "림구",
      gender: "여",
      age: 24,
      exerciseType: "수영, 주짓수, 요가",
      timeSlot: "아침",
      daysOfWeek: "월, 수",
      mbti: "ISTJ",
      similarity: 90,
      exerciseSimilarity: 85,
      timeSlotSimilarity: 92,
      daysOfWeekSimilarity: 88,
      mbtiSimilarity: 95,
    },
    {
      profileImage: "/cherry.jpg",
      nickname: "째리",
      gender: "여",
      age: 30,
      exerciseType: "등산, 러닝",
      timeSlot: "이른오전, 오전, 저녁",
      daysOfWeek: "화, 수, 목",
      mbti: "ENFP",
      similarity: 85,
      exerciseSimilarity: 80,
      timeSlotSimilarity: 88,
      daysOfWeekSimilarity: 82,
      mbtiSimilarity: 90,
    },
    {
      profileImage: "/friends.jpg",
      nickname: "더지두",
      gender: "남",
      age: 27,
      exerciseType: "수영, 클라이밍, 스키",
      timeSlot: "이른오전, 오전, 오후, 늦은오후, 저녁, 밤",
      daysOfWeek: "월, 화, 수",
      mbti: "INTP",
      similarity: 92,
      exerciseSimilarity: 88,
      timeSlotSimilarity: 90,
      daysOfWeekSimilarity: 94,
      mbtiSimilarity: 92,
    },
    {
      profileImage: "/sky.jpg",
      nickname: "오복",
      gender: "여",
      age: 35,
      exerciseType: "테니스, 배구, 농구",
      timeSlot: "오후, 저녁, 밤",
      daysOfWeek: "화, 목, 토",
      mbti: "ISFJ",
      similarity: 88,
      exerciseSimilarity: 85,
      timeSlotSimilarity: 90,
      daysOfWeekSimilarity: 84,
      mbtiSimilarity: 92,
    },
    {
      profileImage: "/maenggu.jpg",
      nickname: "맹구",
      gender: "남",
      age: 29,
      exerciseType: "족구, 축구, 야구",
      timeSlot: "오전, 오후, 밤",
      daysOfWeek: "수, 금, 일",
      mbti: "ENTJ",
      similarity: 90,
      exerciseSimilarity: 92,
      timeSlotSimilarity: 86,
      daysOfWeekSimilarity: 90,
      mbtiSimilarity: 88,
    },
  ];

  return (
    <div className={styles.matchinglistpage}>
      <Link to="/filteringpage"><div className={styles.div}>매칭조건설정</div></Link>
      <Link to="/matchinglistpage"><b className={styles.b}>매칭내역</b></Link>
      <Link to="/myprofilepage"><div className={styles.div4}>내프로필</div></Link>
      <div className={styles["matchinglistpage-child"]} />
      <Link to="/"><b className={styles.b1}>운동뭉치</b></Link>
      <Link to="/myprofilepage"><div className={styles.mypage}>MYPAGE</div></Link>
      <Link to="/myprofilepage"><div className={styles.userid3}>{userId}님, 환영합니다!</div></Link>
      <div className={styles["logout-button"]} onClick={handleLogout}>
      로그아웃
      </div>
      <div className={styles["matchinglistpage-item"]} />

      <div className={styles.div5}>매칭내역</div>
      <div className={styles.div6}>운동 메이트 매칭 내역을 확인하고 관리합니다.</div>
      <Link to="/matchinglistpage"><div className={styles.onematching}>일대일 매칭 내역</div></Link>
      <Link to="/teammatchinglistpage"><div className={styles.teammatching}>팀 매칭 내역</div></Link>
      <div className={styles["matchinglist-container"]} style={{ overflowY: 'auto', maxHeight: '600px', paddingBottom: '20px' }}>
        {mockMatchedUsers.map((user, index) => (
          <div key={index} className={styles["user-profile"]} onClick={() => toggleContainer(index)}>
            <img src={user.profileImage} alt={user.nickname} className={styles["profile-image"]} />
            <p className={styles["user-nickname"]}>
              {user.nickname}
              <p className={styles["user-gender"]}>{`(${user.gender}, ${user.age})`}</p>
            </p>
            <div
              className={`${styles["user-info"]} ${expandedContainers.includes(index) ? styles["expanded"] : ""}`}
            >
              <div className={`${styles["user-details"]} ${expandedContainers.includes(index) ? styles["hidden"] : ""}`}>
                <span className={styles["profile-similarity"]}>유사도 {user.similarity}%</span>
                <div><p>{`${user.exerciseType}`}</p>
                <p>{`${user.daysOfWeek} | ${user.timeSlot}`}</p>
                <p>{``}</p>
                <p>{`${user.mbti}`}</p></div>
              </div>
              <div className={styles["user-details-expanded"]}>
                <div className={styles["user-info"]}>
                  <p>운동 종목 : {user.exerciseType} <span className={styles["type-similarity"]}>유사도 {user.exerciseSimilarity}%</span></p>
                  <p>시간대 : {user.timeSlot} <span className={styles["time-similarity"]}>유사도 {user.timeSlotSimilarity}%</span></p>
                  <p>요일 : {user.daysOfWeek} <span className={styles["daysofweek-similarity"]}>유사도 {user.daysOfWeekSimilarity}%</span></p>
                  <p>MBTI : {user.mbti} <span className={styles["mbti-similarity"]}>유사도 {user.mbtiSimilarity}%</span></p>
                   <span className={styles["total-similarity"]}>종합 유사도 {user.similarity}%</span> 
                   </div>
              </div>
            </div>
            <div className={styles["chat-button-container"]}>
              <span className={styles["triangle-icon"]} onClick={() => toggleContainer(index)}>
                {expandedContainers.includes(index) ? "▲" : "▼"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchingListPage;
