import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoList from "../components/TodoList";
import {
  asyncGetAucations,
  asyncDeleteAucation,
  deleteAucationActionCreator,
} from "../states/aucations/action";

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

  const onDeleteAucation = (id) => {
    dispatch(asyncDeleteAucation(id));
  };

  return (
    <section>
      <div className="container pt-1">
        <TodoList
          aucations={aucations}
          onDeleteAucation={onDeleteAucation}
        ></TodoList>
      </div>
    </section>
  );
}

export default HomePage;
