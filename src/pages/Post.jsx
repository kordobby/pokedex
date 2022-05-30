import React from "react";
import { useDispatch } from 'react-redux';
import { addPokeFB } from '../redux/modules/pokeReducer'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Post() {
    const idxRef = React.useRef(null);
    const nameRef = React.useRef(null);
    const statsRef = React.useRef(null);
    const storyRef = React.useRef(null);
    const typeRef = React.useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const addPokeDex = () => {
      dispatch(addPokeFB(
        {
          pokeIdx : idxRef.current.value,
          pokeName : nameRef.current.value,
          pokeStats : statsRef.current.value,
          pokeStory : storyRef.current.value,
          pokeType : typeRef.current.value
        }));
    navigate('/');
    }

return (
  <PostingWrap>
    <div className = "posting-title">
      <h1>도감 등록하기</h1>
    </div>
    <PostingForm className = "posting-form">
      <input ref = {idxRef}></input>
      <input ref = {nameRef}></input>
      <input ref = {typeRef}></input>
      <input ref = {statsRef}></input>
      <input ref = {storyRef}></input>
      <button className = "posting-btn" onClick = {addPokeDex}> 피캇츄</button>
    </PostingForm>
  </PostingWrap>
);
}

const PostingWrap = styled.div`
  margin-top: 60px;

  display : flex;
  width : 100%;
  height: 100%;

  flex-direction: column;
  align-items: center;
`
const PostingForm = styled.div`
  display : flex;
  flex-direction: column;
  width : 400px;
`
export default Post;