import { useState, useEffect } from 'react';
import { githubInstance } from '../api/base-axios';

type ResponseType = [] | {};

export const useFetch = ({ endpoint, defaultResult }: { endpoint: string, defaultResult: ResponseType }): any => {
  const [data, setData] = useState(defaultResult);
  const [url, setUrl] = useState(endpoint);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
 
      try {
        if (url) {
          const result = await githubInstance(url);
          setData(result.data);
        }
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
 
    fetchData();
  }, [url]);
 
  return [{ data, isLoading, isError }, setUrl];
}