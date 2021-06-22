import * as Network from 'expo-network';
import ipLocation from 'iplocation'
import axios from 'axios';

export default async function(setLocationName){
    const netWorkState = await Network.getNetworkStateAsync();
      if(netWorkState.isInternetReachable){
        const ip = await Network.getIpAddressAsync();
        // const location = async () => {
        //     return await ipLocation(ip);
        // };
        const location = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=a70ae2f7e0d74104a3c7d9019aad669c&ip${ip}`);
        setLocationName(`${location.data.city} ${location.data.country_name}`);
        return location;
      }
}