import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authLoginReducer from "./authLogin/reducer";
import isPreloadReducer from "./isPreload/reducer";
import isAuthRegisterReducer from "./isAuthRegister/reducer";
import isUserChangePhotoReducer from "./isUserChangePhoto/reducer";
import {
  todosReducer,
  isAddAucationReducer,
  isDeleteTodoReducer,
  isEditTodoReducer,
  detailTodoReducer,
} from "./todos/reducer";

const store = configureStore({
  reducer: {
    // Auth
    isAuthRegister: isAuthRegisterReducer,
    authLogin: authLoginReducer,
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer,

    // Profile
    isUserChangePhoto: isUserChangePhotoReducer,

    // Todo
    todos: todosReducer,
    isAddAucation: isAddAucationReducer,
    isDeleteTodo: isDeleteTodoReducer,
    isEditTodo: isEditTodoReducer,
    detailTodo: detailTodoReducer,
  },
});

export default store;
