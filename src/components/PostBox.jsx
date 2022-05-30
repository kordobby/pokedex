import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { deletePokeFB } from "./redux/modules/pokeReducer";

function PostBox( ) {
  const myPokeList = useSelector((state) => state.pokeReducer.list);
  
  const pokeCard = myPokeList.map((value) => (<PostGrid id = {index} key = {value.id}>
    <PokePost className = "pokepost--box">
      <span>No.{value.pokeIdx}</span>
      <span>{value.pokeName}</span>
      <span>타입 : {value.pokeType}</span>
      <span>종족값 : {value.pokeStats}</span>
      <span>설명 : {value.pokeStory}</span>
    </PokePost>
  </PostGrid>)
  )
  return (
    <>
      {pokeCard}
    </>
  );
  }

const PostGrid = styled.div`
  height : 180px;

  display : flex;
  justify-content: center;
  align-items: center;
`

const PokePost = styled.div`
  box-sizing: border-box;
  width : 90%;
  height : 90%;

  border-radius: 30px;
  background-color: #f4f4f4;

  padding : 0px 20px;
  display : flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  font-family: 'DotFont';
  font-size: 15px;
`

export default PostBox;