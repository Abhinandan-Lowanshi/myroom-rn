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
    locationInfo: [],
    homeNavigation: {},
    uploadData: {},
    favData: [],
    isHomeUpdate: false,
    isFavUpdate: false,
    searchRooms: {},
    roomDataHome: [],
  },
  reducers: {
    startL: (state, actions) => {
      state.loading = actions.payload;
    },
    endL: state => {
      state.loading = false;
    },
    allMyRooms: (state, actions) => {
      state.myposts = actions.payload;
    },
    isHomeUpdate: (state, actions) => {
      state.isHomeUpdate = actions.payload;
    },
    isFavUpdate: (state, actions) => {
      state.isFavUpdate = actions.payload;
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
    favData: (state, actions) => {
      state.favData = actions.payload;
    },
    searchRooms: (state, actions) => {
      state.searchRooms = actions.payload;
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
  favData,
  isHomeUpdate,
  isFavUpdate,
  searchRooms,
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

export const getAllMyRooms = data => dispatch => {
  dispatch(allMyRooms(data));
};

export const getAccountImfo = data => dispatch => {
  dispatch(accountData(data));
};

export const setLocation = data => dispatch => {
  dispatch(locationInfo(data));
};
export const setFavData = data => dispatch => {
  dispatch(favData(data));
};
export const updateHome = data => dispatch => {
  dispatch(isHomeUpdate(data));
};
export const updateFav = data => dispatch => {
  dispatch(isFavUpdate(data));
};
export const setSearchRoomData = data => dispatch => {
  dispatch(searchRooms(data));
};

export default slice.reducer;
