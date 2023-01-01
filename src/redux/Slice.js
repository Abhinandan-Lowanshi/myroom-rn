import { createSlice } from '@reduxjs/toolkit';
import sendRequest from '../networking/ApiFunctions';
import EndPoints from '../networking/EndPoints';

export const slice = createSlice({
  name: 'AllData',
  initialState: {
    loading: false,
    myposts: [],
    signInData: {},
    accountData: {}
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
    accountData: (state, actions) => {
      state.accountData = actions.payload;
    },
  },
});

export const { startL, endL, allMyRooms, signInData, accountData } = slice.actions;

export const startLoader = () => dispatch => {
  dispatch(startL());
};
export const endtLoader = () => dispatch => {
  dispatch(endL());
};
export const setSignUp = data => dispatch => {
  dispatch(signInData(data));
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

export const getAccountImfo = (data) => dispatch => {
  dispatch(accountData(data))

}
export default slice.reducer;
