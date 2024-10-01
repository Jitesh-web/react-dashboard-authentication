export const initialState = {
  selectedTab: "Dashboard",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "Dashboard":
      return {
        ...state,
        selectedTab: action.payload,
      };
    case "Transactions":
      return {
        ...state,
        selectedTab: action.payload,
      };
    case "Support":
      return {
        ...state,
        selectedTab: action.payload,
      };
    default:
      return state;
  }
};
