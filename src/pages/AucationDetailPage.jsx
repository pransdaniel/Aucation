import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncDetailAucation, asyncEditAucation } from "../states/todos/action";
import AucationDetail from "../components/AucationDetail";

function AucationDetailPage() {
  const { id } = useParams();

  const { detailAucation } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(asyncDetailAucation(id));
    }
  }, [id, dispatch]);

  const handleEditAucation = (id, title, description, is_finished) => {
    dispatch(asyncEditAucation(id, title, description, is_finished));

    Swal.fire({
      icon: "success",
      title: "Berhasil mengedit todo!",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  return (
    <section>
      <div className="container pt-1">
        {detailAucation != null ? (
          <AucationDetail
            aucation={detailAucation}
            onEditAucation={handleEditAucation}
          />
        ) : null}
      </div>
    </section>
  );
}

export default AucationDetailPage;
