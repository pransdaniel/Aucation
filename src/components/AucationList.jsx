import PropTypes from "prop-types";
import AucationItem, { aucationItemShape } from "./AucationItem";

function AucationList({ aucations, onDeleteAucation }) {
  const handleAddBid = (aucationId, amount) => {
    // Implementasi fungsi bid
    console.log(`Bid ${amount} untuk Aucation ID ${aucationId}`);
  };

  return (
    <div>
      {aucations.map((aucation) => (
        <AucationItem
          key={aucation.id}
          aucation={aucation}
          onDeleteAucation={onDeleteAucation}
          onAddBid={handleAddBid}
        />
      ))}
    </div>
  );
}

AucationList.propTypes = {
  aucations: PropTypes.arrayOf(PropTypes.shape(aucationItemShape)).isRequired,
  onDeleteAucation: PropTypes.func.isRequired,
  onAddBid: PropTypes.func.isRequired,
};

export default AucationList;
