import {BASE_URL} from './Login'
import axios from "axios";


const fetchData = async (setUsername, token) => {
    try {
      const response = await axios.get(`${BASE_URL}/chat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const userData = response.data;
      console.log("User data:", userData);
  
      // Extract the username from the response data
      const username = userData.username; // Assuming the username is under the "username" property
      console.log("Username:", username);
  
      if (username) {
        setUsername(username);
      } else {
        console.error("Username not found in response data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


export default fetchData;