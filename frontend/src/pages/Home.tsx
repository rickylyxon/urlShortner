import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import Div from "../components/Div";

interface Response {
  msg?: string;
  shortUrl?: string;
  status: number;
}

const Home: React.FC = () => {
  const [url, setUrl] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [shortenURL, setShortenURL] = useState<Response | null>(null);

  useEffect(() => {
    if (buttonClicked) {
      axios
        .post("http://localhost:3000/shorten", {
          url: url,
        })
        .then(function (response) {
          setShortenURL(response.data);
        })
        .catch(function (error) {
          setShortenURL(error.response.data);
        });
    }
    setButtonClicked(false);
  }, [buttonClicked]);
  const handleClick = () => {
    setButtonClicked(true);
  };
  return (
    <div className="h-screen bg-zinc-300 flex flex-col justify-center items-center p-16 ">
      <h4 className="text-4xl font-bold text-gray-900 mb-10">URL Shortner</h4>
      <Form
        onChange={(e) => {
          setUrl(e.target.value);
        }}
        onClick={handleClick}
      />
      <Div url={shortenURL} />
    </div>
  );
};

export default Home;
