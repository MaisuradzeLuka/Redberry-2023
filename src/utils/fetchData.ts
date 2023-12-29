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
      "45f5498f5a9704a4a74ceb421678882a4bc1ee31f44056cb7da2732705bd6df4";

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
      "45f5498f5a9704a4a74ceb421678882a4bc1ee31f44056cb7da2732705bd6df4";

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

export const postUserLogin = async (value: string) => {
  try {
    const token =
      "45f5498f5a9704a4a74ceb421678882a4bc1ee31f44056cb7da2732705bd6df4";

    return await fetch("https://api.blog.redberryinternship.ge/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email: value }),
    });
  } catch (error) {
    throw new Error(`Something went wrong: ${error}`);
  }
};
