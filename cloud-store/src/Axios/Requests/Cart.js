import { axiosClient } from "../api";

export function getCart(id) {
  return axiosClient.get(`/cart/get/${id}`);
}
export function addCart  (data, user, qty)  {
  const obj = {
    userId: user.userObj._id,
    productId: data._id,
    productQty: qty,
  };

  if (user.cartData.length === 0) {
    // if empty add new product
    return axiosClient.put("/cart/new", JSON.stringify(obj));
  } else {
    // update Qty
    const filter = user.cartData.products.filter((item) => item.product._id === data._id) 
    if(filter.length !== 0){
      
      return axiosClient.put("/cart/updateqty", JSON.stringify(obj));
    }else {
      // add new product

      return axiosClient.put("/cart/newproduct", JSON.stringify(obj));
    }
    } 



};
export function deleteCart(id,newId) {
const obj = {
  userId: newId,
} 
  return axiosClient.put(`/cart/delete/${id}`, JSON.stringify(obj));
}

export function updateCart(id, data) {
  return axiosClient.put(`/cart/update/${id}`, { data });
}
export function checkoutQty(data, user, qty) {
  const obj = {
    userId: user,
    productId: data.product._id,
    productQty: qty,
  };
  return axiosClient.put("/cart/updateqty", JSON.stringify(obj));

}