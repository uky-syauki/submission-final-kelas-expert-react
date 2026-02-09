import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Loading from './components/Loading';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import LeaderboardPage from './pages/LeaderboardPage';
import { asyncUnsetAuthUser } from './states/authUser/action';
import { asyncPreloadProcess } from './states/isPreload/action';
import { useDispatch, useSelector } from 'react-redux';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  const { authUser = null, isPreload = false } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSingOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  // if (authUser !== null) {
  return (
    <>
      <Loading />
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomePage authUser={authUser} onSingOut={onSingOut} />} />
          <Route path='/threads/:id' element={<DetailPage authUser={authUser} onSingOut={onSingOut} />} />
          <Route path='/leaderboards' element={<LeaderboardPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer authUser={authUser} onSingOut={onSingOut} />
    </>
  );
  // }

  // return (
  //   <>
  //     <Loading />
  //     <main>
  //       <Routes>
  //         <Route path='/*' element={<HomePage authUser={authUser} onSingOut={onSingOut} />} />
  //       </Routes>
  //     </main>
  //   </>
  // );
}

export default App;