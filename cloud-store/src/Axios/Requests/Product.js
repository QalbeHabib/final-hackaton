
import {axiosClient} from '../api';


export function getProduct(){
    return axiosClient.get('/product/get');
}
export function addProduct(data){
    return axiosClient.post('/product/add', data);
}
export function getProductById(id){
    return axiosClient.post(`/product/get/${id}`);
}
export function deleteProductById(id){
    return axiosClient.delete(`/product/delete/${id}`);
}