/* eslint-disable no-console */

import axios from 'axios';
const CryptoJS = require('crypto-js');
import { Encrypt } from "./secret";

const SecurityKey = CryptoJS.MD5(Math.round(new Date() / 1000).toString().slice(1)).toString();
export const ajaxGet = (url = "", params = {}, token = '') => {
    token = localStorage.getItem('token') ? localStorage.getItem('token') : ''
    return axios({
        method: "GET",
        url,
        params,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "token": token,
            "os-type": 1,
            SecurityKey,
            SecurityCode: Encrypt(SecurityKey),
        },
    });
};

export const ajaxPost = (url, params, token = '') => {
    token = localStorage.getItem('token') ? localStorage.getItem('token') : ''
    return axios({
        method: "POST",
        url,
        data: params,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "token": token,
            "os-type": 1,
            SecurityKey,
            SecurityCode: Encrypt(SecurityKey),
        },
    });
};