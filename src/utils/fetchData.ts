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
  try {
    const token =
      "ee8383422d2845f39494dad39c16b758fc271dd640659c77e5bcc13ad277f09b";

    return fetchData(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};
