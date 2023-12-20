interface IFetchData {
  method: string;
  headers: {
    Authorization: string;
    "Content-Type": string;
  };
}

export const fetchData = async (url: string, header?: IFetchData) => {
  const res = await fetch(url, { ...header });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data;
};

export const fetchWithToken = async (url: string, method = "GET") => {
  const token = await fetchData(
    "https://api.blog.redberryinternship.ge/api/token"
  );

  return fetchData(url, {
    method,
    headers: {
      Authorization: `Bearer ${token.token}`,
      "Content-Type": "application/json",
    },
  });
};
