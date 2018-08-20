const initialState = {
  users: {
    currentUser: {
      _id: '',
      name: '',
      email: '',
    },
    usersById: {},
  },
};

export default function (state = initialState) {
  return state;
}