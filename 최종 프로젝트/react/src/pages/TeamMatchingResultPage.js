import "./TeamMatchingResultPage.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetUserId } from './action.js';

const TeamMatchingResultPage = () => {
  const userId = useSelector(state => state.userId);
    const navigate = useNavigate();
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

  useEffect(() => {
          axios
            .post("http://localhost:8080/filtering/filteringInfo", {userId}, {
                header: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
              const userInfo = response.data;

              const userDate = userInfo.date;
              const userTime = userInfo.time;

              console.log(userInfo);

              if (userDate === null || userTime === null) {
                      alert("매칭 조건 설정이 필요합니다.");
                      navigate('/filteringpage');
               }
            })
            .catch((error) => {
              console.error("API 호출 중 오류 발생", error);
            });
  }, []);


  const [responseData, setResponseData] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const exercise = queryParams.get("exercise");
  const teamSize = parseInt(queryParams.get("teamSize"), 10);

  console.log('exercise:', exercise);
  console.log('teamSize:', teamSize);

  useEffect(() => {
     const requestData = {
         user_id: userId,
         user_exercise: exercise, // 선택한 운동 종목
         num_similar_users: teamSize // 선택한 매칭 인원
     };
    axios.post("http://localhost:5001/api/team-matching",  requestData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      const responseData = response.data.similar_users.map(user => ({
        profileImage: "/userPhoto.png",
        nickname: user.user_info.user_nick,
        gender: user.user_info.user_sex,
        age: user.user_info.user_age,
        exercise1: user.user_info.exercise1,
        exercise2: user.user_info.exercise2,
        exercise3: user.user_info.exercise3,
        daysOfWeek: user.user_info.date,
        timeSlot: user.user_info.time,
        userId: user.user_id,
      }));
      console.log(responseData);
      setResponseData(responseData);
    })
    .catch((error) => {
      if (error.response) {
        console.error("API 호출 오류 - 상태 코드:", error.response.status, "오류 내용:", error.response.data);
      } else if (error.request) {
        console.error("API 호출 오류 - 요청에 응답이 없습니다.");
      } else {
        console.error("API 호출 중 오류 발생:", error.message);
      }
    });
  }, [exercise, teamSize, userId]);

  const getGenderString = (gender) => {
    return gender === "male" ? "남" : gender === "female" ? "여" : "";
  };

  return (
    <div className="matchingresultpage1">
      <Link to="/">
        <div className="div65">운동뭉치</div>
      </Link>
      <Link to="/matchingpage">
        <div className="div66">메이트 매칭</div>
      </Link>
      <Link to="/boardpage"><div className="div143">게시판</div></Link>
      <Link to="/myprofilepage"><div className="div144">마이페이지</div></Link>
      <img className="rectangle-icon" alt="" src="/rectangle-1@2x.png" />
      <div className="div67">
        <p className="p4">{`운동뭉치에서 여러분에게 딱 맞는 `}</p>
        <p className="p4">운동 메이트를 찾아보세요!</p>
      </div>
      <img className="matchingresultpage-child19" alt="" src="/rectangle-4.svg" />
      <b className="b8">빠르고 정확한 매칭을 간단하게</b>
      <div className="div68">어렵지 않게 나와 가장 잘 맞는 메이트 찾기</div>
      <Link to="/myprofilepage"><div className="userid3">{userId}님, 환영합니다!</div></Link>
      <div className="logout-button" onClick={handleLogout}>
      로그아웃
      </div>
      <div className="div70">매칭결과</div>
      <div className="div71">운동 메이트 매칭 결과를 확인하세요.</div>
      <div className="div81">{userId}님이 선택한 운동 {exercise}에 {teamSize}명의 팀원이 매칭되었습니다!</div>
      {/* 다시 매칭하기와 홈으로 돌아가기 버튼 */}
      <div className="button-container">
        <Link to="/chatroom">
        <button className="chat-button">채팅방으로 이동</button>
      </Link>
      <Link to="/">
        <button className="home-button">홈으로 돌아가기</button>
      </Link>
      </div>
      <div className="user-profiles">
        <div className="profile-slot">
          {responseData.map((user, index) => (
            <div key={index} className="user-profile">
              <img src={user.profileImage} alt={user.nickname} className="profile-image" />
              <p className="user-nickname">
                {user.nickname}
                <p className="user-gender">{`(${getGenderString(user.gender)}, ${user.age})`}</p>
              </p>
              <p className="user-details">
                <strong>운동 : </strong> {user.exercise1}, {user.exercise2}, {user.exercise3}
              </p>
              <p className="user-details">
                <strong>시간대 : </strong> {user.timeSlot}
              </p>
              <p className="user-details">
                <strong>요일 :</strong> {user.daysOfWeek}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMatchingResultPage;