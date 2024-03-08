import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Short = () => {
  const { link } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/${link}`);
        console.log(response);
        const redirectUrl = response.data.url;
        window.location.href = redirectUrl; // Redirect the user to the specified URL
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [link]);

  return <div>Redirecting...</div>;
};

export default Short;
