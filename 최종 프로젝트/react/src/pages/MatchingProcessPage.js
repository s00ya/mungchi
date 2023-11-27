import React from 'react';
import styles from './MatchingProcessPage.module.css';

const MatchingProcessPage = () => {
  return (
    <div className={styles.matchingprocesspage}>
      <div className={styles.div169}>운동뭉치</div>
      <div className={styles.div170}>메이트 매칭</div>
      <img className={styles['matchingprocesspage-child']} alt="" src="/rectangle-1@2x.png" />
      <div className={styles.div171}>
        <p className={styles.p18}>{`운동뭉치에서 여러분에게 딱 맞는 `}</p>
        <p className={styles.p18}>운동 메이트를 찾아보세요!</p>
      </div>
      <img className={styles['matchingprocesspage-item']} alt="" src="/rectangle-4.svg" />
      <b className={styles.b17}>빠르고 정확한 매칭을 간단하게</b>
      <div className={styles.div172}>어렵지 않게 나와 가장 잘 맞는 메이트 찾기</div>
      <img className={styles['matchingprocesspage-inner']} alt="" src="/rectangle-18.svg" />
      <div className={styles.div173}>운동뭉치만의 특별한 서비스를 경험해보세요</div>
      <div className={styles['matchingprocesspage-child1']} />
      <div className={styles.div174}>자유로운 의견 교환</div>
      <div className={styles.div175}>
        활발하게 의견 교환이 이루어지는 게시판을 제공합니다.
      </div>
      <div className={styles['matchingprocesspage-child2']} />
      <div className={styles.div176}>게시판으로 바로 이동</div>
      <div className={styles['matchingprocesspage-child3']} />
      <div className={styles.div177}>정확한 매칭률</div>
      <div className={styles.div178}>
        <p className={styles.p18}>{`협업 필터링 알고리즘을 기반으로 `}</p>
        <p className={styles.p18}>{`더욱 정확한 메이트 매칭 경험을 제공합니다. `}</p>
      </div>
      <div className={styles['matchingprocesspage-child4']} />
      <div className={styles.div179}>{`빠른 매칭 `}</div>
      <div className={styles.div180}>운동 메이트를 빠르고 정확하게 매칭해줍니다.</div>
      <div className={styles.div181}>1/3</div>
      <div className={styles.userid4}>USERID님, 환영합니다!</div>
      <div className={styles.div182}>메이트 매칭이 진행중입니다.</div>
    </div>
  );
};

export default MatchingProcessPage;
