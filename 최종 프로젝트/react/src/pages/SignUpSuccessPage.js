import React from "react";
import styles from "./SignUpSuccessPage.module.css"; // Import the CSS module
import { Link } from "react-router-dom";

const SignUpSuccessPage = () => {
  return (
    <div className={styles.signupsuccesspage}> {/* Use the CSS module for the main container */}
      <div className={styles.div8}>회원가입이 완료되었습니다.</div>
      <div className={styles["user1-container"]}> {/* Use brackets for class names with hyphens */}
        <p className={styles.p}>{`환영합니다. USER1님! `}</p>
        <p className={styles.p}>운동뭉치의 다양한 서비스를 이용해보세요.</p>
      </div>
      <Link to="/"><div className={styles.signupsuccesspageChild}> {/* Use camelCase for class names */}
      </div>
      <div className={styles.div9}>메인으로 가기</div></Link>
      <Link to="/loginpage"><div className={styles.signupsuccesspageChild2}> {/* Use camelCase for class names */}
      </div>
      <div className={styles.div10}>바로 로그인</div></Link>
    </div>
  );
};

export default SignUpSuccessPage;