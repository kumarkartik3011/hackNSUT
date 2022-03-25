import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_RESET, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_RESET, USER_REGISTER_SUCCESS, USER_SEARCH_FAIL, USER_SEARCH_REQUEST, USER_SEARCH_RESET, USER_SEARCH_SUCCESS } from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {loading: true, ...state}
        case USER_LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        case USER_LOGIN_RESET:
            return {}
        case USER_LOGOUT:
            return {}
        default: 
            return state        
    }
}

export const userRegisterReducer = (state={}, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true,}
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}
        case USER_REGISTER_RESET:
            return {}
        default:
            return state
    }
}

export const userSearchReducer = (state = {users: []}, action) => {
    switch(action.type){
        case USER_SEARCH_REQUEST:
            return {loading: true, users: []}
        case USER_SEARCH_SUCCESS:
            return {loading: false, users: action.payload}
        case USER_SEARCH_FAIL:
            return {loading: false, error: action.payload}
        case USER_SEARCH_RESET:
            return {loading: false, users: []}
        default: 
            return state    
    }   
}