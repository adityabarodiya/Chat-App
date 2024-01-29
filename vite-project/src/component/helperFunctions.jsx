const fetchData = async (setUsername) => {
    try {
        const response = await axios.get(`${serverUrl}/me`, {
          // Include authentication headers/tokens if required
          headers: {
            Authorization: `Bearer ${localStorage.getItem(token)}`, // Replace with your token
          },
        });
    
        // Handle successful response
        const userData = response.data;
        console.log('User data:', userData);
    
        // Use the fetched data in your application
    
      } catch (error) {
        console.error('Error fetching data:', error);
      }
};


export default fetchData;