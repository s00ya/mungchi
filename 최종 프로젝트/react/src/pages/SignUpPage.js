import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from './SignUpPage.module.css';

const SignUpPage = () => {

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "", // 추가: 성별
    age: "", // 추가: 나이
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

//  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

/*  // 아이디 중복 확인 함수
  const handleCheckDuplicate = async () => {
    try {
      const response = await axios.get(`/api/check-username/${formData.username}`);

      if (response.status === 200) {
        if (response.data.available) {
          // 아이디가 사용 가능한 경우
          alert("사용 가능한 아이디입니다.");
          setIsUsernameAvailable(true);
        } else {
          // 아이디가 이미 사용 중인 경우
          alert("이미 사용 중인 아이디입니다. 다른 아이디를 선택하세요.");
          setIsUsernameAvailable(false);
        }
      }
    } catch (error) {
      console.error("아이디 중복 확인 오류:", error);
    }
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
   if (
      formData.name === "" ||
      formData.nickname === "" ||
      formData.username === "" ||
      formData.password === "" ||
      formData.confirmPassword === "" ||
      formData.gender === "" ||
      formData.age === ""
   ) {
       setError("모든 항목을 입력해야 합니다.");
       return;
   }
    // 비밀번호 확인 검사
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    const data = {
      userId: formData.username,
      userPw: formData.password,
      userName: formData.name,
      userNick: formData.nickname,
      userSex: formData.gender,
      userAge: formData.age
    };
     axios
        .post("http://localhost:8080/api/users/signup", data)
        .then((response) => {
           if (response.status === 200) {
                alert("회원가입이 완료되었습니다.");
           }
        })
        .catch((error) => {
          console.error("데이터를 저장하는 중 오류가 발생했습니다.", error);
        });
/*
    if (!isUsernameAvailable) {
      alert("아이디 중복 확인을 먼저 수행하세요.");
      return;
    }
*/

    // 나머지 회원가입 로직 (이메일, 비밀번호 확인 등) 추가

    // 서버로 회원가입 정보 전송
  };

  return (
    <div className={styles.signuppage}>
      <Link to="/">
        <div className={styles.div45}>운동뭉치</div>
      </Link>
      <div className={styles.div55}>회원가입</div>
      <div className={styles.div56}>{`운동뭉치의 다양한 서비스를 경험해보세요 `}</div>
      <div className={styles["rectangle-parent"]}>
        <Link to="/idcheck">
          <div className={styles["group-child"]} />
          <div className={styles.div57}>
            {`중복확인 `}
          </div>
        </Link>
      </div>
      <div className={styles["rectangle-group"]}>


          <div type="submit" className={styles.div59} onClick={handleSubmit}>
          <Link to="/signupsuccesspage">
            <div className={styles["group-child1"]}>가입하기</div>
          </Link>
          </div>

      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles["rectangle-container"]}>
          <div className={styles["group-child2"]} />
          <input
            type="text"
            className={styles.div60}
            placeholder="이름"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles["rectangle-parent5"]}>
  <div className={styles["group-child2"]} />
  <p className={styles.div61}>{`성별`}</p>
  <div className={styles.genderRadioGroup}>
    <label>
      <input
        type="radio"
        name="gender"
        value="female"
        checked={formData.gender === "female"}
        onChange={handleChange}
      />
      여자
    </label>
    <label>
      <input
        type="radio"
        name="gender"
        value="male"
        checked={formData.gender === "male"}
        onChange={handleChange}
      />
      남자
    </label>
  </div>
</div>
        {/* 추가: 나이 입력 필드 */}
        <div className={styles["rectangle-parent6"]}>
          <div className={styles["group-child2"]} />
          <input
            type="text"
            className={styles.div61}
            placeholder="나이"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className={styles["rectangle-parent1"]}>
          <div className={styles["group-child2"]} />
          <input
            type="text"
            className={styles.div100}
            placeholder="닉네임"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </div>
        <div className={styles["rectangle-parent2"]}>
          <div className={styles["group-child5"]} />
          <input
            type="text"
            className={styles.div62}
            placeholder="아이디"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className={styles["rectangle-parent3"]}>
          <div className={styles["group-child2"]} />
          <input
            type="password"
            className={styles.div64}
            placeholder="비밀번호"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className={styles["rectangle-parent4"]}>
          <div className={styles["group-child2"]} />
          <input
            type="password"
            className={styles.div64}
            placeholder="비밀번호 확인"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>


      </form>
    </div>
  );
};

export default SignUpPage;