import request from "@/api/request.js";

export function getTickets() {
    return request({
        url: '/api/tickets/list',
        method: 'get',
    })
}
