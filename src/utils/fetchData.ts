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

export const fetchWithToken = async (url: string) => {
  try {
    const token =
      "6b22c113dd70cb3441b340fd44abf353f5bbc182a86d5a4f0344afc84c936b7e";

    return fetchData(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};

export const postWithToken = async (url: string, formData: BodyInit) => {
  try {
    const token =
      "6b22c113dd70cb3441b340fd44abf353f5bbc182a86d5a4f0344afc84c936b7e";

    return await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};
