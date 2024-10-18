import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { postedAt } from "../utils/tools";
import { FaClock, FaTrash, FaGavel } from "react-icons/fa6";
import Swal from "sweetalert2";

// Define aucationItemShape
const aucationItemShape = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  start_bid: PropTypes.number,
  closed_at: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  is_closed: PropTypes.bool.isRequired,
};

// Ensure aucationItemShape is exported
export { aucationItemShape };

function AucationItem({ aucation, onDeleteAucation, onAddBid }) {
  let badgeStatus, badgeLabel;
  if (aucation.is_closed) {
    badgeStatus = "badge bg-success text-white ms-3";
    badgeLabel = "Selesai";
  } else {
    badgeStatus = "badge bg-warning text-dark ms-3";
    badgeLabel = "Belum Selesai";
  }

  const handleAddBid = () => {
    Swal.fire({
      title: 'Tambah Bid',
      input: 'number',
      inputLabel: 'Masukkan jumlah bid',
      inputAttributes: {
        min: aucation.start_bid,
      },
      showCancelButton: true,
      confirmButtonText: 'Bid',
      showLoaderOnConfirm: true,
      preConfirm: (amount) => {
        if (!amount || amount < aucation.start_bid) {
          Swal.showValidationMessage(`Jumlah bid harus lebih dari ${aucation.start_bid}`);
          return;
        }
        return onAddBid(aucation.id, parseFloat(amount));
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-8 d-flex">
            <h5>
              <Link to={`/aucations/${aucation.id}`} className="text-primary">
                {aucation.title}
              </Link>
            </h5>
            <div>
              <span className={badgeStatus}>{badgeLabel}</span>
            </div>
          </div>

          <div className="col-4 text-end">
            <button
              type="button"
              onClick={() => {
                Swal.fire({
                  title: "Hapus Aucation",
                  text: `Apakah kamu yakin ingin menghapus Aucation: ${aucation.title}?`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Ya, Tetap Hapus",
                  customClass: {
                    confirmButton: "btn btn-danger me-3 mb-4",
                    cancelButton: "btn btn-secondary mb-4",
                  },
                  buttonsStyling: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    onDeleteAucation(aucation.id);
                  }
                });
              }}
              className="btn btn-sm btn-outline-danger"
            >
              <FaTrash /> Hapus
            </button>
            <button
              type="button"
              onClick={handleAddBid}
              className="btn btn-sm btn-outline-primary ms-2"
            >
              <FaGavel /> Bid
            </button>
          </div>

          <div className="col-12 mt-3">
            <img
              src={aucation.cover}
              alt="Cover"
              style={{
                maxWidth: "100%",
                maxHeight: "150px",
                objectFit: "cover",
              }}
            />
            <p><strong>Description:</strong> {aucation.description}</p>
            <p><strong>Starting Bid:</strong> {aucation.start_bid}</p>
            <p><strong>Closed At:</strong> {new Date(aucation.closed_at).toLocaleString()}</p>
            <div className="text-sm op-5">
              <FaClock />
              <span className="ps-2">{postedAt(aucation.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define propTypes for AucationItem
AucationItem.propTypes = {
  aucation: PropTypes.shape(aucationItemShape).isRequired,
  onDeleteAucation: PropTypes.func.isRequired,
  onAddBid: PropTypes.func.isRequired,
};

export default AucationItem;
