import {BASE_URL} from './Login'
import axios from "axios";


const fetchData = async (setUsername) => {
  const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/chat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const userData = response.data;
     // console.log("User data:", userData);
  
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

  const handleLogOut = (navigate) => {
    localStorage.setItem("token", null);
    window.location = "/";;
  }
  const navigateToSignUp = (navigate) => {
    navigate("/registor");
  };
  
  const navigateToLogin = (navigate) => {
    navigate("/login");
  };

  const navigateToChat = (navigate) => {
    navigate("/chat");
  };


export default fetchData;

export {handleLogOut, navigateToLogin, navigateToSignUp, navigateToChat}