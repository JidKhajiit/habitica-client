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

export const createFriendReq = (id) => {
    const token = localStorage.getItem('token');
    return axios.post(`${URL}friend-req/add`, {id}, {
        headers: {
            authorization: token
        }
      }).then(response => response.data)
}