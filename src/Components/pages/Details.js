import React, { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Details = (props) => {
  const [cat, setCat] = useState({});
  const [additional, setAdditional] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        let res = fetch(
          `https://api.thecatapi.com/v1/images/${props.match.params.id}`
        );

        let catRes = await res;
        let catResponse = await catRes.json();
        setCat(catResponse);
        setAdditional(catResponse.breeds[0]);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error: " + error.toString());
        setIsLoading(false);
      }
    };

    getData();
  }, [props]);

  return (
    <>
      {isLoading ? (
        <div className="text-center m-3">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <Card className="m-3">
              <Link
                className="btn btn-primary m-3"
                to={`/?breed=${additional.id}`}
              >
                Back
              </Link>

              <Card.Img variant="top" src={cat.url} />
              <Card.Body>
                <Card.Title>{additional.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Origin: {additional.origin}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  {additional.temperament}
                </Card.Subtitle>

                <Card.Text>{additional.description}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
