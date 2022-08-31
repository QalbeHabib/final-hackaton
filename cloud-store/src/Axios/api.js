import * as axios from 'axios'
// import { useSelector } from 'react-redux';
// var token = useSelector(state => state.users.token);


 export const axiosClient = axios.create(
   
  {
   baseURL: `https://hackaton-final.herokuapp.com/`, 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      
    }
  });
