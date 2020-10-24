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

export const createBidForFrendshipReq = (id) => {
    const token = localStorage.getItem('token');
    return axios.post(`${URL}friendship/`, { id }, {
        headers: {
            authorization: token
        }
    }).then(response => response.data)
}

export const deleteBidForFriendshipReq = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${URL}friendship/delete/${id}`, {
        headers: {
            authorization: token
        }
    })
    return response.data
}

export const getFriendsReq = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${URL}users/my-friends/nicks`, {
        headers: {
            authorization: token
        }
    })
    return response.data
}

export const outgoingBidForFriendshipReq = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${URL}friendship/outgoing`, {
        headers: {
            authorization: token
        }
    })
    return response.data
}

export const incomingBidForFriendshipReq = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${URL}friendship/incoming`, {
        headers: {
            authorization: token
        }
    })
    return response.data
}

export const acceptFriendshipReq = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`${URL}friendship/accept`, { id }, {
        headers: {
            authorization: token
        }
    })

    return response.data
}

export const deleteFriendReq = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`${URL}friendship/del-friend`, { id }, {
        headers: {
            authorization: token
        }
    })

    return response.data
}