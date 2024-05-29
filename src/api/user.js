import request from "@/api/request.js";


export function login(data) {
    return request({
        url: '/api/user/login',
        contentType: 'application/json',
        method: 'post',
        params: data
    })
}

