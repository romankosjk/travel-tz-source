import axios from 'axios'


export function getHostels () {
    return axios.get('/hostel.json')
}
