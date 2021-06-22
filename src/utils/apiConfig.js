import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

let apiRoute;

apiRoute = axios.create({ baseURL: 'https://teriler.herokuapp.com' });

apiRoute.interceptors.request.use(async (req) => {
    const userData = await AsyncStorage.getItem('@user')
    if (!!userData) {
      const data = JSON.parse(userData);
      // console.log("Data: ", data.token);
      req.headers =  {"auth-token": `${data.token}`};
    }
  
    return req;
  });

export { apiRoute };