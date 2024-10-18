import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAddAucation,
  addAucationActionCreator,
} from "../states/aucations/action";
import AucationInput from "../components/AucationInput";
import { useNavigate } from "react-router-dom";

function AucationAddPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddAucation = false } = useSelector((states) => states);

  useEffect(() => {
    if (isAddAucation) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        icon: "success",
        title: "Aucation berhasil ditambahkan!",
        showConfirmButton: false,
        timer: 700,
      });
      navigate("/");
      dispatch(addAucationActionCreator(false));
    }
  }, [isAddAucation, navigate, dispatch]);

  const onAddAucation = ({
    cover,
    title,
    description,
    start_bid,
    closed_at,
  }) => {
    dispatch(
      asyncAddAucation({ cover, title, description, start_bid, closed_at })
    );
  };

  return (
    <section>
      <div className="container pt-1">
        <AucationInput onAddAucation={onAddAucation} />
      </div>
    </section>
  );
}

export default AucationAddPage;
