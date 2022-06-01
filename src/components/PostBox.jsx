import styled from 'styled-components';
// import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { delPokeFB } from '../redux/modules/pokeReducer';
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";


function PostBox( props ) {

  // const pokemonId = props.key;
  const pokemonName = props.pokeName;
  const pokemonStats = props.pokeStats;
  const pokemonType = props.pokeType;
  const pokemonIdx = props.pokeIdx;
  const pokemonStory = props.pokeStory;
  const cardId = props.id;
  const pokeIdx = props.idx;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log(cardId)
  const handleDelPoke = (cardId) => {
    dispatch(delPokeFB(cardId));
    alert("삭제 완료!");
  }

  const fixPoke = (cardId) => {
    navigate(`/update/${cardId}/${pokeIdx}`);
  };

  return (
    <>
  <PostGrid>
    <PokePost className = "pokepost--box">
      <ButtonBox>
        <div>
          <span>No.{pokemonIdx}</span>
        </div>
        <div className = "btn-box__btns">
          <Button onClick = {() => {fixPoke(cardId)}}><FontAwesomeIcon icon={faPenToSquare} /></Button>
          <Button onClick = {() => { handleDelPoke(cardId); }}><FontAwesomeIcon icon={faTrashCan} /></Button>  
        </div>
      </ButtonBox>
      <span>{pokemonName}</span>
      <span>타입 : {pokemonType}</span>
      <span>종족값 : {pokemonStats}</span>
      <span>설명 : {pokemonStory}</span>
    </PokePost>
  </PostGrid>
    </>
  );
  }

const PostGrid = styled.div`
  height : 180px;

  display : flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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

  overflow: scroll;
`

const ButtonBox = styled.div`
  width : 100%;
  display : flex;
  align-items: center;
  justify-content: space-between;
`

const Button = styled.button`
  height : 40px;
  width : 40px;
  font-size: 20px;
  border-radius: 40px;
  border : none;
  background-color: white;
  margin-left: 5px;
  color : #959595;
  &:hover { background-color : #ffe438 }
`

export default PostBox;