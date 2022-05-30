
/* Router setup */
import { Route, Routes } from 'react-router-dom';

/* Pages setup */
import Home from './pages/Home';
import Post from './pages/Post';

/* CSS setup */
import './App.css';
import styled from 'styled-components';

/* FB setup */
// import {db} from './firebase-config';
// import { collection, getDocs } from "firebase/firestore";
import { loadPokeFB } from './redux/modules/pokeReducer';

/* Redux setup */
import { useDispatch } from "react-redux";
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPokeFB());
  }, [dispatch])

  return (
    <>
    <HeaderContainer>
    <h1 className = "pokeDexTitle">Pokedex</h1>
    </HeaderContainer>
    <Routes>
      <Route path="/" element = { <Home /> } />
      <Route path="/post" element = { <Post/> } />
    </Routes>
    </>
  );
}

const HeaderContainer = styled.div`
  width : 100%;
  height : 100px;
  background-color: #dc0a2d;

  display : flex;
  justify-content: center;
  align-items: center;

  border-bottom: 10px solid black;
`

export default App;
