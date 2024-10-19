import { useState } from "react";
import PropTypes from "prop-types";

function AucationInput({ onAddAucation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startBid, setStartBid] = useState("");
  const [closedAt, setClosedAt] = useState("");
  const [cover, setCover] = useState(null); // Menyimpan file cover
  const [previewCover, setPreviewCover] = useState(null); // Pratinjau gambar cover
  const [formError, setFormError] = useState(""); // State untuk error message

  // Fungsi yang akan dijalankan ketika form disubmit
  function handleOnAddAucation(e) {
    e.preventDefault(); // Mencegah refresh halaman

    // Tambahkan validasi untuk memastikan startBid adalah angka
    const bidValue = parseFloat(startBid);
    if (isNaN(bidValue) || bidValue <= 0) {
      setFormError("Start bid harus berupa angka positif.");
      return;
    }

    const fullClosedAt = `${closedAt}:00`; // Tambahkan detik ke waktu closedAt

    // Validasi apakah semua field terisi
    if (title.trim() && description.trim() && bidValue && closedAt && cover) {
      const aucationData = {
        title,
        description,
        start_bid: bidValue, // Pastikan startBid dalam format angka
        closed_at: fullClosedAt, // Biarkan closedAt tetap sebagai string ISO
        cover, // Kirim file cover yang dipilih
      };
      onAddAucation(aucationData); // Kirim data ke parent (AucationAddPage)
      setFormError(""); // Reset error message jika data valid
    } else {
      setFormError("Form tidak valid, pastikan semua field diisi dengan benar.");
    }
  }

  // Handler untuk cover input (file gambar)
  function handleCover({ target }) {
    const file = target.files[0];
    if (file) {
      setCover(file); // Simpan file ke state
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewCover(reader.result); // Set pratinjau gambar
      };
      reader.readAsDataURL(file); // Konversi gambar untuk pratinjau
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="ps-2">Tambahkan Aucation</h3>
        <hr />
        {formError && <p className="text-danger">{formError}</p>} {/* Tampilkan pesan error */}
        <form onSubmit={handleOnAddAucation}>
          {/* Preview Cover */}
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

          {/* Upload Cover */}
          <div className="mb-3">
            <label htmlFor="inputCover" className="form-label">Upload Cover Image</label>
            <input
              type="file"
              id="inputCover"
              onChange={handleCover}
              accept="image/*"
              className="form-control"
              required
            />
          </div>

          {/* Title Input */}
          <div className="mb-3">
            <label htmlFor="inputTitle" className="form-label">Judul</label>
            <div className="input-group">
              <input
                type="text"
                id="inputTitle"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="form-control"
                required
              />
              <span className="input-group-text">{title.length}/50</span>
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="inputDescription" className="form-label">Deskripsi</label>
            <textarea
              rows="5"
              id="inputDescription"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="form-control"
              required
            ></textarea>
            <div className="text-end">{description.length}/1000</div>
          </div>

          {/* Start Bid Input */}
          <div className="mb-3">
            <label htmlFor="inputStartBid" className="form-label">Start Bid (in numbers)</label>
            <input
              type="number"
              id="inputStartBid"
              onChange={(e) => setStartBid(e.target.value)}
              value={startBid}
              className="form-control"
              required
            />
          </div>

          {/* Closed At Input */}
          <div className="mb-3">
            <label htmlFor="inputClosedAt" className="form-label">Closed At</label>
            <input
              type="datetime-local"
              id="inputClosedAt"
              onChange={(e) => setClosedAt(e.target.value)}
              value={closedAt}
              className="form-control"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mb-4 text-end mt-3">
            <button type="submit" className="btn btn-primary">Simpan</button>
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
