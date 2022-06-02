import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updatePokeFB } from '../redux/modules/pokeReducer';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useRef } from "react";

function Update() {

    // parameter 받아오기 : id, idx
    const { id, idx } = useParams();
    // console.log(id + "+" + idx);
    /* Store data 가져오기 */
    // 나는 여기서 기존 저장된 데이터를 input 창에 띄워서 수정하기 편하게 해줄거라서!

    const pokeMemo = useSelector((state) => state.pokeReducer.list); // 내 Store 에 있는 모든 data list 를 가져오게 됨
    const pokeData = pokeMemo[idx]; // 내 Store 의 모든 데이터 리스트 중 해당 페이지에 있는 데이터만 가져옴
    // console.log(pokeData); => 콘솔은 신이다....
    // console.log(pokeData.pokeIdx); 

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* Input value 받아오기 위해 DOM 접근, useRef */
    const newPokeName = useRef();
    const newPokeIdx = useRef();
    const newPokeStats = useRef();
    const newPokeType = useRef();
    const newPokeStory = useRef();

    /* Input value load */
    useEffect( () => {
      newPokeIdx.current.value = pokeData?.pokeIdx;
      newPokeName.current.value = pokeData?.pokeName;
      newPokeType.current.value = pokeData?.pokeType;
      newPokeStory.current.value = pokeData?.pokeStory;
      newPokeStats.current.value = pokeData?.pokeStats;
    });


    /* [ UPDATE :: THUNK FUNCTION 참고 ]
    export const updatePokeFB = (payload, index) => async (dispatch) => {
      const docRef = doc(db, "pokemon", payload.id);
      await updateDoc(docRef, {
        pokeIdx : payload.pokeIdx,
        pokeName : payload.pokeName,
        pokeStats : payload.pokeStats,
        pokeStory : payload.pokeStory,
        pokeType : payload.pokeType
      });
      dispatch(updatePoke({payload, index}))
    };
    */

    const handlePokeUpdate = () => {
      // required 를 먹여놨는데, 굳이 아래 주석을 입힌 코드를 돌릴 이유가 있을까?
      // if (
      //   newPokeName.current.value !== "" &&
      //   newPokeIdx.current.value !== "" &&
      //   newPokeStats.current.value !== "" &&
      //   newPokeStory.current.value !== "" &&
      //   newPokeType.current.value !== ""
      //   ) {
        dispatch(updatePokeFB({
          id : id,
          pokeIdx: newPokeIdx.current.value,
          pokeName : newPokeName.current.value,
          pokeStats: newPokeStats.current.value,
          pokeStory :newPokeStory.current.value,
          pokeType :newPokeType.current.value}, idx )  // 클릭한 아이의 idx 값을 보내서 DB에서 찾아서 수정!
        );
        alert ("도감 수정 완료!");
        navigate("/");
      // }else {
      //   alert ("다시 작성해주세요!");
      // }
    };

    
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