import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updatePokeFB } from '../redux/modules/pokeReducer';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useRef } from "react";

function Update() {

    // parameter 받아오기 : id, idx
    const { id, idx } = useParams();

    // list destructuring, data 
    const { list } =  useSelector((state) => state.pokeReducer);
    // const pokeMemo = list;
    // console.log(pokeMemo); => 확인완료

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useRef
    const newPokeName = useRef();
    const newPokeIdx = useRef();
    const newPokeStats = useRef();
    const newPokeType = useRef();
    const newPokeStory = useRef();

    // update event
    const handlePokeUpdate = () => {
      if (
        newPokeName.current.value !== "" &&
        newPokeIdx.current.value !== "" &&
        newPokeStats.current.value !== ""
        ) {
        dispatch(updatePokeFB({
          id : id,
          pokeIdx: newPokeIdx.current.value,
          pokeName : newPokeName.current.value,
          pokeStats: newPokeStats.current.value,
          pokeStory :newPokeStory.current.value,
          pokeType :newPokeType.current.value}, idx )          
        );
        alert ("도감 수정 완료!");
        navigate("/");
      }else {
        alert ("다시 작성해주세요!");
      }
    };

    // useEffect( () => {
    //   newPokeIdx.current.value = pokeMemo?.pokeIdx;
    //   newPokeName.current.value = pokeMemo?.pokeName;
    //   newPokeType.current.value = pokeMemo?.pokeType;
    //   newPokeStory.current.value = pokeMemo?.pokeStory;
    //   newPokeStats.current.value = pokeMemo?.pokeStats;
    // });
    
return (
    <>
      <UpdatingWrap>
        <div className = "posting-title">
          <h1>도감 등록하기</h1>
        </div>

        <UpdateForm className = "posting-form">
          <input ref = {newPokeIdx} type = "text" placeholder = "도감 번호" required ></input>
          <input ref = {newPokeName} type = "text" placeholder = "포켓몬 이름" required ></input>
          <input ref = {newPokeType} type = "text" placeholder = "타입" required ></input>
          <input ref = {newPokeStats} type = "text" placeholder = "종족값" required ></input>
          <input ref = {newPokeStory} type = "text" placeholder = "설명" required ></input>
          <button className = "posting-btn" onClick={() => { handlePokeUpdate();}}> 도감 수정 </button>
        </UpdateForm>
      </UpdatingWrap>
    </>
);
}

const UpdatingWrap = styled.div`
  margin-top: 60px;

  display : flex;
  width : 100%;
  height: 100%;

  flex-direction: column;
  align-items: center;
`
const UpdateForm = styled.div`
  display : flex;
  flex-direction: column;
  width : 400px;
`

export default Update;