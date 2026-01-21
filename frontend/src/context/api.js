const BASE_URL = 'https://class-attendance-onbh.onrender.com';

const apiRequest = async (
  url,
  method = 'GET',
  body = null,
  token = null
) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${BASE_URL}${url}`, options);
  } catch {
    throw new Error('Unable to connect to server');
  }

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('Invalid server response');
  }

  if (!res.ok) {
    throw new Error(data?.error || 'Request failed');
  }

  return data;
};

export default apiRequest;
