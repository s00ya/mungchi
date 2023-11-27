import styles from "./MainPage.module.css";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetUserId } from './action.js';

const MainPage = () => {
  const userId = useSelector(state => state.userId);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetUserId());
  };

  return (
    <div className={styles.mainpage}>

      <div className={styles["mainpage-item"]} />
      <div className={styles.div139}>운동뭉치와 함께하세요</div>
      <div className={styles.div140}>
        <p className={styles.p13}>{`운동뭉치는 운동을 좋아하는 사람들이 모여 함께 운동을 즐기고 소통하는 공간입니다. 다양한 메이트들과 함께 운동을 할 수 있으며, 게시판을 이용하여 새로운 사람들과 운동에 관련된 이야기를 나눌 수도 있습니다. `}</p>
        <p className={styles.p13}>{`매칭 조건 설정으로 나에게 꼭 맞는 운동 메이트를 매칭 받아보세요. `}</p>
        <p className={styles.p13}>함께 즐거운 운동 시간을 보내시길 바랍니다.</p>
      </div>
      <Link to="/filteringpage"><div className={styles["mainpage-child"]} /><b className={styles.b10}>매칭 조건 설정하기</b>
      <img className={styles["mainpage-inner"]} alt="" src="/polygon-1.svg" /></Link>
      <Link to="/matchingpage"><div className={styles["mainpage-item"]} /><b className={styles.b11}>메이트 매칭 받기</b>
      <img className={styles["mainpage-child1"]} alt="" src="/polygon-1.svg" /></Link>
      <Link to="/"><div className={styles.div141}>운동뭉치</div></Link>
      <Link to="/matchingpage"><div className={styles.div142}>메이트 매칭</div></Link>
      <Link to="/boardpage"><div className={styles.div143}>게시판</div></Link>
      <Link to="/myprofilepage"><div className={styles.div144}>마이페이지</div></Link>

      {userId !== null ? (
        <div className={styles["user-welcome"]}>
          <div className={styles["user-info"]}>
            <Link to="/myprofilepage">
              <div className={styles["userid3"]}>{userId}님, 환영합니다!</div>
            </Link>
          </div>
          <div className={styles["logout-button"]} onClick={handleLogout}>로그아웃</div>
        </div>
      ) : (
        <>
          <Link to="/loginpage">
            <div className={styles.login}>
              <div className={styles.div145}>로그인</div>
              <img className={styles["login-child"]} alt="" src="/rectangle-2.svg" />
            </div>
          </Link>
          <Link to="/signuppage">
            <img className={styles["mainpage-child2"]} alt="" src="/rectangle-3.svg" />
            <div className={styles.div146}>회원가입</div>
          </Link>
        </>
      )}
      <img className={styles["mainpage-child3"]} alt="" src="/rectangle-1@2x.png" />
      <div className={styles.div147}>
        <p className={styles.p13}>{`운동뭉치에서 여러분에게 딱 맞는 `}</p>
        <p className={styles.p13}>운동 메이트를 찾아보세요!</p>
      </div>
      <img className={styles["mainpage-child4"]} alt="" src="/rectangle-4.svg" />
      <b className={styles.b12}>빠르고 정확한 매칭을 간단하게</b>
      <div className={styles.div148}>어렵지 않게 나와 가장 잘 맞는 메이트 찾기</div>
      <img className={styles["mainpage-child5"]} alt="" src="/rectangle-18.svg" />
      <div className={styles.div149}>운동뭉치만의 특별한 서비스를 경험해보세요</div>
      <div className={styles["mainpage-child6"]} />
      <div className={styles.div150}>자유로운 의견 교환</div>
      <div className={styles.div151}>
        활발하게 의견 교환이 이루어지는 게시판을 제공합니다.
      </div>
      <Link to="/boardpage"><div className={styles["mainpage-child7"]} />
      <div className={styles.div152}>게시판으로 바로 이동</div></Link>
      <div className={styles["mainpage-child8"]} />
      <div className={styles.div153}>정확한 매칭률</div>
      <div className={styles.div154}>
        <p className={styles.p13}>{`협업 필터링 알고리즘을 기반으로 `}</p>
        <p className={styles.p13}>{`더욱 정확한 메이트 매칭 경험을 제공합니다. `}</p>
      </div>
      <div className={styles["mainpage-child9"]} />
      <div className={styles.div155}>{`빠른 매칭 `}</div>
      <div className={styles.div156}>운동 메이트를 빠르고 정확하게 매칭해줍니다.</div>
    </div>
  );
};

export default MainPage;
