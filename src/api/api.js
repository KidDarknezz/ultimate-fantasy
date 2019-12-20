import store from '@/store/store'
import Request from './request'

//Example
// export const getAllItems = () =>
//     Request.get('/allitems', {
//         'Content-Type': 'application/json',
//     })

// League
export const updateleague = data =>
    Request.post('/updateleague', data, {
        'Content-Type': 'application/json',
    })

export const createleague = data =>
    Request.post('/createleague', data, {
        'Content-Type': 'application/json',
    })
