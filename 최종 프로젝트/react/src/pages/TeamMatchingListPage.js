import styles from "./TeamMatchingListPage.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { resetUserId } from './action.js';
import { useEffect } from "react";
import { useSelector } from 'react-redux';

const TeamMatchingListPage = () => {
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


  const mockTeamMatchedUsers = [
    [
      {
        profileImage: "/cherry.jpg",
        nickname: "사용자 1",
        gender: "남성",
        age: 25,
        exercise: "등산",
        timeSlot: "아침, 오후",
        daysOfWeek: "월, 수, 금",
      },
      {
        profileImage: "/friends.jpg",
        nickname: "사용자 2",
        gender: "여성",
        age: 30,
        exercise: "수영",
        timeSlot: "오전, 저녁",
        daysOfWeek: "화, 목",
      },
    ],
    [
      {
        profileImage: "/sky.jpg",
        nickname: "사용자 3",
        gender: "남성",
        age: 28,
        exercise: "요가",
        timeSlot: "저녁, 밤",
        daysOfWeek: "수, 토",
      },
      {
        profileImage: "/cat.jpg",
        nickname: "사용자 4",
        gender: "여성",
        age: 22,
        exercise: "테니스",
        timeSlot: "오전, 오후",
        daysOfWeek: "목, 토",
      },
      {
        profileImage: "/sky.jpg",
        nickname: "사용자 5",
        gender: "남성",
        age: 28,
        exercise: "요가",
        timeSlot: "저녁, 밤",
        daysOfWeek: "수, 토",
      },
      {
        profileImage: "/cat.jpg",
        nickname: "사용자 6",
        gender: "여성",
        age: 22,
        exercise: "테니스",
        timeSlot: "오전, 오후",
        daysOfWeek: "목, 토",
      },
      {
        profileImage: "/sky.jpg",
        nickname: "사용자 7",
        gender: "남성",
        age: 28,
        exercise: "요가",
        timeSlot: "저녁, 밤",
        daysOfWeek: "수, 토",
      },
      {
        profileImage: "/cat.jpg",
        nickname: "사용자 8",
        gender: "여성",
        age: 22,
        exercise: "테니스",
        timeSlot: "오전, 오후",
        daysOfWeek: "목, 토",
      },
      {
        profileImage: "/sky.jpg",
        nickname: "사용자 9",
        gender: "남성",
        age: 28,
        exercise: "요가",
        timeSlot: "저녁, 밤",
        daysOfWeek: "수, 토",
      },
      {
        profileImage: "/cat.jpg",
        nickname: "사용자 10",
        gender: "여성",
        age: 22,
        exercise: "테니스",
        timeSlot: "오전, 오후",
        daysOfWeek: "목, 토",
      }
    ],
  ];

  return (
    <div className={styles.matchinglistpage}>
    <Link to="/filteringpage"><div className={styles.div}>매칭조건설정</div></Link>
    <Link to="/matchinglistpage"><b className={styles.b}>매칭내역</b></Link>
    <Link to="/myprofilepage"><div className={styles.div4}>내프로필</div></Link>
    <div className={styles["matchinglistpage-child"]} />
    <Link to="/"><b className={styles.b1}>운동뭉치</b></Link>
    <Link to="/myprofilepage"><div className={styles.mypage}>MYPAGE</div></Link>
    <Link to="/myprofilepage"><div className={styles.userid3}>USERID님, 환영합니다!</div></Link>
      <div className={styles["logout-button"]} onClick={handleLogout}>
      로그아웃
      </div>
    <div className={styles["matchinglistpage-item"]} />
    <div className={styles.div5}>매칭내역</div>
    <div className={styles.div6}>운동 메이트 매칭 내역을 확인하고 관리합니다.</div>
    <Link to="/matchinglistpage"><div className={styles.onematching}>일대일 매칭 내역</div></Link>
    <Link to="/teammatchinglistpage"><div className={styles.teammatching}>팀 매칭 내역</div></Link>
<div className={styles["matchinglist-teamcontainer"]} style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
  {mockTeamMatchedUsers.map((team, index) => (
    <div key={index} className={styles["user-teamprofile2"]} >
      <p className={styles["user-teaminfo"]} >
        운동종목, {team.length}명의 팀 매칭결과
      </p>
      {team.map((user, userIndex) => (
         <div key={userIndex} className={styles["user-teamprofile"]} style={{ width: '100px', display: 'inline-block', flexDirection: 'row', alignItems: 'center' }}>
          <img src={user.profileImage} alt={user.nickname} className={styles["profile-image"]} />
          <div className={styles["user-info"]}>
            <p className={styles["user-nickname"]}>
              {user.nickname}
              <span className={styles["user-gender"]}>{`(${user.gender}, ${user.age})`}</span>
            </p>
            <p className={styles["user-details"]}>
              <strong>운동: </strong> {user.exercise}
            </p>
            <p className={styles["user-details"]}>
              <strong>시간대: </strong> {user.timeSlot}
            </p>
            <p className={styles["user-details"]}>
              <strong>요일: </strong> {user.daysOfWeek}
            </p>
          </div>
        </div>
      ))}

          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMatchingListPage;
