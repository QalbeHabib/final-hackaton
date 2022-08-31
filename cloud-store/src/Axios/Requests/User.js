
import {axiosClient} from '../api';


export function getUser(data){
    return axiosClient.post('/user/get',JSON.stringify(data));
}
export function addUser(data){
    return axiosClient.post('/user/add', JSON.stringify(data));
}
// export function getTokenUser (value){
//     // return axiosClient.get('/user/authenticate',  {headers: {'Authorization': 'Bearer ' + value}});
//     // send header with get request
//     return axiosClient.get('/user/authenticate');
// }
// export const getTokenUser = async (value) => {
//     // return axiosClient.get('/user/authenticate',  {headers: {'Authorization': 'Bearer ' + value}});
//     // send header with get request
//     return await axiosClient.get('/user/authenticate');
// }
