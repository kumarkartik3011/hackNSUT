import axios from "axios"
import { CHAT_ALL_LIST_FAIL, CHAT_ALL_LIST_REQUEST, CHAT_ALL_LIST_SUCCESS, CHAT_CURRENT_SET,  CHAT_GROUP_CREATE_FAIL,  CHAT_GROUP_CREATE_REQUEST,  CHAT_GROUP_CREATE_SUCCESS,  CHAT_ONETOONE_CREATE_FAIL, CHAT_ONETOONE_CREATE_REQUEST, CHAT_ONETOONE_CREATE_SUCCESS, CHAT_ONETOONE_LIST_FAIL, CHAT_ONETOONE_LIST_REQUEST, CHAT_ONETOONE_LIST_SUCCESS } from "../constants/chatConstants"
import { getReciever } from "../utils/chatLogics"

export const listOneToOneChat = (userId) => async (dispatch, getState) => {
    try {   
        dispatch({
            type: CHAT_ONETOONE_LIST_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.get('/api/chats/oneToOneChats', userId, config)
        dispatch({
            type: CHAT_ONETOONE_LIST_SUCCESS,
            payload: res.data
        })
    }
    catch(error) {
        dispatch({
            type: CHAT_ONETOONE_LIST_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}

export const createOneToOneChat = (userId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CHAT_ONETOONE_CREATE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.post('/api/chats/oneToOneChats', {userId}, config)
        dispatch({
            type: CHAT_ONETOONE_CREATE_SUCCESS,
            payload: res.data
        })
        dispatch({
            type: CHAT_CURRENT_SET,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CHAT_ONETOONE_CREATE_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })        
    }
}

export const fetchAllChats = (search) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CHAT_ALL_LIST_REQUEST
        })
        const { userLogin : { userInfo } } = getState()
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.get('/api/chats/all', config)
        const chats = res.data
        const filteredChats = chats.filter(chat => {
            if(search !== ""){
                return chat.isGroupChat ? chat.chatName.toLowerCase().includes(search.trim().toLowerCase()) : getReciever(userInfo, chat.users).name.toLowerCase().includes(search.trim().toLowerCase())
            }
        })
        if(search === ""){
            dispatch({
                type: CHAT_ALL_LIST_SUCCESS,
                payload: res.data
            }) 
        } else {
            dispatch({
                type: CHAT_ALL_LIST_SUCCESS,
                payload: filteredChats
            }) 
        }
    } catch (error) {
        dispatch({
            type: CHAT_ALL_LIST_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })
    }
} 

export const createGroupChat = (participants, subject) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CHAT_GROUP_CREATE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.post('/api/chats/group', {users: JSON.stringify(participants), chatName: subject}, config)
        dispatch({
            type: CHAT_GROUP_CREATE_SUCCESS,
            payload: res.data
        })
        dispatch({
            type: CHAT_CURRENT_SET,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CHAT_GROUP_CREATE_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })
    }
} 

// export const searchLocalUser = (query) => (dispatch, getState) => {
//     try {
//         dispatch({
//             type: CHAT_ALL_LIST_REQUEST
//         })
//         const {chatListAll: {chats}} = getState()
//         if(query !== ''){
//             const result = chats.filter(chat => {
//                 return chat.chatName.toLowerCase().includes(query.toLowerCase())
//             })
//             dispatch({
//                 type: CHAT_ALL_LIST_SUCCESS,
//                 payload: result
//             })
//         } else{
//             dispatch({
//                 type: CHAT_ALL_LIST_SUCCESS,
//                 payload: chats
//             })
//         }
//     } catch (error) {
//         dispatch({
//             type: CHAT_ALL_LIST_FAIL,
//             payload: error.message && error.response.data.message ? error.response.data.message : error.message
//         })
//     }
// }