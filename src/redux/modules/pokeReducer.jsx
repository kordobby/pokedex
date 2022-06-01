/* 포켓몬 도감 Post & Get 기능을 담는 리듀서 */

import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
// getDocs : for READ data
// addDoc : for CREATE data

import { db } from "../../firebase-config";
// connect DB


/* #1. Action Type setup */
// CRUD
const LOAD_POKE = 'pokeReducer/LOAD_POKE';      // [ READ ]
const ADD_POKE = 'pokeReducer/ADD_POKE';        // [ CREATE ]
const DELETE_POKE = 'pokeReducer/DELETE_POKE';  // [ DELETE ]
const UPDATE_POKE = 'pokeReducer/UPDATE_POKE';  // [ UPDATE ]

// SERVER COMMUNICATION
const GET_REQUEST = 'pokeReducer/GET_REQUEST';
const REQ_SECCESS = 'pokeReducer/REQ_SECCESS';
const REQ_ERROR  = 'pokeReducer/REQ_ERROR';


/* #2. initial State */
const initialState = {
  list : [],
  loading : false,
  error : null
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
function deletePoke(payload){
 return { type : DELETE_POKE, payload};
} 

// [ UPDATE ]
function updatePoke(payload){
  return { type : UPDATE_POKE, payload}
}

// [ SERVER COMMUNICATION ] 
const getPokeRequest = (payload) => {
  return { type : GET_REQUEST, payload};
}

const getPokeSuccess = (payload) => {
  return { type : REQ_SECCESS, payload};
}

const getPokeError = (payload) => {
  return {type : REQ_ERROR, payload};
}


/* #4. FB Communication */
// [ READ ]
export const loadPokeFB = () => {
  // 비동기 처리
  return async function (dispatch) {
    // request 시작 => loading : true
    dispatch(getPokeRequest(true));
    try {
      const poke_data = await getDocs(collection(db, "pokemon")); // 나의 FB의 "pokemon" 컬렉션 속에 있는 data를 getDocs() 로 가져오고 poke_data 변수에 저장
      let poke_list = []; // DB에서 가져온 data 들을 하나의 배열로 관리할 것
  
      poke_data.forEach((doc) => {                            // forEach 로 배열을 돌며 내가 받아온 data를 빈 배열에 push
        poke_list.push( { id: doc.id, ...doc.data()});        // id는 추후 삭제 기능을 위해 GET, data() 속에 있는 것이 우리가 사용할 실제 data들!
      });   
      dispatch(loadPoke(poke_list));                          // loadPoke 에 함수에서 만들어준 poke_list를 로딩할 것
    } catch (error) {
      // request rejected 시 error code 저장
      dispatch(getPokeError(error));
    } finally {
      // server communication 종료
      dispatch(getPokeRequest(false));
  }
}};


// [ CREATE ] pokeIdx, pokeName, pokeState, pokeStory, pokeType
export const addPokeFB = (pokeData) => {                                  // pokeData라는 임의이 parameter 설정
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "pokemon"), pokeData);     // "pokemon" 컬렉션에 pokeData 형식으로 데이터를 넣어줄 것
    const poke_data = {id: docRef.id, ...pokeData};                       // doc의 id 값을 가져와서 저장, 나머지 데이터들 함께 저장
    dispatch(addPoke(poke_data));
  }
}

// [ DELETE ]
export const delPokeFB = (payload) => async (dispatch, getState) => {
  const docRef = doc(db, "pokemon", payload);
  await deleteDoc(docRef);
  const poke_idx = getState().pokeReducer.list.findIndex((value) => {
    return value.id === payload;
  });
  dispatch(deletePoke(poke_idx));
  dispatch(loadPokeFB()); 
}

// [ UPDATE ]
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



export default function pokeReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_POKE : {
      return { ...state, list: action.poke_list}   // action 에서 가져오는 것과 state 에서 가져오는 것의 차이?
    }              
    case ADD_POKE : {
      const newPokeList = [...state.list];
      return { ...state, list : newPokeList};
    }
    case DELETE_POKE : 
      // const delPokeList = state.list.filter((value) => {
      //   return value !== action.payload 
      // })
      // return { ...state, list : delPokeList}
      return { 
      ...state,
      list : state.list.filter((value) => {
        return (value.id !== action.payload);  // cardId => id 
      }) 
    };
    case UPDATE_POKE :
      return {...state, list: [ ...state.list ]
    }
    case GET_REQUEST:
      return { ...state, loading : action.payload};
    case REQ_SECCESS:
      return { ...state, list : [...state.list, ...action.payload]};
    case REQ_ERROR:
      return { ...state, error : action.payload};
    default :
    return state;
  }
};