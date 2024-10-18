import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoList from "../components/TodoList";
import {
  asyncGetAucations,
  asyncDeleteTodo,
  deleteAucationActionCreator,
} from "../states/todos/action";

function HomePage() {
  const { aucations = [], isDeleteAucation = false } = useSelector(
    (states) => states
  );

  const queryParams = new URLSearchParams(location.search);
  const is_closed = queryParams.get("is_closed") || "";

  const dispatch = useDispatch();

  useEffect(() => {
    if (isDeleteAucation) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        icon: "success",
        title: "Todo berhasil dihapus!",
        showConfirmButton: false,
        timer: 700,
      });
      dispatch(deleteAucationActionCreator(false));
    }
    dispatch(asyncGetAucations(is_closed));
  }, [dispatch, isDeleteAucation, is_closed]);

  const onDeleteTodo = (id) => {
    dispatch(asyncDeleteTodo(id));
  };

  return (
    <section>
      <div className="container pt-1">
        <TodoList todos={todos} onDeleteTodo={onDeleteTodo}></TodoList>
      </div>
    </section>
  );
}

export default HomePage;
