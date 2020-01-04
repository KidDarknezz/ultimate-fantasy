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
export const returnleaguenames = () =>
    Request.get('/returnleaguenames', {
        'Content-Type': 'application/json',
    })
export const returnactiveleagues = () =>
    Request.get('/returnactiveleagues', {
        'Content-Type': 'application/json',
    })
export const subscribetoleague = data =>
    Request.post('/subscribetoleague', data, {
        'Content-Type': 'application/json',
    })
export const returnsubscribeleagues = data =>
    Request.post('/returnsubscribeleagues', data, {
        'Content-Type': 'application/json',
    })
export const checksteps = data =>
    Request.post('/checksteps', data, {
        'Content-Type': 'application/json',
    })
