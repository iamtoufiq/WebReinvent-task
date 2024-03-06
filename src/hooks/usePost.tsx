// usePostRequest.ts
import { useState } from "react";

interface UsePostRequestOptions {
  url: string;
  body: object;
  options?: RequestInit;
}

const usePostRequest = (options: UsePostRequestOptions) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const postRequest = async (options: UsePostRequestOptions) => {
    setIsLoading(true);
    try {
      const response = await fetch(options.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(options.body),
        ...options.options,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      // setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, postRequest };
};

export default usePostRequest;
