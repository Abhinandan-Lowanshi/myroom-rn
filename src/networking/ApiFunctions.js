import EndPoints from './EndPoints';
const sendRequest = async (payload, endPoint, method) => {
  try {
    const response = await fetch(EndPoints.baseUrl + endPoint, {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (e) {}
};

export default sendRequest;
