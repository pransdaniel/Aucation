import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authLoginReducer from "./authLogin/reducer";
import isPreloadReducer from "./isPreload/reducer";
import isAuthRegisterReducer from "./isAuthRegister/reducer";
import isUserChangePhotoReducer from "./isUserChangePhoto/reducer";
import {
  aucationsReducer,
  isAddAucationReducer,
  isDeleteAucationReducer,
  isEditAucationReducer,
  detailAucationReducer,
} from "./aucations/reducer";

const store = configureStore({
  reducer: {
    // Auth
    isAuthRegister: isAuthRegisterReducer,
    authLogin: authLoginReducer,
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer,

    // Profile
    isUserChangePhoto: isUserChangePhotoReducer,

    // Aucation
    aucations: aucationsReducer,
    isAddAucation: isAddAucationReducer,
    isDeleteAucation: isDeleteAucationReducer,
    isEditAucation: isEditAucationReducer,
    detailAucation: detailAucationReducer,
  },
});

export default store;
