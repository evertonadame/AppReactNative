import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./app/store";
import StackNavigation from "./stackNavigation/StackNavigation";
import { Provider as PaperProvider } from "react-native-paper";
import { TrackerProvider } from "./contexts/context";
import { LinearGradient } from "expo-linear-gradient";
import axios from 'axios';


function defineInterceptor(){
  axios.interceptors.response.use(response => {
    return response
  }, err => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config
      if (err.response.status == 401 && err.config && !err.config._retry){
        originalReq._retry = true
        AsyncStorage.getItem("TOKEN").then((token) => {
          let res = axios.put(`${Config.API_URL}token/refresh`, {oldToken: token})
          .then((res) => {
            AsyncStorage.setItem("TOKEN", res.data.access_token)
            originalReq.headers["Authorization"] = `Bearer ${res.data.access_token}`
            return axios(originalReq)
          })
          resolve(res)
        })
      }else{
        reject(err)
      }
    })
  })
}

export default function App() {

  defineInterceptor();
  return (
    <>
    
      <Provider store={store}>
        <TrackerProvider>
          <PaperProvider>
            <NavigationContainer>
              <StackNavigation />
            </NavigationContainer>
          </PaperProvider>
        </TrackerProvider>
      </Provider>
      <StatusBar style="light" />
    </>
  );
}
