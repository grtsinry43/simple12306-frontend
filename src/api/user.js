import request from "@/api/request.js";
import {useUserStore} from "@/store/user.js";


export function login(data) {
    return request({
        url: '/api/user/login',
        contentType: 'application/json',
        method: 'post',
        params: data
    })
}

export function getInfo(){
    return request({
        url: '/api/user/info',
        method: 'get',
        params: {
            username: useUserStore().userName
        }
    })
}

export function updateInfo(data){
    return request({
        url: '/api/user/update',
        method: 'put',
        params: data
    })
}

export function verifyEdu(username){
    return request({
        url: '/api/user/edu',
        method: 'post',
        params: {
            username
        }
    })
}

export function verify(username){
    return request({
        url: '/api/user/verify',
        method: 'post',
        params: {
            username
        }
    })
}
