
/* Router setup */
import { Route, Routes, Link } from 'react-router-dom';

/* Pages setup */
import Home from './pages/Home';
import Post from './pages/Post';
import Update from './pages/Update';

/* CSS setup */
import './App.css';
import styled from 'styled-components';


function App() {

  return (
    <>
    <Link to = "/"><HeaderContainer>
    <h1 className = "pokeDexTitle">Pokedex</h1>
    </HeaderContainer></Link>
    <Routes>
      <Route path="/" element = { <Home/> } />
      <Route path="/post" element = { <Post/> } />
      <Route path="/update/:id/:idx" element = {<Update/>}></Route>
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
