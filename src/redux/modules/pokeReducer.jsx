/* 포켓몬 도감 Post & Get 기능을 담는 리듀서 */

import { collection, getDocs, addDoc } from "firebase/firestore";
// getDocs : for READ data
// addDoc : for CREATE data

import { db } from "../../firebase-config";
// connect DB


/* #1. Action Type setup */
const LOAD_POKE = 'pokeReducer/LOAD_POKE';      // [ READ ]
const ADD_POKE = 'pokeReducer/ADD_POKE';        // [ CREATE ]
const DELETE_POKE = 'pokeReducer/DELETE_POKE';  // [ DELETE ]

/* #2. initial State */
const initialState = {
  list : []
}

/* #3. Action Function setup */
// [ READ ]
function loadPoke (poke_list) {
  return {type : LOAD_POKE, poke_list}
}
// [ CREATE ]
function addPoke (pokeData) {
  console.log("포켓몬 포스팅!")
  return {
    type : ADD_POKE,
    pokeData }
}
// [ DELETE ]
//function deletePoke(poke_index){
//  return { type : DELETE_POKE, poke_index};
//}


/* #4. FB Communication */
// [ READ ]
export const loadPokeFB = () => {
  // 비동기 처리
  return async function (dispatch) {
    const poke_data = await getDocs(collection(db, "pokemon")); // 나의 FB의 "pokemon" 컬렉션 속에 있는 data를 getDocs() 로 가져오고 poke_data 변수에 저장
    let poke_list = []; // DB에서 가져온 data 들을 하나의 배열로 관리할 것

    poke_data.forEach((doc) => {                            // forEach 로 배열을 돌며 내가 받아온 data를 빈 배열에 push
      poke_list.push( { id: doc.id, ...doc.data()});        // id는 추후 삭제 기능을 위해 GET, data() 속에 있는 것이 우리가 사용할 실제 data들!
    });                                   
    dispatch(loadPoke(poke_list));                          // loadPoke 에 함수에서 만들어준 poke_list를 로딩할 것
  }
}

// [ CREATE ] pokeIdx, pokeName, pokeState, pokeStory, pokeType
export const addPokeFB = (pokeData) => {                                  // pokeData라는 임의이 parameter 설정
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "pokemon"), pokeData);     // "pokemon" 컬렉션에 pokeData 형식으로 데이터를 넣어줄 것
    const poke_data = {id: docRef.id, ...pokeData};                       // doc의 id 값을 가져와서 저장, 나머지 데이터들 함께 저장
    dispatch(addPoke(poke_data));
  }
}


/* Reducer :: 실질적으로 store에 들어가서 data를 변경하는 아이 */

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_POKE : {
      return {list: action.poke_list}   // action 에서 가져오는 것과 state 에서 가져오는 것의 차이?
    }              
    case ADD_POKE : {
      const newPokeList = [...state.list, action.pokeData];
      return {list : newPokeList};
    }
    default :
    return state;
  }
}
