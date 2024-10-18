import PropTypes from "prop-types";
import AucationItem, { aucationItemShape } from "./AucationItem";

function AucationList({ aucations, onDeleteAucation }) {
  return (
    <div>
      {aucations.map((aucation) => (
        <AucationItem
          key={aucation.id}
          aucation={aucation}
          onDeleteAucation={onDeleteAucation}
        />
      ))}
    </div>
  );
}

AucationList.propTypes = {
  aucations: PropTypes.arrayOf(PropTypes.shape(aucationItemShape)).isRequired,
  onDeleteAucation: PropTypes.func.isRequired,
};

export default AucationList;
