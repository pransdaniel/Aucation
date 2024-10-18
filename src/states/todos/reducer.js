import { ActionType } from "./action";

function todosReducer(todos = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_AUCATIONS:
      return action.payload.aucations;

    case ActionType.EDIT_TODO:
      return todos.map((todo) =>
        todo.id === action.payload.todo.id ? action.payload.todo : todo
      );

    default:
      return todos;
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

function isDeleteTodoReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.DELETE_TODO:
      return action.payload.status;
    default:
      return status;
  }
}

function isEditTodoReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.EDIT_TODO:
      return action.payload.status;
    default:
      return status;
  }
}

function detailTodoReducer(todo = null, action = {}) {
  switch (action.type) {
    case ActionType.DETAIL_TODO:
      return action.payload.todo;
    default:
      return todo;
  }
}

export {
  todosReducer,
  isAddAucationReducer,
  isDeleteTodoReducer,
  isEditTodoReducer,
  detailTodoReducer,
};
