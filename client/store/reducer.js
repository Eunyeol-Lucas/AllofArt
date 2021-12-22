import React, { useReducer, createContext, useContext } from "react";

//이니셜
const initialState = {
  hasMore: true,
  isLoading: true,
  images: [],
  page: 1,
  duration: "day",
  sortBy: "date",
};

//리듀서 적용
const imgreducer = (state, action) => {
  switch (action.type) {
    case "DURATION":
      return {
        ...state,
        images: [],
        page: 1,
        duration: action.payload,
        sortBy: "download",
        hasMore: true,
        isLoading: true,
      };
    case "SORT_BY":
      return {
        ...state,
        images: [],
        page: 1,
        duration: "all",
        sortBy: action.payload,
        hasMore: true,
        isLoading: true,
      };
    case "SET_IMAGES":
      return {
        ...state,
        images: [...new Set([...state.images, ...action.payload])],
      };
    case "IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "HAS_MORE":
      return {
        ...state,
        hasMore: action.payload,
      };
    case "PAGE":
      return {
        ...state,
        page: state.page + 1,
      };
    default:
      return state;
  }
};

//context 만들기
const ImgFetchContext = createContext();
const ImgFetchDispatch = createContext();

export const ImgProvider = ({ children }) => {
  const [state, dispatch] = useReducer(imgreducer, initialState);
  return (
    <ImgFetchContext.Provider value={state}>
      <ImgFetchDispatch.Provider value={dispatch}>
        {children}
      </ImgFetchDispatch.Provider>
    </ImgFetchContext.Provider>
  );
};

//customhook 만들기
export const useImgState = () => {
  return useContext(ImgFetchContext);
};

export const useImgDispatch = () => {
  return useContext(ImgFetchDispatch);
};
