import styles from "./MatchingResultPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetUserId } from './action.js';


const MatchingResultPage = () => {
  const userId = useSelector(state => state.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetUserId());
  };

  useEffect(() => {
        if (userId == null) {
           window.location.href = '/loginpage';
           alert("로그인이 필요합니다.");
        }
      }, [userId]);

  useEffect(() => {
          axios
            .post("http://localhost:8080/filtering/filteringInfo", {userId}, {
                header: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
              const userInfo = response.data;

              const exercise1 = userInfo.exercise1;
              const exercise2 = userInfo.exercise2;
              const exercise3 = userInfo.exercise3;
              const userDate = userInfo.date;
              const userTime = userInfo.time;
              const userMbti = userInfo.userMbti;

              console.log(userInfo);

              if (!((exercise1 && !exercise2 && !exercise3) || (!exercise1 && exercise2 && !exercise3) || (!exercise1 && !exercise2 && exercise3)) || !userDate || !userTime || !userMbti) {
                      alert("매칭 조건 설정이 필요합니다.");
                      navigate('/filteringpage');
               }
            })
            .catch((error) => {
              console.error("API 호출 중 오류 발생", error);
            });
  }, []);

  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [expandedContainers, setExpandedContainers] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const getRandomUsers = () => {
    const usersCopy = [...matchedUsers];
    const randomUsers = [];
    while (randomUsers.length < 5 && usersCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * usersCopy.length);
      randomUsers.push(usersCopy.splice(randomIndex, 1)[0]);
    }
    return randomUsers;
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= Math.ceil(matchedUsers.length / perPage)) {
      setCurrentPage(nextPage);
    } else {
      // 페이지 이동
      // 랜덤 사용자 목록을 갱신하고 다시 5명씩 보여줍니다.
      const randomUsers = getRandomUsers();
      setMatchedUsers(randomUsers);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    axios.post("http://localhost:5000/api/algorithm",  {userId}, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      const responseData = response.data.recommended_users.map(user => ({
        similarity: user.weighted_similarity,
        exerciseSimilarity: user.similarity_details.exercise,
        timeSlotSimilarity: user.similarity_details.time,
        daysOfWeekSimilarity: user.similarity_details.date,
        mbtiSimilarity: user.similarity_details.user_mbti,
        userId: user.userId,
      }));
      //console.log(responseData);
      setResponseData(responseData);

      const randomUsers = getRandomUsers();
      setMatchedUsers(randomUsers);
      setCurrentPage(1);
    })
    .catch((error) => {
      if (error.response) {
        console.error("API 호출 오류 - 상태 코드:", error.response.status, "오류 내용:", error.response.data);
      } else if (error.request) {
        console.error("API 호출 오류 - 요청에 응답이 없습니다.");
      } else {
        console.error("API 호출 중 오류 발생:", error.message);
      }
    })
    .finally(() => {
      setLoading(false); // 데이터 로딩이 끝날 때 로딩 상태 변경
    });
  }, [userId]);

  useEffect(() => {
    const userIds = responseData.map(user => user.userId);
    axios.post("http://localhost:8080/matching/userinfo", { userIds })
      .then((response) => {
        const transformedData = responseData.map(matchedUser => {
          const apiUser = response.data.find(user => user.userId === matchedUser.userId);

          return {
            profileImage: "/cat.jpg",
            nickname: apiUser.userNick,
            age: apiUser.userAge,
            gender: apiUser.userSex,
            exerciseType: `${apiUser.exercise1}, ${apiUser.exercise2}, ${apiUser.exercise3}`,
            daysOfWeek: apiUser.date,
            timeSlot: apiUser.time,
            mbti: apiUser.userMbti,
            similarity: matchedUser.similarity,
            exerciseSimilarity: matchedUser.exerciseSimilarity,
            timeSlotSimilarity: matchedUser.timeSlotSimilarity,
            daysOfWeekSimilarity: matchedUser.daysOfWeekSimilarity,
            mbtiSimilarity: matchedUser.mbtiSimilarity,
          };
        });
        console.log(transformedData);
        setMatchedUsers(transformedData);
      })
      .catch((error) => {
        console.error('API 호출 중 오류:', error);
      });
  }, [responseData]);

  const getGenderString = (gender) => {
    return gender === "male" ? "남" : gender === "female" ? "여" : "";
  };

  // 현재 페이지에 해당하는 결과만 가져오는 함수
  const getCurrentPageResults = () => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return matchedUsers.slice(startIndex, endIndex);
  };

  const toggleContainer = (index) => {
    if (expandedContainers.includes(index)) {
      setExpandedContainers(expandedContainers.filter((i) => i !== index));
    } else {
      setExpandedContainers([...expandedContainers, index]);
    }
  };

  return (
    <div className={styles.matchingresultpage1}>
      <Link to="/">
        <div className={styles.div65}>운동뭉치</div>
      </Link>
      <Link to="/matchingpage">
        <div className={styles.div66}>메이트 매칭</div>
      </Link>
      <Link to="/boardpage"><div className={styles.div143}>게시판</div></Link>
      <Link to="/myprofilepage"><div className={styles.div144}>마이페이지</div></Link>
      <img className={styles["rectangle-icon"]} alt="" src="/rectangle-1@2x.png" />
      <div className={styles.div67}>
        <p className={styles.p4}>{`운동뭉치에서 여러분에게 딱 맞는 `}</p>
        <p className={styles.p4}>운동 메이트를 찾아보세요!</p>
      </div>
      <img className={styles["matchingresultpage-child19"]} alt="" src="/rectangle-4.svg" />
      <b className={styles.b8}>빠르고 정확한 매칭을 간단하게</b>
      <div className={styles.div68}>어렵지 않게 나와 가장 잘 맞는 메이트 찾기</div>
      <Link to="/myprofilepage">
        <div className={styles.userid3}>{userId}님, 환영합니다!</div>
      </Link>
      <div className="logout-button" onClick={handleLogout}>
      로그아웃
      </div>
      <div className={styles.div70}>매칭결과</div>
      <div className={styles.div71}>운동 메이트 매칭 결과를 확인하세요.</div>
      <div className="div81">{userId}님의 메이트 매칭 결과</div>
      <div className={styles["button-container"]}>
        <button onClick={handleNextPage} className={styles["matching-button"]}>
          다시 매칭하기
        </button>
        <Link to="/" className={styles["home-button"]}>
          홈으로 돌아가기
        </Link>
      </div>

      <div className={styles["user-profiles"]}>
      {loading ? (
         // 로딩 중일 때 로딩 스피너를 표시
         <div className={styles.loadingSpinner}>

         </div>
       ) : (
        getCurrentPageResults().map((user, index) => (
          <div key={index} className={styles["user-profile"]} onClick={() => toggleContainer(index)}>
            <img src={user.profileImage} alt={user.nickname} className={styles["profile-image"]} />
            <p className={styles["user-nickname"]}>
              {user.nickname}
              <p className={styles["user-gender"]}>{`(${getGenderString(user.gender)}, ${user.age})`}</p>
            </p>
            <div
              className={`${styles["user-info"]} ${expandedContainers.includes(index) ? styles["expanded"] : ""}`}
            >
              <div className={`${styles["user-details"]} ${expandedContainers.includes(index) ? styles["hidden"] : ""}`}>

                <div><p>{`${user.exerciseType}`}</p>
                <p>{`${user.daysOfWeek} | ${user.timeSlot} | ${user.mbti}`}</p></div>
                <div className={`${styles["user-similarity2"]} ${expandedContainers.includes(index) ? styles["hidden"] : ""}`}>
                <span className={styles["profile-similarity"]}>유사도 {user.similarity}%</span></div>
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
              <Link to={`/chat/${user.nickname}`} className={styles["chat-button"]}>
                채팅방으로 이동
              </Link>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
};

export default MatchingResultPage;