import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";

const ActionType = {
  GET_AUCATIONS: "GET_AUCATIONS",
  ADD_AUCATION: "ADD_AUCATION",
  DELETE_TODO: "DELETE_TODO",
  DETAIL_AUCATION: "DETAIL_AUCATION",
  EDIT_TODO: "EDIT_TODO",
};

function getAucationsActionCreator(aucations) {
  return {
    type: ActionType.GET_AUCATIONS,
    payload: {
      aucations,
    },
  };
}

function addAucationActionCreator(status) {
  return {
    type: ActionType.ADD_AUCATION,
    payload: {
      status,
    },
  };
}

function deleteTodoActionCreator(status) {
  return {
    type: ActionType.DELETE_TODO,
    payload: {
      status,
    },
  };
}

function editTodoActionCreator(status) {
  return {
    type: ActionType.EDIT_TODO,
    payload: {
      todo,
    },
  };
}

function detailAucationActionCreator(aucation) {
  return {
    type: ActionType.DETAIL_AUCATION,
    payload: {
      aucation,
    },
  };
}

function changeCoverTodoActionCreator(todo) {
  return {
    type: ActionType.DETAIL_AUCATION,
    payload: {
      todo,
    },
  };
}

function asyncChangeCoverTodo({ id, cover }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const updatedTodo = await api.postChangeCoverTodo({ id, cover });
      dispatch(changeCoverTodoActionCreator(updatedTodo));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncGetAucations() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const aucations = await api.getAllAucations();
      dispatch(getAucationsActionCreator(aucations));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddAucation({ title, description }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.postAddAucation({ title, description });
      dispatch(asyncAddAucation(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDeleteTodo(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteTodo(id);
      dispatch(deleteTodoActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncEditTodo(id, title, description, is_finished) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.putUpdateTodo({ id, title, description, is_finished });

      const updatedTodo = await api.getDetailAucation(id);

      dispatch(detailAucationActionCreator(updatedTodo));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDetailAucation(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const aucations = await api.getDetailAucation(id);
      dispatch(detailAucationActionCreator(aucations));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  getAucationsActionCreator,
  asyncGetAucations,
  addAucationActionCreator,
  asyncAddAucation,
  deleteTodoActionCreator,
  asyncDeleteTodo,
  editTodoActionCreator,
  asyncEditTodo,
  detailAucationActionCreator,
  asyncDetailAucation,
  changeCoverTodoActionCreator,
  asyncChangeCoverTodo,
};
