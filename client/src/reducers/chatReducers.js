import { CHAT_ALL_LIST_FAIL, CHAT_ALL_LIST_REQUEST, CHAT_ALL_LIST_RESET, CHAT_ALL_LIST_SUCCESS, CHAT_CURRENT_RESET, CHAT_CURRENT_SET, CHAT_CURRENT_SET_REQUEST, CHAT_CURRENT_SET_RESET, CHAT_CURRENT_SET_SUCCESS, CHAT_GROUP_CREATE_FAIL, CHAT_GROUP_CREATE_REQUEST, CHAT_GROUP_CREATE_RESET, CHAT_GROUP_CREATE_SUCCESS, CHAT_ONETOONE_CREATE_FAIL, CHAT_ONETOONE_CREATE_REQUEST, CHAT_ONETOONE_CREATE_RESET, CHAT_ONETOONE_CREATE_SUCCESS, CHAT_ONETOONE_LIST_FAIL, CHAT_ONETOONE_LIST_REQUEST, CHAT_ONETOONE_LIST_RESET, CHAT_ONETOONE_LIST_SUCCESS } from "../constants/chatConstants";

export const chatOneToOneListReducer = (state = {}, action) => {
    switch(action.type) {
        case CHAT_ONETOONE_LIST_REQUEST:
            return { loading: true } 
        case CHAT_ONETOONE_LIST_SUCCESS:
            return { loading: false, chat: action.payload }
        case CHAT_ONETOONE_LIST_FAIL:
            return { loading: false, error: action.payload }
        case CHAT_ONETOONE_LIST_RESET:
            return {}
        default:
            return state                 
    }
}

export const chatOneToOneCreateReducer = (state = {}, action) => {
    switch(action.type){
        case CHAT_ONETOONE_CREATE_REQUEST:
            return {loading: true}
        case CHAT_ONETOONE_CREATE_SUCCESS:
            return {loading: false, chat: action.payload}
        case CHAT_ONETOONE_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case CHAT_ONETOONE_CREATE_RESET:
            return {}
        default:
            return state        
    }
}

export const chatCurrentSetReducer = (state = {}, action) => {
    switch(action.type){
        case CHAT_CURRENT_SET:
            return { currentChat: action.payload}
        case CHAT_CURRENT_RESET:
            return {}
        default:
            return state    
    }
}

export const chatAllListReducer = ( state = { chats: []}, action) => {
    switch(action.type){
        case CHAT_ALL_LIST_REQUEST:
            return { loading: true, ...state }
        case CHAT_ALL_LIST_SUCCESS:
            return { loading: false, chats: action.payload }
        case CHAT_ALL_LIST_FAIL: 
            return { loading: false, error: action.payload}   
        case CHAT_ALL_LIST_RESET: 
            return {}   
        default: 
            return state         
    }
    
}

export const chatGroupCreateReducer = (state = {}, action) => {
    switch(action.type){
        case CHAT_GROUP_CREATE_REQUEST:
            return {loading: true}
        case CHAT_GROUP_CREATE_SUCCESS:
            return {loading: false, chat: action.payload}
        case CHAT_GROUP_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case CHAT_GROUP_CREATE_RESET:
            return {}
        default:
            return state        
    }
}