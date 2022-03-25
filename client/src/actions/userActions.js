import axios from 'axios'
import { CHAT_CURRENT_RESET } from '../constants/chatConstants'
import { MESSAGE_ALL_LIST_RESET } from '../constants/messageConstants'
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_SEARCH_FAIL,
    USER_SEARCH_REQUEST,
    USER_SEARCH_SUCCESS
} from '../constants/userConstants'

export const login = (input) => async (dispatch) => {
    try {
        dispatch({type: USER_LOGIN_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/users/login', input, config)
        dispatch({type: USER_LOGIN_SUCCESS, payload: res.data})
        localStorage.setItem('userInfo', JSON.stringify(res.data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const register = (input) => async (dispatch) => {
    try {
        dispatch({type: USER_REGISTER_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/users', input, config)
        dispatch({type: USER_REGISTER_SUCCESS, payload: res.data})
        dispatch({type: USER_LOGIN_SUCCESS, payload: res.data})
        localStorage.setItem('userInfo', JSON.stringify(res.data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: CHAT_CURRENT_RESET
    })
    dispatch({
        type: MESSAGE_ALL_LIST_RESET
    })
}

export const searchUser = (searchQuery) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_SEARCH_REQUEST
        })
        const {userLogin: { userInfo }} = getState()
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.get(`/api/users?search=${searchQuery}`, config)
        dispatch({
            type: USER_SEARCH_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: USER_SEARCH_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
