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
    roomLocation: {},
    isMapVisited: false,
    searchUpdate: false,
    currentLocationName: '',
    filteredData: '',
    gpsStatus: 'true',
    LocationMode: '',
    OwnerData: {},
    reviews: {},
    device_token: '',
    filterData: [],
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
    roomLocationOP: (state, actions) => {
      state.roomLocation = actions.payload;
    },
    isMapVisited: (state, actions) => {
      state.isMapVisited = actions.payload;
    },
    searchUpdate: (state, actions) => {
      state.searchUpdate = actions.payload;
    },
    currentLocationName: (state, actions) => {
      state.currentLocationName = actions.payload;
    },
    filteredData: (state, actions) => {
      state.filteredData = actions.payload;
    },
    gpsStatus: (state, actions) => {
      state.gpsStatus = actions.payload;
    },
    LocationMode: (state, actions) => {
      state.LocationMode = actions.payload;
    },
    OwnerData: (state, actions) => {
      state.OwnerData = actions.payload;
    },
    reviews: (state, actions) => {
      state.reviews = actions.payload;
    },
    device_token: (state, actions) => {
      state.device_token = actions.payload;
    },
    filterData: (state, actions) => {
      state.filterData = actions.payload;
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
  roomLocationOP,
  isMapVisited,
  searchUpdate,
  currentLocationName,
  filteredData,
  gpsStatus,
  LocationMode,
  OwnerData,
  reviews,
  device_token,
  filterData,
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
export const setRoomLocation = data => dispatch => {
  dispatch(roomLocationOP(data));
};
export const setIsMapVisited = data => dispatch => {
  dispatch(isMapVisited(data));
};
export const setSearchUpdate = data => dispatch => {
  dispatch(searchUpdate(data));
};
export const setCurrentLocationName = data => dispatch => {
  dispatch(currentLocationName(data));
};

export const setFilteredData = data => dispatch => {
  dispatch(filteredData(data));
};
export const setGPSStatus = data => dispatch => {
  dispatch(gpsStatus(data));
};
export const setLocationMode = data => dispatch => {
  dispatch(LocationMode(data));
};
export const setOwnerData = data => dispatch => {
  dispatch(OwnerData(data));
};
export const setReviews = data => dispatch => {
  dispatch(reviews(data));
};
export const setDevice_token = data => dispatch => {
  dispatch(device_token(data));
};
export const setFilterData = data => dispatch => {
  dispatch(filterData(data));
};

export default slice.reducer;
