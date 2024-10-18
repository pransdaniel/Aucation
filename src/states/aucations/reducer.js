import { ActionType } from "./action";

function aucationsReducer(aucations = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_AUCATIONS:
      return action.payload.aucations;

    case ActionType.EDIT_TODO:
      return aucations.map((aucation) =>
        aucation.id === action.payload.aucation.id
          ? action.payload.aucation
          : aucation
      );

    default:
      return aucations;
  }
}

function isAddAucationReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.ADD_AUCATION:
      return action.payload.status;
    default:
      return status;
  }
}

function isDeleteAucationReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.DELETE_AUCATION:
      return action.payload.status;
    default:
      return status;
  }
}

function isEditAucationReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.EDIT_AUCATION:
      return action.payload.status;
    default:
      return status;
  }
}

function detailAucationReducer(aucation = null, action = {}) {
  switch (action.type) {
    case ActionType.DETAIL_AUCATION:
      return action.payload.aucation;
    default:
      return aucation;
  }
}

export {
  aucationsReducer,
  isAddAucationReducer,
  isDeleteAucationReducer,
  isEditAucationReducer,
  detailAucationReducer,
};
