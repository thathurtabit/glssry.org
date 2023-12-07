import { useReducer } from "react";

export const postReducer = (state, action) => {
  // ...
};

export const usePostReducer = (initState: unknown) => useReducer(postReducer, initState);
