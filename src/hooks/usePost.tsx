import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

interface ApiResponse {
  error?: string;
  token?: string;
}

interface UseApiCallProps {
  isLoading: boolean;
  success: boolean | null; // Add success property
  apiCall: (
    url: string,
    data: Record<string, any>,
    successMessage: string
  ) => Promise<void>;
}

const useApiCall = (): UseApiCallProps => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null); // Initialize success state
  const apiUrl = process.env.REACT_APP_BASE_URL || "";
  const apiCall = async (
    endpoint: string,
    data: Record<string, any>,
    successMessage: string
  ) => {
    const url = `${apiUrl}${endpoint}`;
    setIsLoading(true);
    try {
      console.log("url", apiUrl);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const responseBody: ApiResponse = await response.json();

        setTimeout(() => {
          toast.error(
            `Try this. Email: eve.holt@reqres.in & Password: cityslicka`
          );
        }, 500);
        toast.error(responseBody?.error!);
        setSuccess(false);
      } else {
        const responseData: ApiResponse = await response.json();
        toast.success(successMessage);
        setSuccess(true);
        if (location?.pathname !== "/signin") {
          navigate("/signin");
        } else {
          sessionStorage.setItem("token", responseData.token!);
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("An error occurred during API call.");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, success, apiCall };
};

export default useApiCall;
