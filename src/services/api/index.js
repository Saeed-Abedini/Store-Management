import Axios from 'axios'

export const loginAPI = ({ email, password }) =>
  Axios.post('https://reqres.in/api/login', {
    email,
    password,
  })

export const getChart = () =>
  Axios.get('https://dummy.restapiexample.com/api/v1/employees')

export const getAllProductsAPI = () =>
  Axios.get('https://dummyjson.com/products')

export const getAllCartsAPI = () =>
  Axios.get('https://dummyjson.com/products')

export const removeProductAPI = (productId) =>
  Axios.delete(`https://dummyjson.com/products/${productId}/`)
