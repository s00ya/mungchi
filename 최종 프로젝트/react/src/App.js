import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import MatchingListPage from "./pages/MatchingListPage";
import MyProfilePage from "./pages/MyProfilePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MatchingProcessPage from "./pages/MatchingProcessPage";
import MatchingPage from "./pages/MatchingPage";
import MainPage from "./pages/MainPage";
import SignUpSuccessPage from "./pages/SignUpSuccessPage";
import MatchingResultPage from "./pages/MatchingResultPage";
import FilteringPage from "./pages/FilteringPage";
import TeamSelectPage from "./pages/TeamSelectPage";
import TeamMatchingResultPage from "./pages/TeamMatchingResultPage";
import BoardPage from "./pages/BoardPage";
import TeamMatchingListPage from "./pages/TeamMatchingListPage";
import { Provider } from 'react-redux'; // react-redux의 Provider 가져오기
import store from './pages/store'; // Redux 스토어 가져오기zz

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
        case "/boardpage":
          title = "";
          metaDescription = "";
          break;
      case "/myprofilepage":
        title = "";
        metaDescription = "";
        break;
      case "/loginpage":
        title = "";
        metaDescription = "";
        break;
      case "/signuppage":
        title = "";
        metaDescription = "";
        break;
      case "/matchingprocesspage":
        title = "";
        metaDescription = "";
        break;
      case "/matchingpage":
        title = "";
        metaDescription = "";
        break;
      case "/mainpage":
        title = "";
        metaDescription = "";
        break;
      case "/signupsuccesspage":
        title = "";
        metaDescription = "";
        break;
      case "/matchingresultpage":
        title = "";
        metaDescription = "";
        break;
      case "/matelistpage":
        title = "";
        metaDescription = "";
        break;
      case "/postlistpage":
        title = "";
        metaDescription = "";
        break;
      case "/filteringpage":
        title = "";
        metaDescription = "";
        break;
      case "/teamselectpage":
        title = "";
        metaDescription = "";
        break;
      case "/teammatchingresultpage":
        title = "";
        metaDescription = "";
        break;
      case "/teammatchinglistpage":
        title = "";
        metaDescription = "";
        break;
      default:
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
   <Provider store={store}>
     <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/myprofilepage" element={<MyProfilePage />} />
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/signuppage" element={<SignUpPage />} />
      <Route path="/matchingprocesspage" element={<MatchingProcessPage />} />
      <Route path="/matchingpage" element={<MatchingPage />} />
      <Route path="/matchinglistpage" element={<MatchingListPage />} />
      <Route path="/signupsuccesspage" element={<SignUpSuccessPage />} />
      <Route path="/matchingresultpage" element={<MatchingResultPage />} />
      <Route path="/filteringpage" element={<FilteringPage />} />
      <Route path="/teamselectpage" element={<TeamSelectPage />} />
      <Route path="/teammatchingresultpage" element={<TeamMatchingResultPage />} />
      <Route path="/boardpage" element={<BoardPage />} />
      <Route path="/teammatchinglistpage" element={<TeamMatchingListPage />} />
     </Routes>
  </Provider>
  );
}
export default App;