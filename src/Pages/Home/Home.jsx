import React, { useState } from "react";
import Navbar from "../../Components/Navabar/Navbar";
import { allCountry } from "../../data/allCountry";
const Home = () => {
  const [state, setState] = useState({
    country: "",
    title: "",
    description: "",
  });
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://itinerary-builder-server.vercel.app/api/v1/description",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(state),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handelSubmit}>
        <select
          value={state.country}
          onChange={(e) =>
            setState((prev) => ({ ...prev, country: e.target.value }))
          }
        >
          <option disabled>---select country---</option>
          {allCountry.map((country, i) => (
            <option key={i}>{country.name}</option>
          ))}
        </select>
        <br />
        <input
          required
          type="text"
          placeholder="title"
          onChange={(e) =>
            setState((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <br />
        <input
          required
          type="text"
          placeholder="description"
          onChange={(e) =>
            setState((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
