import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Redux Thunk 미들웨어
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Redux Thunk 미들웨어 적용
);

export default store; // Redux 스토어를 기본 내보내기로 내보내기