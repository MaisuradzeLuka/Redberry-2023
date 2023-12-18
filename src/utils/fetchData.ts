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
