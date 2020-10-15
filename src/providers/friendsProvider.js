import axios from 'axios';
import { URL } from '../config/constants';

export const getUsers = (partOfNickName) => {
    const token = localStorage.getItem('token');
    return axios.get(`${URL}users/nicks/add-friend/${partOfNickName}`, {
        headers: {
            authorization: token
        }
    }).then(response => response.data)
}

export const createReqOfFrendshipReq = (id) => {
    const token = localStorage.getItem('token');
    return axios.post(`${URL}friend-req/`, { id }, {
        headers: {
            authorization: token
        }
    }).then(response => response.data)
}

export const deleteReqOfFriendshipReq = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${URL}friend-req/delete/${id}`, {
        headers: {
            authorization: token
        }
    })
    return response.data
}

export const getFriendsReq = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${URL}users/nicks/friends`, {
        headers: {
            authorization: token
        }
    })
    return response.data
}

export const outgoingReqsOfFriendshipReq = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${URL}friend-req/outgoing`, {
        headers: {
            authorization: token
        }
    })
    return response.data
}

export const incomingReqsOfFriendshipReq = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${URL}friend-req/incoming`, {
        headers: {
            authorization: token
        }
    })
    return response.data
}

export const acceptFriendshipReq = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`${URL}friend-req/accept`, {id},{
        headers: {
            authorization: token
        }
    })
    console.log(response)
    return response.data
}