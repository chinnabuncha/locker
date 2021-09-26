import { LOGIN_FAILED, LOGIN_SUCCESS,LOGIN_FETCHING, LOGOUT, server,LOGIN_STATUS } from "../Constants"

import {  httpClient} from "./../utils/HttpClient";

export const setStateToFetching = () => ({
    type: LOGIN_FETCHING
    
});

export const setStateToSucces = payload => ({
    type: LOGIN_SUCCESS,
    payload

});

export const setStateToFailed = payload => ({
    type: LOGIN_FAILED,
    payload
});

export const setStateToLogout = () => ({
    type: LOGOUT
  
});


export const login = ({username, password, history})=>{
    return async dispatch=>{
        dispatch(setStateToFetching());
        // setTimeout(() => {
        //     dispatch(setStateToSucces("Ok"));
        //     history.push("/stock")
        // }, 500);
       const result = await httpClient.post(server.LOGIN_URL,{
            username,
            password
        });
        if(result.data.result == "ok"){
            //บันทึกค่าลงlocalstorage
            localStorage.setItem(LOGIN_STATUS,"ok")
            dispatch(setStateToSucces("ok")) ; 
            history.push("/stock");
        }else{
            localStorage.setItem(LOGIN_STATUS,"nok")
            dispatch(setStateToFailed(result.data.message));
        }
        
     
    };
};

export const reLogin = () => {
    return dispatch => {
      const loginStatus = localStorage.getItem(LOGIN_STATUS);
      if (loginStatus == "ok") {
        dispatch(setStateToSucces({}));
      } 
    };
  };
  
  export const isLoggedIn = () => {
    const loginStatus = localStorage.getItem(LOGIN_STATUS);
    return loginStatus == "ok";
  };
  




//แนวอะซิงโคนัส
export const logout =({history})=>{
    return dispatch => {
        localStorage.removeItem(LOGIN_STATUS);
        dispatch(setStateToLogout());
        history.push("/")
    }
}

export const setSuccess = payload => {
    return dispatch => {
        
      dispatch(setStateToSucces(payload));
     
    };
  };
  

export const hasError = payload => {
    return dispatch => {
      dispatch(setStateToFailed(payload));
      
    };
  };
  