import useSWR from "swr";
export const useCustomSwr = (key, fetcher) => {
  const { data, isLoading, error, mutate } = useSWR(key, fetcher);

  if (data) {
    if (data.message == "Invalid token") {
      window.location.href = "/";
    }
  }

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
};

export const useCheckoutSwr = (key, fetcher) => {
  const { data, isLoading, error, mutate } = useSWR(key, fetcher);

  if (data) {
    if (data.message == "Invalid token") {
      window.location.href = "/?login=true";
    }
    if (!data.data) {
      window.location.href = "/?login=true";
    }
  }

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
};
