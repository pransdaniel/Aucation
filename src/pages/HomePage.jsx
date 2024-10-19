import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoList from "../components/AucationList";
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
  const { authLogin = null } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isDeleteAucation) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        icon: "success",
        title: "Aucation berhasil dihapus!",
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
      <div className="card">
          <div className="card-body">
            <h3>Hello, {authLogin.name}! Welcome to Aucation Website!</h3>
          </div>
        </div>
        <TodoList
          aucations={aucations}
          onDeleteAucation={onDeleteAucation}
        ></TodoList>
      </div>
    </section>
  );
}

export default HomePage;
