import axios from "axios"
import { MESSAGE_ALL_LIST_FAIL, MESSAGE_ALL_LIST_REQUEST, MESSAGE_ALL_LIST_SUCCESS, MESSAGE_SEND_FAIL, MESSAGE_SEND_REQUEST, MESSAGE_SEND_SUCCESS } from "../constants/messageConstants"

export const fetchAllMessages = (chatId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MESSAGE_ALL_LIST_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.get(`/api/messages/${chatId}`, config)
        dispatch({
            type: MESSAGE_ALL_LIST_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: MESSAGE_ALL_LIST_FAIL,
            payload: error.message && error.message.response.data ? error.message.response.data : error.message
        })
    }
}

export const sendMessage = (chatId, content) => async (dispatch, getState) => {
    try {
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.post(`/api/messages/`, {chatId, content} , config)
        dispatch({
            type: MESSAGE_SEND_SUCCESS,
            payload: res.data
        })
        dispatch({
            type: MESSAGE_ALL_LIST_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: MESSAGE_SEND_FAIL,
            payload: error.message && error.message.response.data ? error.message.response.data : error.message
        })
    }
}