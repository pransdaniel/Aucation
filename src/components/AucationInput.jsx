import { useState } from "react";
import PropTypes from "prop-types";

function AucationInput({ onAddAucation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startBid, setStartBid] = useState("");
  const [closedAt, setClosedAt] = useState("");
  const [cover, setCover] = useState(null); // Untuk menyimpan file gambar
  const [previewCover, setPreviewCover] = useState(null); // Untuk menampilkan pratinjau gambar

  function handleOnAddAucation(e) {
    e.preventDefault(); // Mencegah refresh halaman
    if (title.trim() && description.trim() && startBid && closedAt && cover) {
      const aucationData = {
        title,
        description,
        startBid: parseFloat(startBid), // Pastikan ini berupa angka
        closedAt, // Tanggal sudah dalam format string ISO
        cover, // Ini adalah objek File gambar
      };
      onAddAucation(aucationData);
    }
  }

  function handleTitle({ target }) {
    if (target.value.length <= 50) {
      setTitle(target.value);
    }
  }

  function handleDescription({ target }) {
    if (target.value.length <= 1000) {
      setDescription(target.value);
    }
  }

  function handleStartBid({ target }) {
    setStartBid(target.value);
  }

  function handleClosedAt({ target }) {
    setClosedAt(target.value);
  }

  function handleCover({ target }) {
    const file = target.files[0];
    if (file) {
      setCover(file); // Simpan file gambar
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewCover(reader.result); // Set gambar pratinjau
      };
      reader.readAsDataURL(file); // Konversi gambar untuk pratinjau
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="ps-2">Tambahkan Aucations</h3>
        <hr />
        <form onSubmit={handleOnAddAucation}>
          {/* Input untuk Cover */}
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

          <div className="mb-3">
            <label htmlFor="inputCover" className="form-label">
              Upload Cover Image
            </label>
            <input
              type="file"
              id="inputCover"
              onChange={handleCover}
              accept="image/*"
              className="form-control"
              required
            />
          </div>

          {/* Input untuk Judul */}
          <div className="mb-3">
            <label htmlFor="inputTitle" className="form-label">
              Judul
            </label>
            <div className="input-group">
              <input
                type="text"
                id="inputTitle"
                onChange={handleTitle}
                value={title}
                className="form-control"
                required
              />
              <span className="input-group-text">{title.length}/50</span>
            </div>
          </div>

          {/* Input untuk Deskripsi */}
          <div>
            <label htmlFor="inputDescription" className="form-label">
              Deskripsi
            </label>
            <textarea
              rows="5"
              id="inputDescription"
              onChange={handleDescription}
              value={description}
              className="form-control"
              required
            ></textarea>
            <div className="text-end">
              <span>{description.length}/1000</span>
            </div>
          </div>

          {/* Input untuk Start Bid */}
          <div className="mb-3">
            <label htmlFor="inputStartBid" className="form-label">
              Start Bid (in numbers)
            </label>
            <input
              type="number"
              id="inputStartBid"
              onChange={handleStartBid}
              value={startBid}
              className="form-control"
              required
            />
          </div>

          {/* Input untuk Closed At */}
          <div className="mb-3">
            <label htmlFor="inputClosedAt" className="form-label">
              Closed At
            </label>
            <input
              type="datetime-local"
              id="inputClosedAt"
              onChange={handleClosedAt}
              value={closedAt}
              className="form-control"
              required
            />
          </div>

          {/* Tombol Simpan */}
          <div className="mb-4 text-end mt-3">
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AucationInput.propTypes = {
  onAddAucation: PropTypes.func.isRequired,
};

export default AucationInput;
