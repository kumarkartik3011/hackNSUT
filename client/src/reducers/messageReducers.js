import { MESSAGE_ALL_LIST_FAIL, MESSAGE_ALL_LIST_REQUEST, MESSAGE_ALL_LIST_RESET, MESSAGE_ALL_LIST_SUCCESS, MESSAGE_SEND_FAIL, MESSAGE_SEND_REQUEST, MESSAGE_SEND_RESET, MESSAGE_SEND_SUCCESS } from "../constants/messageConstants";

export const messageListAllReducer = ( state = {messages: []}, action ) => {
    switch(action.type){
        case MESSAGE_ALL_LIST_REQUEST: 
            return { loading: true }
        case MESSAGE_ALL_LIST_SUCCESS:
            if(Array.isArray(action.payload)){
                return { loading: false, messages: action.payload} 
            } else {
                return {messages: [...state.messages, action.payload]}
            }
        case MESSAGE_ALL_LIST_FAIL: 
            return { loading: false, error: action.payload}
        case MESSAGE_ALL_LIST_RESET: 
            return {}
        default: 
            return state    
    }
}

export const messageSendReducer = ( state = {}, action ) => {
    switch(action.type){
        case MESSAGE_SEND_REQUEST:
            return {loading: true} 
        case MESSAGE_SEND_SUCCESS:
            return {loading: false,  message: action.payload} 
        case MESSAGE_SEND_FAIL: 
            return { loading: false, error: action.payload}
        case MESSAGE_SEND_RESET: 
            return {}
        default: 
            return state    
    }
}