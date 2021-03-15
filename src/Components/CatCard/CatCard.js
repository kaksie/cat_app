import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const CatCard = ({ cat }) => {
  return (
    <div className="col-md-3 col-sm-6 col-12">
      <Card className="mb-3">
        <Card.Img variant="top" src={cat.url} alt={cat.id} />
        <Card.Body>
          <Link className="btn btn-primary btn-block" to={`/details/${cat.id}`}>
            View Details
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CatCard;
