import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";

const ActionType = {
  GET_AUCATIONS: "GET_AUCATIONS",
  ADD_AUCATION: "ADD_AUCATION",
  DELETE_AUCATION: "DELETE_AUCATION",
  DETAIL_AUCATION: "DETAIL_AUCATION",
  EDIT_AUCATION: "EDIT_AUCATION",
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

function deleteAucationActionCreator(status) {
  return {
    type: ActionType.DELETE_AUCATION,
    payload: {
      status,
    },
  };
}

function editAucationActionCreator(status) {
  return {
    type: ActionType.EDIT_AUCATION,
    payload: {
      status,
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

// Perbaikan pada asyncAddAucation untuk menangani FormData
function asyncAddAucation({ cover, title, description, start_bid, closed_at }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const formData = new FormData();
      formData.append("cover", cover);  // Pastikan cover dikirim sebagai file
      formData.append("title", title);
      formData.append("description", description);
      formData.append("start_bid", start_bid);
      formData.append("closed_at", closed_at);

      await api.postAddAucation(formData); // API post menggunakan FormData

      dispatch(addAucationActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDeleteAucation(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteAucation(id);
      dispatch(deleteAucationActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncEditAucation(id, title, description, is_closed) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.putUpdateAucation({ id, title, description, is_closed });

      const updatedAucation = await api.getDetailAucation(id);
      dispatch(detailAucationActionCreator(updatedAucation));
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
      const aucation = await api.getDetailAucation(id);
      dispatch(detailAucationActionCreator(aucation));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddBid({ aucationId, amount }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.postAddBid({ aucationId, amount });
      Swal.fire("Berhasil!", "Bid berhasil ditambahkan", "success");
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
  deleteAucationActionCreator,
  asyncDeleteAucation,
  editAucationActionCreator,
  asyncEditAucation,
  detailAucationActionCreator,
  asyncDetailAucation,
  changeCoverTodoActionCreator,
  asyncChangeCoverTodo,
  asyncAddBid, // Tambahkan export asyncAddBid
};
