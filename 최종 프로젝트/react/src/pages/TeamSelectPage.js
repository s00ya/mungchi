import React, { useState, useEffect } from 'react';
import styles from './TeamSelectPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { resetUserId } from './action.js';
import { useSelector } from 'react-redux';
function TeamSelectPage() {
  const userId = useSelector(state => state.userId);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetUserId());
  };

  useEffect(() => {
        // 사용자가 로그인하지 않은 경우, 로그인 페이지로 리디렉션
        if (userId == null) {
          // 리디렉션하는 방법은 페이지 내에서 window.location 또는 history.push 등을 사용할 수 있습니다.
           window.location.href = '/loginpage'; // 예시: 페이지 전체 리로드
           alert("로그인이 필요합니다.");
        }
      }, [userId]);


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

  const [selectedExercise, setSelectedExercise] = useState("");
  const [selectedTeamSize, setSelectedTeamSize] = useState(2);

  const handleExerciseChange = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleTeamSizeChange = (size) => {
    if (size >= 2 && size <= 10) {
      setSelectedTeamSize(size);
    }
  };

  const isButtonDisabled = !selectedExercise || selectedTeamSize < 2;

  return (
    <div className={styles.teamselectpage}>
      <Link to="/"><div className={styles.div}>운동뭉치</div></Link>
      <Link to="/matchingpage"><div className={styles.div1}>메이트 매칭</div></Link>
      <Link to="/myprofilepage"><div className={styles.userid3}>{userId}님, 환영합니다!</div></Link>
      <div className={styles["logout-button"]} onClick={handleLogout}>
      로그아웃
      </div>
      <Link to="/boardpage"><div className={styles.div143}>게시판</div></Link>
      <Link to="/myprofilepage"><div className={styles.div144}>마이페이지</div></Link>
      <img className={styles['teamselectpage-child']} alt="" src="/rectangle-1@2x.png" />
      <div className={styles.div2}>
        <p className={styles.p}>{`운동뭉치에서 여러분에게 딱 맞는 `}</p>
        <p className={styles.p}>운동 메이트를 찾아보세요!</p>
      </div>
      <img className={styles['teamselectpage-item']} alt="" src="/rectangle-4.svg" />
      <b className={styles.b}>빠르고 정확한 매칭을 간단하게</b>
      <div className={styles.div3}>어렵지 않게 나와 가장 잘 맞는 메이트 찾기</div>
      <img className={styles['teamselectpage-inner']} alt="" src="/rectangle-18.svg" />
      <div className={styles.div4}>운동뭉치만의 특별한 서비스를 경험해보세요</div>
      <div className={styles['rectangle-div']} />
      <div className={styles.div5}>자유로운 의견 교환</div>
      <div className={styles.div6}>
        활발하게 의견 교환이 이루어지는 게시판을 제공합니다.
      </div>
      <Link to="boardpage"><div className={styles['teamselectpage-child1']} />
      <div className={styles.div7}>게시판으로 바로 이동</div></Link>
      <div className={styles['teamselectpage-child2']} />
      <div className={styles.div8}>정확한 매칭률</div>
      <div className={styles.div9}>
        <p className={styles.p}>{`협업 필터링 알고리즘을 기반으로 `}</p>
        <p className={styles.p}>{`더욱 정확한 메이트 매칭 경험을 제공합니다. `}</p>
      </div>
      <div className={styles['teamselectpage-child3']} />
      <div className={styles.div10}>{`빠른 매칭 `}</div>
      <div className={styles.div11}>운동 메이트를 빠르고 정확하게 매칭해줍니다.</div>
      <label className={styles.labelStyle}>매칭받고 싶은 인원을 설정해주세요 (2~10명)</label>
 <div className={`${styles.teamSelectContainer}`}>
  <div className={styles.teamSizeControls}>
    <FontAwesomeIcon icon={faMinus} onClick={() => handleTeamSizeChange(selectedTeamSize - 1)} />
    <span>{selectedTeamSize}</span>
    <FontAwesomeIcon icon={faPlus} onClick={() => handleTeamSizeChange(selectedTeamSize + 1)} />
  </div>
</div>

      <div className={styles.exerciseSelectContainer}>
        <label>매칭받고 싶은 운동을 선택하세요</label>
        <select
          value={selectedExercise}
          onChange={(e) => handleExerciseChange(e.target.value)}
        >
          <option value="">선택</option>
          {exerciseOptions.map((exercise, index) => (
            <option key={index} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </div>

      <Link to={`/TeamMatchingResultPage?exercise=${selectedExercise}&teamSize=${selectedTeamSize}`}><button
        className={`${styles.confirmButton} ${isButtonDisabled ? styles.disabled : ''}`}
        disabled={isButtonDisabled}
      >
        확인
      </button></Link>
    </div>
  );
}


export default TeamSelectPage;
