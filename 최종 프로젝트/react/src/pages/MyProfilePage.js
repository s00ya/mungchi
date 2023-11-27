import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './MyProfilePage.module.css';
import { useSelector } from 'react-redux';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { resetUserId } from './action.js';

const MyProfilePage = () => {
  const userId = useSelector(state => state.userId);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [responseData, setResponseData] = useState([]);

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



  const handlePhotoChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setSelectedPhoto(URL.createObjectURL(selectedFile));
    }
  };

  const handlePhotoDelete = () => {
    setSelectedPhoto(null);
  };

  const handleApply = () => {
    if (password !== passwordConfirmation) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('비밀번호가 일치합니다.');
    }
  };

  useEffect(() => {
  axios
        .get(`http://localhost:8080/api/users/getUserInfo/${userId}`)
        .then((response) => {
          const responseData = {
             userNick: response.data.userNick,
             userName: response.data.userName
          };
          setResponseData(responseData);
          console.log("데이터가 성공적으로 저장되었습니다!");
        })
        .catch((error) => {
          console.error("데이터를 조회하는 중 오류가 발생했습니다.", error);
        });
  }, [userId]);

  const userNick = responseData.userNick;
  const userName = responseData.userName;

  return (
    <div className={styles.myprofilepage}>
      <div className={styles.myprofilepageChild} />

      <Link to="/filteringpage">
        <div className={styles.div8}>매칭조건설정</div>
      </Link>
      <Link to="/matchinglistpage">
        <div className={styles.div9}>매칭내역</div>
      </Link>
      <b className={styles.b2}>내프로필</b>
      <div className={styles.myprofilepageItem} />
      <Link to="/"><b className={styles.b3}>운동뭉치</b></Link>
      <Link to="/myprofilepage"><div className={styles.mypage1}>MYPAGE</div></Link>
      <div className={styles.myprofilepageInner} />
      <div className={styles.lineDiv} />
      <Link to="/myprofilepage"><div className={styles.userid3}>{userId}님, 환영합니다!</div></Link>
      <div className={styles["logout-button"]} onClick={handleLogout}>
      로그아웃
      </div>
      <div className={styles.div13}>프로필 수정</div>
      <div className={styles.div14}>
        운동뭉치 사이트의 대표 프로필과 별명을 수정 하실 수 있습니다.
      </div>
      <div className={styles.myprofilepageChild1} />
      <div className={styles.myprofilepageChild2} />
      <div className={styles.myprofilepageChild3} />
      <div className={styles.myprofilepageChild4} />
      <div className={styles.myprofilepageChild5} />
      <div className={styles.myprofilepageChild6} />
      <div className={styles.myprofilepageChild7} />
      <div className={styles.myprofilepageChild8} />
      <div className={styles.div15}>프로필 사진</div>
      <div className={styles.div16}>회원 아이디</div>
      <div className={styles.div17}>별명</div>
      <div className={styles.div18}>이름</div>
      <div className={styles.div19}>비밀번호 변경</div>
      <div className={styles.div20}>비밀번호 변경 확인</div>
      <div className={styles.profilePhoto}>
        {selectedPhoto ? (
          <img src={selectedPhoto} alt="Profile" className={styles.profileImage} />
        ) : (
          <div className={styles.frameDiv2}>
            <input type="file" id={styles.photoInput} accept="image/*" onChange={handlePhotoChange} />
          </div>
        )}
      </div>
      <div className={styles.container}>
        <label htmlFor={styles.photoInput} className={styles.div21}>사진변경</label>
      </div>
      <div className={styles.frameDiv} />
      <div className={styles.myprofilepageChild9}>
        <div className={styles.inputContainer}>
          <label htmlFor={styles.password}></label>
          <input type="password" id={styles.password} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      <div className={styles.myprofilepageChild10}>
        <div className={styles.inputContainer}>
          <label htmlFor={styles.passwordConfirmation}></label>
          <input type="password" id={styles.passwordConfirmation} value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        </div>
      </div>

      {passwordError && (
        <div className={styles.errorMessage} style={{ color: passwordError === '비밀번호가 일치합니다.' ? 'green' : 'red' }}>
          {passwordError}
        </div>
      )}

      <div className={styles.frame} onClick={handlePhotoDelete}>
        <div className={styles.div21}>삭제</div>
      </div>
      <div className={styles.wrapper1}>
        <div className={styles.div21} onClick={handleApply}>적용</div>
      </div>
      <Link to="/">
        <div className={styles.wrapper2}>
          <div className={styles.div21}>취소</div>
        </div>
      </Link>
      <div className={styles.userid}>{userId}</div>
      <div className={styles.nickname}>{userNick}</div>
      <div className={styles.username}>{userName}</div>
    </div>
  );
};

export default MyProfilePage;