
import {axiosClient} from '../api';

export function getReview(){
    return axiosClient.get('/product/get');
}
export function addReview(user,value){

    const reviewObj = {
        name: user.name,
        email: user.email,
        description: value,
    }
    return axiosClient.post('/review/add', JSON.stringify(reviewObj));
}
