import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import styles from "./FilteringPage.module.css";
import axios from "axios";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetUserId } from './action.js';
import { useEffect } from "react";

function FilteringPage() {
  const userId = useSelector(state => state.userId);

  const dispatch = useDispatch();

  useEffect(() => {
        // 사용자가 로그인하지 않은 경우, 로그인 페이지로 리디렉션
        if (userId == null) {
          // 리디렉션하는 방법은 페이지 내에서 window.location 또는 history.push 등을 사용할 수 있습니다.
           window.location.href = '/loginpage'; // 예시: 페이지 전체 리로드
           alert("로그인이 필요합니다.");
        }
      }, [userId]);

  const handleLogout = () => {
    dispatch(resetUserId());
  };


const exerciseOptions = [
    "축구",
    "풋살",
    "족구",
    "발야구",
    "배구",
    "피구",
    "농구",
    "볼링",
    "탁구",
    "야구",
    "배드민턴",
    "테니스",
    "스쿼시",
    "골프/스크린골프",
    "주짓수",
    "유도",
    "무에타이",
    "태권도",
    "복싱",
    "사이클",
    "인라인스케이트",
    "아이스스케이트",
    "스키",
    "스노보드",
    "보드",
    "등산",
    "러닝",
    "마라톤",
    "수영",
    "서핑",
    "헬스",
    "크로스핏",
    "클라이밍",
    "요가",
    "필라테스",
  ];

  // 선택된 운동 종목을 저장할 state (최대 3개까지)
  const [selectedExercises, setSelectedExercises] = useState([]);

  // 시간대 목록
  const timeOptions = ["이른 오전", "오전", "오후", "늦은 오후", "저녁", "밤"];

  // 선택된 시간대를 저장할 state (순서대로 정렬)
  const [selectedTimes, setSelectedTimes] = useState([]);

  // 요일 목록
  const dayOptions = ["월", "화", "수", "목", "금", "토", "일"];
  const [selectedDays, setSelectedDays] = useState([]);

  // MBTI 옵션
  const mbtiOptions = [
    "ISTJ",
    "ISFJ",
    "INFJ",
    "INTJ",
    "ISTP",
    "ISFP",
    "INFP",
    "INTP",
    "ESTP",
    "ESFP",
    "ENFP",
    "ENTP",
    "ESTJ",
    "ESFJ",
    "ENFJ",
    "ENTJ",
  ];

  // 선택된 MBTI 유형을 저장할 state (단일 선택)
  const [selectedMbti, setSelectedMbti] = useState(null);

  // 운동 종목을 선택할 때 최대 3개까지만 허용하도록 업데이트
  const handleExerciseChange = (selected) => {
    if (selected.length <= 3) {
      setSelectedExercises(selected.map((item) => item.value));
    } else {
      alert("운동 종목을 3개 초과 선택할 수 없습니다.");
    }
  };

  // 시간대, 요일, MBTI 선택 핸들러들 (이전 코드와 동일)
  const handleTimeChange = (selected) => {
    setSelectedTimes(
      selected
        ? selected
            .map((item) => item.value)
            .sort((a, b) => timeOptions.indexOf(a) - timeOptions.indexOf(b))
        : [],
    );
  };

  const handleDayChange = (selected) => {
    setSelectedDays(
      selected
        ? selected
            .map((item) => item.value)
            .sort((a, b) => dayOptions.indexOf(a) - dayOptions.indexOf(b))
        : [],
    );
  };

  const handleMbtiChange = (selected) => {
    setSelectedMbti(selected ? selected.value : null);
  };

  // "확인" 버튼 클릭 시 데이터 저장
  const handleSaveData = () => {
    // API 호출을 통해 데이터를 서버에 저장
    const dataToSave = {
      userId,
      exercise1: selectedExercises[0] || null,
      exercise2: selectedExercises[1] || null,
      exercise3: selectedExercises[2] || null,
      time: selectedTimes,
      date: selectedDays,
      userMbti: selectedMbti,
    };

    axios
      .post("http://localhost:8080/filtering/save", dataToSave)
      .then((response) => {
        console.log("데이터가 성공적으로 저장되었습니다!", response.data);
      })
      .catch((error) => {
        console.error("데이터를 저장하는 중 오류가 발생했습니다.", error);
      });

    alert("데이터가 저장되었습니다!");
  };

  return (
    
    <div className={styles.myfilteringpage}>
      <Link to="/filteringpage">
        <b className={styles.myb5}>매칭조건설정</b>
      </Link>
      <Link to="/matchinglistpage">
        <div className={styles.mydiv38}>매칭내역</div>
      </Link>
      <Link to="/myprofilepage">
        <div className={styles.mydiv42}>내프로필</div>
      </Link>
      <div className={styles.myfilteringpageChild} />
      <Link to="/"><b className={styles.myb6}>운동뭉치</b></Link>
      <Link to="/myprofilepage"><div className={styles.mymypage1}>MYPAGE</div></Link>
      <div className={styles.myfilteringpageItem} />
      <Link to="/myprofilepage">
        <div className={styles.userid3}>{userId}님, 환영합니다!</div></Link>
      <div className={styles["logout-button"]} onClick={handleLogout}>
      로그아웃
      </div>
      <div className={styles.mydiv43}>매칭조건설정</div>
      <div className={styles.mydiv44}>매칭 조건을 수정합니다.</div>
      <Link to="/">
        <button className={styles.mybutton} onClick={handleSaveData}>적용</button>
      </Link>
      <div className={styles.myexerciseSelection}>
        <div className={styles.myfilterOption}>
          <label>운동 종목</label>
          <Select
            isMulti
            placeholder="운동 종목을 선택하세요..."
            options={exerciseOptions.map((exercise) => ({
              value: exercise,
              label: exercise,
            }))}
            value={selectedExercises.map((exercise) => ({
              value: exercise,
              label: exercise,
            }))}
            onChange={handleExerciseChange}
          />
          {selectedExercises.length > 3 && (
            <p>운동 종목을 3개 초과 선택할 수 없습니다.</p>
          )}
        </div>
        <div className={styles.myfilterOption}>
        <label>시간대</label>
          <Select
            isMulti
            placeholder="시간대를 선택하세요..."
            options={timeOptions.map((time) => ({ value: time, label: time }))}
            value={selectedTimes.map((time) => ({ value: time, label: time }))}
            onChange={handleTimeChange}
          />
        </div>
        <div className={styles.myfilterOption}>
        <label>요일</label>
          <Select
            isMulti
            placeholder="요일을 선택하세요..."
            options={dayOptions.map((day) => ({ value: day, label: day }))}
            value={selectedDays.map((day) => ({ value: day, label: day }))}
            onChange={handleDayChange}
          />
        </div>
        <div className={styles.myfilterOption}>
        <label>MBTI</label>
          <Select
            placeholder="MBTI를 선택하세요..."
            options={mbtiOptions.map((mbti) => ({ value: mbti, label: mbti }))}
            value={
              selectedMbti
                ? { value: selectedMbti, label: selectedMbti }
                : null
            }
            onChange={handleMbtiChange}
          />
        </div>
      </div>
    </div>
  );
}

export default FilteringPage;
