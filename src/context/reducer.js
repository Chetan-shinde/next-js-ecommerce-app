export function reducer(state, action) {
  switch (action.type) {
    case "OPEN_LOGIN_MODAL":
      return { ...state, loginModalShow: true };
    case "CLOSE_LOGIN_MODAL":
      return { ...state, loginModalShow: false };
    case "SET_USER_LOGGEDIN_STATE":
      return { ...state, userLoggedIn: ({ user_logged_in } = action.payload) };
    case "SET_INIT_DATA":
      return { ...state, ...action.payload };
    case "ADD_CART":
      return { ...state, cart_items: action.payload.no_of_cart_items };
    default:
      throw Error("Unknown action " + action.type);
  }
}
