const defaultState = {
  id: null,
  name: null,
};

const userReducers = (state = defaultState, action) => {
  switch (action.type) {
    case 'USER':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducers;
