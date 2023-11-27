import React from 'react';
import { Link } from "react-router-dom";
import styles from "./MatchingPage.module.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetUserId } from './action.js';
import { useEffect } from "react";



const MatchingPage = () => {
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

/*  useEffect(() => {
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

              if(exercise1 == null && exercise2 == null && exercise3 == null){
                 alert("매칭 조건 설정이 필요합니다.");
                 navigate("/filteringpage");
              }else if(userDate == null){
                 alert("매칭 조건 설정이 필요합니다.");
                 this.props.history.push("/filteringpage");
              }else if(userTime == null){
                 alert("매칭 조건 설정이 필요합니다.");
                 this.props.history.push("/filteringpage");
              }else if(userMbti == null){
                 alert("매칭 조건 설정이 필요합니다.");
                 this.props.history.push("/filteringpage");
              }
            })
            .catch((error) => {
              console.error("API 호출 중 오류 발생", error);
            });
  }, []);*/

  return (
    <div className={styles.matchingpage}>
      <Link to="/"><div className={styles.div117}>운동뭉치</div></Link>
      <Link to="/matchingpage"><div className={styles.div142}>메이트 매칭</div></Link>
      <Link to="/boardpage"><div className={styles.div143}>게시판</div></Link>
      <Link to="/myprofilepage"><div className={styles.div144}>마이페이지</div></Link>
      <img className={styles["matchingpage-child"]} alt="" src="/rectangle-1@2x.png" />
      <div className={styles.div119}>
        <p className={styles.p9}>{`운동뭉치에서 여러분에게 딱 맞는 `}</p>
        <p className={styles.p9}>운동 메이트를 찾아보세요!</p>
      </div>
      <img className={styles["matchingpage-item"]} alt="" src="/rectangle-4.svg" />
      <b className={styles.b9}>빠르고 정확한 매칭을 간단하게</b>
      <div className={styles.div120}>어렵지 않게 나와 가장 잘 맞는 메이트 찾기</div>
      <img className={styles["matchingpage-inner"]} alt="" src="/rectangle-18.svg" />
      <div className={styles.div121}>운동뭉치만의 특별한 서비스를 경험해보세요</div>
      <div className={styles["matchingpage-child1"]} />
      <div className={styles.div122}>자유로운 의견 교환</div>
      <div className={styles.div123}>
        활발하게 의견 교환이 이루어지는 게시판을 제공합니다.
      </div>
      <Link to="/boardpage"><div className={styles["matchingpage-child2"]} />
      <div className={styles.div124}>게시판으로 바로 이동</div></Link>
      <div className={styles["matchingpage-child3"]} />
      <div className={styles.div125}>정확한 매칭률</div>
      <div className={styles.div126}>
        <p className={styles.p9}>{`협업 필터링 알고리즘을 기반으로 `}</p>
        <p className={styles.p9}>{`더욱 정확한 메이트 매칭 경험을 제공합니다. `}</p>
      </div>
      <div className={styles["matchingpage-child4"]} />
      <div className={styles.div127}>{`빠른 매칭 `}</div>
      <div className={styles.div128}>운동 메이트를 빠르고 정확하게 매칭해줍니다.</div>
      <Link to="/myprofilepage"><div className={styles.userid3}>{userId}님, 환영합니다!</div></Link>
      <div className={styles["logout-button"]} onClick={handleLogout}>
      로그아웃
      </div>
      <div className={styles.div132}>{`메이트 매칭 받기 `}</div>
      <div className={styles.div133}>{`일대일 매칭 `}</div>
      <div className={styles.div134}>{`팀 매칭 `}</div>
      <div className={styles.div135}>잘 맞는 운동 메이트를 찾아보세요.</div>
      <div className={styles.div136}>{`여러 명의 메이트들과 매칭해 드립니다. `}</div>
      <Link to="/matchingresultpage"><div className={styles["matchingpage-child6"]} /><div className={styles.div137}>{`일대일 매칭 시작  `}</div></Link>
      <Link to="/teamselectpage"><div className={styles["matchingpage-child7"]} /><div className={styles.div138}>{`팀 매칭 시작 `}</div></Link>
    </div>
  );
};

export default MatchingPage;
