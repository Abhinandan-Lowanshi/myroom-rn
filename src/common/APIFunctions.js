import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';

export const favFunction = async data => {
  try {
    const response = await sendRequest(data, EndPoints.toFavorite, 'POST');
    return response;
  } catch (error) {
    console.log('error');
  }
};
