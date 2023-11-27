import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { loginUser } from './action.js';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async () => {
    const userData = {
      userId: username,
      userPw: password,
    };

    // "loginUser" 액션을 디스패치
    dispatch(loginUser(userData));
  };

  return (
    <div className={styles.loginpage}>
      <div className={styles["loginpage-child"]} />
      <Link to="/">
        <div className={styles.div45}>운동뭉치</div>
      </Link>
      <div className={styles.id}>ID 로그인</div>
      <div className={styles["loginpage-item"]} />
      <div className={styles["loginpage-inner"]} />

      <div className={styles.div46}>
        <input
          type="text"
          placeholder="아이디"
          className={styles["input-box"]}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <Link to="/signuppage"><div className={styles.div50}>
        운동뭉치 회원가입
      </div></Link>
      <div className={styles.div51}>
        <input
          type="password"
          placeholder="비밀번호"
          className={styles["input-box"]}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Link to="/">      <div className={styles["loginpage-child1"]} /><div className={styles.div52} onClick={handleLogin}>로그인</div></Link>
      {errorMessage && <p className={styles["error-message"]}>{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
