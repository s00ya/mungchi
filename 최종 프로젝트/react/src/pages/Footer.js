import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles["footer-content"]}>
        <div className={styles["footer-section"]}>
          <h2>우리 사이트에 대해</h2>
          <p>저작권 © 2023 운동뭉치</p>
          <p>문의: support@exercisemates.com</p>
        </div>
        <div className={styles["footer-section"]}>
          <h2>사이트 맵</h2>
          <ul>
            <li><a href="/">홈</a></li>
            <li><a href="/matchingpage">메이트 매칭</a></li>
            <li><a href="/boardpage">게시판</a></li>
          </ul>
        </div>
        <div className={styles["footer-section"]}>
          <h2>팔로우</h2>
          <p>우리를 소셜 미디어에서 팔로우하세요.</p>
          <div className={styles["social-links"]}>
            <a href="https://www.facebook.com/exercisemates" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com/exercisemates" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://www.instagram.com/exercisemates" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
