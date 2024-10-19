import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { aucationItemShape } from "./AucationItem";
import { postedAt } from "../utils/tools";
import { FaClock, FaPenToSquare, FaUpload } from "react-icons/fa6";
import api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncDetailAucation,
  asyncEditAucation,
} from "../states/aucations/action";
import { useParams, useNavigate } from "react-router-dom";

function AucationDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detailAucation } = useSelector((state) => state);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startBid, setStartBid] = useState("");
  const [closedAt, setClosedAt] = useState("");
  const [previewCover, setPreviewCover] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (id) {
      dispatch(asyncDetailAucation(id)); // Fetch the current Aucation details
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (detailAucation) {
      setTitle(detailAucation.title);
      setDescription(detailAucation.description);
      setStartBid(detailAucation.start_bid);
      setClosedAt(
        detailAucation.closed_at ? detailAucation.closed_at.slice(0, 10) : ""
      );
      setPreviewCover(detailAucation.cover);
    }
  }, [detailAucation]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewCover(previewURL);
      handleCoverUpload(file);
    }
  };

  const handleCoverUpload = async (file) => {
    setIsUploading(true);
    try {
      const message = await api.postChangeCoverAucation({
        id: detailAucation.id,
        cover: file,
      });
      console.log("Cover updated:", message);
      dispatch(asyncDetailAucation(detailAucation.id)); // Refresh the Aucation after upload
    } catch (error) {
      console.error("Failed to upload cover:", error.message);
    }
    setIsUploading(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      asyncEditAucation(
        {
          id,
          title,
          description,
          start_bid: startBid,
          closed_at: closedAt,
        },
        navigate
      )
    );
    setIsEditing(false);
  };

  let badgeStatus = detailAucation?.is_finished
    ? "badge bg-success text-white ms-3"
    : "badge bg-warning text-dark ms-3";
  let badgeLabel = detailAucation?.is_finished ? "Selesai" : "Belum Selesai";

  return (
    <div className="card mt-3">
      <div className="card-body">
        {/* Cover Image */}
        <div
          style={{
            width: "100%",
            height: "300px",
            position: "relative",
            backgroundColor: "#f0f0f1",
            marginBottom: "5px",
            overflow: "hidden",
          }}
        >
          {previewCover ? (
            <img
              src={previewCover}
              alt="Cover"
              style={{
                borderRadius: "6px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            />
          ) : (
            <p>No cover image</p>
          )}
        </div>

        <div className="row align-items-center">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <h5 className="mb-0">{detailAucation?.title}</h5>
                <span className={`${badgeStatus} ms-2`}>{badgeLabel}</span>
              </div>

              <div>
                {/* Update Cover Button */}
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={handleUploadClick}
                >
                  <FaUpload /> {isUploading ? "Uploading..." : "Update Cover"}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="d-none"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                {/* "Edit" Button */}
                <button
                  type="button"
                  onClick={() => setIsEditing((prevState) => !prevState)}
                  className="btn btn-sm btn-outline-warning"
                >
                  <FaPenToSquare /> {isEditing ? "Cancel Edit" : "Edit"}
                </button>
              </div>
            </div>

            <div className="col-12">
              <div className="text-sm op-5">
                <FaClock />
                <span className="ps-2">
                  {postedAt(detailAucation?.created_at)}
                </span>
              </div>
            </div>

            <hr />

            <div className="col-12 mt-3">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="editTitle" className="form-label">
                      Edit Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editTitle"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editDescription" className="form-label">
                      Edit Description
                    </label>
                    <textarea
                      className="form-control"
                      id="editDescription"
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editStartBid" className="form-label">
                      Edit Start Bid
                    </label>
                    <input
                      type="number"
                      id="editStartBid"
                      value={startBid}
                      onChange={(e) => setStartBid(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editClosedAt" className="form-label">
                      Edit Closed At
                    </label>
                    <input
                      type="datetime-local"
                      id="editClosedAt"
                      value={closedAt}
                      onChange={(e) => setClosedAt(e.target.value)}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <div>{detailAucation?.description}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AucationDetail.propTypes = {
  aucation: PropTypes.shape(aucationItemShape).isRequired,
  onEditAucation: PropTypes.func.isRequired,
};

export default AucationDetail;
