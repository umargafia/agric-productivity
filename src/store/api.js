const API = 'https://agricapp-45459004b6bf.herokuapp.com/api/v1/';
export default API;
export const sendRequest = async ({ url, data, method, token }) => {
  try {
    const response = await fetch(`${API}${url}`, {
      method: method ? method : 'get',
      headers: {
        'Content-Type': 'application/json',
        [token && 'Authorization']: token && `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response) {
      const newData = await response.json();
      return newData;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const LoginUser = async ({ data }) => {
  const response = await sendRequest({
    url: `users/login`,
    method: `POST`,
    data,
  });

  return response;
};

export const SignUpUser = async ({ data }) => {
  const response = await sendRequest({
    url: `users/signup`,
    method: `POST`,
    data,
  });

  return response;
};

export const GetAllCrops = async () => {
  const response = await sendRequest({
    url: `crop/all`,
  });

  return response;
};

export const CreateCrop = async ({ data }) => {
  const response = await sendRequest({
    url: `crop/create`,
    method: `POST`,
    data,
  });

  return response;
};
