const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const resData = await fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        latitude +
        ',' +
        longitude +
        '&key=' +
        'AIzaSyD8HnhMQpIt9ZGaPnkexNlGomWHOYerTVc',
    );
    const response = await resData.json();
    return response;
  } catch (error) {}
};
export default {getAddressFromCoordinates};
