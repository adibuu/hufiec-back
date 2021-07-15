import React, { useState, useEffect } from "react";
import { Loader } from "@admin-bro/design-system";
import axios from "axios";

const ApproveArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getArticles = async () => {
    try {
      const articlesFetched = await axios.get(
        "http://localhost:3001/check-posts",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(articlesFetched.data);
      setArticles(articlesFetched.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  let content = <Loader />;

  if (!isLoading) {
    content = <center>Articles data fetched!</center>;
  }

  return <React.Fragment>{content}</React.Fragment>;
};

export default ApproveArticles;
