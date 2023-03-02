import "./App.css";
import Apartment from "./components/Apartment";
import Map from "./components/Map";
import data from "./temp_data/data.json";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";

import { useEffect, useState } from "react";
import { useDbData, useAuthState } from "./utilities/firebase"

function App() {
  const [apartments, setApartments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    rent: "All",
    bedrooms: "All",
    bathrooms: "All",
  });

  const user = useAuthState()[0];
  const userEmail = user?.email.split("@")[0];
  const [likedApts] = useDbData(`/${userEmail}/likedApts`);
  const [viewFavorites, setViewFavorites] = useState(false);
  const [interestAdd, setInterestAdd] = useState("");

  useEffect(() => {
    let arr = [];
    Object.entries(data).map((e) => arr.push(e[1]));
    setApartments(arr);
  }, []);

  useEffect(() => {
    const { rent, bedrooms, bathrooms } = filters;
    let arr = apartments.filter((e) => {
      return (
        (rent === "All" ? true : parseInt(e.rent) <= rent) &&
        (bedrooms === "All" ? true : e.bedrooms >= bedrooms) &&
        (bathrooms === "All" ? true : e.bathrooms >= bathrooms)
      );
    });
    setFiltered(arr);
  }, [apartments, filters]);

  useEffect(() => {
    if (viewFavorites === true) {
      setFiltered(filtered.filter((ele, index) => likedApts?.index.includes(index)));
    } else {
      const { rent, bedrooms, bathrooms } = filters;
      let arr = apartments.filter((e) => {
        return (
          (rent === "All" ? true : parseInt(e.rent) <= rent) &&
          (bedrooms === "All" ? true : e.bedrooms === bedrooms) &&
          (bathrooms === "All" ? true : e.bathrooms === bathrooms)
        );
      });
      setFiltered(arr);
    }
  }, [viewFavorites]);

  return (
    <div className="App">
      <header
        style={{
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>
            <span style={{ color: "purple" }}>Cats</span>
            <span style={{ color: "gray" }}>Live</span>
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <label className="text-xl font-semibold" htmlFor="team">
            Rent:
          </label>
          <select
            className="border border-[#E0E0E0] rounded-md bg-white w-52 px-2 py-1"
            id="team"
            name="team"
            value={filters.rent}
            onChange={(e) => setFilters({ ...filters, rent: e.target.value })}
          >
            <option value="All">All</option>
            <option value={250}>Under 250</option>
            <option value={500}>Under 500</option>
            <option value={1000}>Under 1000</option>
            <option value={2000}>Under 2000</option>
          </select>
          <label className="text-xl font-semibold" htmlFor="team">
            Bedrooms:
          </label>
          <select
            className="border border-[#E0E0E0] rounded-md bg-white w-52 px-2 py-1"
            id="team"
            name="team"
            value={filters.bedrooms}
            onChange={(e) =>
              setFilters({ ...filters, bedrooms: e.target.value })
            }
          >
            <option value="All">All</option>
            <option value="1">1 or more</option>
            <option value="2">2 or more</option>
            <option value="3">3 or more</option>
            <option value="4">4 or more</option>
          </select>
          <label className="text-xl font-semibold" htmlFor="team">
            Bathrooms:
          </label>
          <select
            className="border border-[#E0E0E0] rounded-md bg-white w-52 px-2 py-1"
            id="team"
            name="team"
            value={filters.bathrooms}
            onChange={(e) =>
              setFilters({ ...filters, bathrooms: e.target.value })
            }
          >
            <option value="All">All</option>
            <option value="1">1 or more</option>
            <option value="2">2 or more</option>
            <option value="3">3 or more</option>
            <option value="4">4 or more</option>
          </select>
          { user && <div onClick={() => {
            if (viewFavorites === false) {
              setViewFavorites(true);
            } else {
              setViewFavorites(false);
            }
          }} style={{color: "blue", textDecoration: "underline"}}>
            { viewFavorites === false ? "View Favorite Apartments" : "View All Apartments" }
          </div> }
          <Login />
        </div>
      </header>
      <section className="main_section">
        <Container className="map">
          <Map />
        </Container>
        <div fluid className="apartments">
          <Row className="row">
            {filtered.length > 0 ? (
              filtered.map((app, index) => (
                <Col className="col">
                  <Apartment data={app} index={index} ifLiked={likedApts?.index.includes(index) ? true : false} interestAdd={interestAdd} setInterestAdd={setInterestAdd}/>
                </Col>
              ))
            ) : (
              <div>No result found!</div>
            )}
          </Row>
        </div>
      </section>
    </div>
  );
}

export default App;
