import styled from 'styled-components';
import PostBox from '../components/PostBox';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadPokeFB } from '../redux/modules/pokeReducer';
function Home(  ) {
  // 카드에서 활용할 데이터 리스트 받아오기
  const myPokeList = useSelector((state) => state.pokeReducer.list);


  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(loadPokeFB());
    }, [dispatch]);

// useParam => 해당 페이지 컴포넌트가 가진 props를 이용해서 페이지 주소를 만들어줌
/*
1. Route 설정 : <Route path="/update/:id/:idx" element = {<Update/>}></Route>
2. 위의 path 를 보면, /:id/:idx 이 부분은 해당 페이지 컴포넌트의 props 값을 이용해서 형성
3. useParams 를 이용하면 해당 페이지의 parameter 를 꺼내와서 쓸 수 있음
*/

return (
  <>
    <MainGrid> { /* grid father */ }
      { myPokeList.map((value, index) => {
        return <PostBox 
        key = {value.id} 
        pokeIdx = {value.pokeIdx} 
        pokeName = {value.pokeName} 
        pokeType = {value.pokeType} 
        pokeStory = {value.pokeStory} 
        pokeStats = {value.pokeStats}
        idx = {index}
        id = {value.id}/>;     // parameter
      })} { /* grid sons*/ }
    </MainGrid>
    <BtnPosition>
      <Link to = "/post" >
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
  background-color: #dc0a2d;

  display : flex;
  justify-content: center;
  align-items: center;

  color : white;
  font-size : 25px;
  font-weight : 800;
`
export default Home;