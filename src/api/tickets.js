import request from "@/api/request.js";

export function getTickets() {
    return request({
        url: '/api/tickets/list',
        method: 'get',
    })
}

export function searchTickets(data) {
    return request({
        url: '/api/tickets/search',
        method: 'get',
        params: data
    })
}
