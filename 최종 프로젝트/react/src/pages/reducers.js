const initialState = {
  userId: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_ID':
      return { ...state, userId: action.payload };
    case 'RESET_USER_ID':
      return { ...state, userId: null }; // userId 초기화
    default:
      return state;
  }
};

export default userReducer;