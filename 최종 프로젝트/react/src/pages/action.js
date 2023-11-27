import axios from 'axios';

// 사용자 정보 전달 및 userId 설정 액션
export const loginUser = (userData) => async (dispatch) => {
  try {
    // 서버로 POST 요청 보내기
    const response = await axios.post('http://localhost:8080/api/users/login', userData);

    // 서버 응답에서 userId 추출
    const userId = response.data;
    console.log("응답 데이터 : " + userId);

    // userId를 Redux 스토어에 저장
    dispatch({ type: 'SET_USER_ID', payload: userId });
  } catch (error) {
    // 오류 처리
    console.error('Login error:', error);
  }
};

export const resetUserId = () => ({
  type: 'RESET_USER_ID',
});