import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import CatCard from "../CatCard/CatCard";

const Home = () => {
  const search = useLocation().search;
  const breedQuery = new URLSearchParams(search).get("breed") || "";
  const [breeds, setBreeds] = useState([]);
  const [form, setForm] = useState({
    breed: breedQuery
  });
  const [catPics, setcatPics] = useState([]);
  const [isMore, setIsMore] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const triggerSearch = async () => {
      try {
        let reqPics = fetch(
          `https://api.thecatapi.com/v1/images/search?page=${page}&limit=10&breed_id=${form.breed}`,
          {
            headers: { "x-api-key": "2370c285-cae3-4f2b-bd39-372420f09830" }
          }
        );

        let resPics = await reqPics;
        let finalPics = await resPics.json();

        if (page === 1) {
          setcatPics(finalPics);
        } else {
          //Append new cat pics to current list if user selects load more. Make sure to remove any duplicates.
          var result = catPics.concat(
            finalPics.filter(
              (item) => !JSON.stringify(catPics).includes(JSON.stringify(item))
            )
          );

          setcatPics(result);
        }

        if (finalPics.length === 10) {
          if (result != null && result.length === catPics.length) {
            setIsMore(false);
          } else {
            setIsMore(true);
          }
        } else {
          setIsMore(false);
        }

        setIsLoading(false);
      } catch (error) {
        toast.error("Error: " + error.toString());
        setIsLoading(false);
      }
    };

    if (form.breed !== "") {
      //check for breed query on initial load
      triggerSearch();
    }
  }, [form, page]);

  const getData = async () => {
    try {
      setIsLoading(true);

      let reqBreeds = fetch(`https://api.thecatapi.com/v1/breeds`, {
        headers: { "x-api-key": "2370c285-cae3-4f2b-bd39-372420f09830" }
      });
      let resBreeds = await reqBreeds;
      let finalBreeds = await resBreeds.json();
      setBreeds(finalBreeds);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error: " + error.toString());
      setIsLoading(false);
    }
  };

  const selectChange = (e) => {
    setIsLoading(true);

    setPage(1);
    setForm({
      ...form,
      breed: e
    });
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div
      style={{
        margin: "0 20px"
      }}
    >
      <div className="row">
        <div className="col-12">
          <Form>
            <h2 className="mt-3">Cat Breeds</h2>
            <Form.Control
              as="select"
              value={form.breed}
              onChange={(e) => {
                selectChange(e.target.value);
              }}
              name="breed"
            >
              <option>Select Breed</option>

              {breeds.map((breed) => (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              ))}
            </Form.Control>
          </Form>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center m-3">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="row mt-4">
          {catPics.map((cat) => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </div>
      )}

      {isMore && !isLoading ? (
        <div className="text-center m-3">
          <Button variant="success" onClick={loadMore}>
            Load More
          </Button>
        </div>
      ) : (
        <div className="text-center m-3">
          <Button className="invisible">Load More</Button>
        </div>
      )}
    </div>
  );
};

export default Home;
