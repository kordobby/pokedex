/* Infinite Scroll feature */

/* #1. Action Type setup */
// INFINITE SCROLL
const SET_POST ='scrollReducer/SET_POST';
const LOADING ='scrollReducer/LOADING';

/* #2. initial State */
const initialState ={
  list: [],
  paging: {start: null, next: null, size: 3},
  is_loading: false,
};

/* #3. Action Function setup */
function setPost (post_list, paging) {
  return { type : LOADING, post_list, paging}
}

function loading (is_loading) {
  return { type : LOADING, is_loading }
}

/* #4. FB Communication */




[SET_POST] : (state, action) => produce(state, (draft)=>{
            draft.list.push(...action.payload.post_list)
            draft.paging =action.payload.paging;
            draft.is_loading =false;
        }),
        
[LOADING]: (state, action) => produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),

      const getPostFB =(start=null, size=3)=>{
        return function(dispatch,getState,{history}){
            let _paging =getState().post.paging;
    
            if(_paging.start && !_paging.next){//만약 이 페이징에서 스타트에 값이 있어 그런데 페이징에 넥스트 값이 없어 그러면 바로 돌아가
                return
            };
    
            dispatch(loading(true))  //무한스크롤
            const postDB =firestore.collection('post');
             //무한스크롤
            let query =postDB.orderBy('insert_dt',"desc"); //desc면 역순으로 가져오기
    
            if(start){
                query= query.startAt(start);
            }
            query
            .limit(size + 1).get().then(docs =>{
                let post_list =[];
                let paging ={
                    start: docs.docs[0],
                    next: docs.docs.length === size +1 ? docs.docs[docs.docs.length -1] : null,
                    size: size,
                }
                docs.forEach((doc)=>{
                  let _post = doc.data();
                 
                   
                  let post = Object.keys(_post).reduce((acc,cur)=>{
                    if(cur.indexOf("user_")!==-1) { //user_가 포함이 된다면
                        return{
                            ...acc,
                            user_info:{...acc.user_info,[cur]:_post[cur]},
                        };
                    }
                    return {...acc, [cur]: _post[cur]};
                  },{id: doc.id,user_info:{}});
    
                post_list.push(post);
                    
                })
                post_list.pop(); //마지막 친구 없애기
                dispatch(setPost(post_list, paging))
            });
        };
    };