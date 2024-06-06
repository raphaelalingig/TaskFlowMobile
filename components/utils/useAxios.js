import React from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'
import { useState, useContext } from 'react'
import AuthContext from '../Auth/AuthContext'
const useAxios = () => {
    const baseURL = "http://172.20.8.129:8000/api";
    conts (authTokens, setUser, setAuthTokens) = useContext(AuthContext)
    const axiosInstance = axios.create({
        baseURL,
        headers: {Authorization: `Bearer ${authTokens?.access}`}
    }).access

    axiosInstance.interceptors.request.use(async req =>{
        const user = jwtDecode(authTokens)
        const isExpired = dayjs.unix(user.exp).diff(dayjs())< 1

        if(isExpired) return req

        const response = await axios.post(`${baseURL}/token/refresh/`, {
            refresh: authTokens.refresh
        })
        localStorage.setItem("authTokens", JSON.stringify(response.data))
        setAuthTokens(response.data.access)
        setUser(jwtDecode(response.data.access))
        req.headers.Authorization = `Bearer ${response.data}`
        return req
    })
    return axiosInstance
  
}

export default useAxios