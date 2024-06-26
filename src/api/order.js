import request from "@/api/request.js";

export function newOrder(data) {
    return request({
        url: '/api/order/new',
        method: 'post',
        contentType: 'application/json',
        data: data
    })
}

export function getOrders(userId) {
    return request({
        url: '/api/order/list',
        method: 'get',
        params: {
            userId,
        }
    })
}

export function payOrder(orderId) {
    return request({
        url: '/api/order/pay',
        method: 'post',
        params: {
            orderId,
        }
    })
}

export function cancelOrder(orderId) {
    return request({
        url: '/api/order/cancel',
        method: 'post',
        params: {
            orderId,
        }
    })
}
