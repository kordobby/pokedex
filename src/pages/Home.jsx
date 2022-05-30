import styled from 'styled-components';
import PostBox from '../components/PostBox';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadPokeFB } from '../redux/modules/pokeReducer';

function Home(  ) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPokeFB());
  })
  // console.log(myPokeList);

return (
  <>
    <MainGrid> { /* grid father */ }
      <PostBox/> { /* grid sons*/ }
    </MainGrid>
    <BtnPosition>
      <Link to = "/post">
        <LinkBtn>+</LinkBtn>
      </Link>
    </BtnPosition>
  </>
);
}

const MainGrid = styled.div`
  display : grid;
  grid-template-columns : repeat(3, 33%);
	grid-template-rows : repeat(3, 200px);

  box-sizing: border-box;

  padding : 30px;
`
const BtnPosition = styled.div`
  width : 100%;

  display : flex;
  justify-content: flex-end;

  position : fixed;
  bottom : 0;

  box-sizing: border-box;
  padding : 30px;
`
const LinkBtn = styled.div`
  width : 50px;
  height: 50px;
  border-radius: 50px;
  background-color: var(--blue);

  display : flex;
  justify-content: center;
  align-items: center;
`
export default Home;