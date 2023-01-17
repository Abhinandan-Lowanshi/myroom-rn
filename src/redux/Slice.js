import {createSlice} from '@reduxjs/toolkit';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';

export const slice = createSlice({
  name: 'AllData',
  initialState: {
    loading: false,
    myposts: [],
    signInData: {},
    accountData: {},
    locationInfo: {},
    homeNavigation: {},
    uploadData: {},
  },
  reducers: {
    startL: state => {
      state.loading = true;
    },
    endL: state => {
      state.loading = false;
    },
    allMyRooms: (state, actions) => {
      state.myposts = actions.payload;
    },
    signInData: (state, actions) => {
      state.signInData = actions.payload;
    },
    uploadData: (state, actions) => {
      state.uploadData = actions.payload;
    },
    accountData: (state, actions) => {
      state.accountData = actions.payload;
    },
    locationInfo: (state, actions) => {
      state.locationInfo = actions.payload;
    },
    homeNavigation: (state, actions) => {
      state.homeNavigation = actions.payload;
    },
    roomDataHome: (state, actions) => {
      state.roomDataHome = actions.payload;
    },
  },
});

export const {
  startL,
  endL,
  allMyRooms,
  signInData,
  accountData,
  locationInfo,
  homeNavigation,
  uploadData,
  roomDataHome,
} = slice.actions;

export const startLoader = () => dispatch => {
  dispatch(startL());
};
export const setHomeNavigation = data => dispatch => {
  dispatch(homeNavigation(data));
};
export const endtLoader = () => dispatch => {
  dispatch(endL());
};
export const setSignUp = data => dispatch => {
  dispatch(signInData(data));
};
export const setUploadData = data => dispatch => {
  dispatch(uploadData(data));
};
export const setRoomDataHome = data => dispatch => {
  dispatch(roomDataHome(data));
};

export const getAllMyRooms = () => dispatch => {
  dispatch(startL());
  let ob = {
    user_id: 2,
  };
  sendRequest(ob, EndPoints.myRoomList, 'POST')
    .then(res => {
      dispatch(endL());
      if (res.status === true) {
        dispatch(allMyRooms(res.data));
      }
    })
    .catch(e => {
      dispatch(endL());
    });
};

export const getAccountImfo = data => dispatch => {
  dispatch(accountData(data));
};

export const setLocation = data => dispatch => {
  dispatch(locationInfo(data));
};
export default slice.reducer;
