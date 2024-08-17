import { Alert } from "react-native";
import { useEffect, useState } from "react";

const useAppwrite = (fn, param = null) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (param) => {
    setIsLoading(true);
    try {
      const res = param ? await fn(param) : await fn();
      setData(res);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(param);
  }, []);

  const refetch = (newParam = null) => fetchData(newParam);

  return { data, isLoading, refetch };
};

export default useAppwrite;
