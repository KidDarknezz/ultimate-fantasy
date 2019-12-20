import store from '@/store/store'
import Request from './request'

//Example
// export const getAllItems = () =>
//     Request.get('/allitems', {
//         'Content-Type': 'application/json',
//     })

// Scores
export const updateInfo = data =>
    Request.post('/updateInfo', data, {
        'Content-Type': 'application/json',
    })
