import { useSWR } from "swr";

const fetcher = (url) => {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  });
};

export default function Cart() {
  const {} = useSWR("/api/get-cart");
}
