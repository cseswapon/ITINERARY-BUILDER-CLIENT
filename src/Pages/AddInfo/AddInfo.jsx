import { useEffect, useState } from "react";
import Navbar from "../../Components/Navabar/Navbar";

const AddInfo = () => {
  const [state, setState] = useState({
    country: "",
    title: "",
    description: "",
  });

  const [result, setResult] = useState([]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    //   return console.log(state);
    try {
      const response = await fetch(
        "https://itinerary-builder-server.vercel.app/api/v1/itinerary",
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
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://itinerary-builder-server.vercel.app/api/v1/description",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setResult(result.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const country = new Set(result?.map((item) => item?.country));
  const uniqueCountry = [...country];
  const filterTitle = state.country
    ? result.filter((item) => item?.country === state.country)
    : [];
  //   console.log(filterTitle);

  const title = result.find(
    (item) => item.country === state.country && item.title === state.title
  );
  // console.log(title);

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <form onSubmit={handelSubmit}>
        <label> select country</label>
        <br />
        <select
          value={state.country}
          onChange={(e) =>
            setState((prev) => ({ ...prev, country: e.target.value }))
          }
        >
          <option>--- Select country ---</option>
          {uniqueCountry.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
        <br />
        <br />

        <label> select title</label>
        <br />
        <select
          onClick={(e) =>
            setState((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        >
          <option>--- Select title ---</option>
          {filterTitle.map(({ title }, i) => (
            <option key={i} value={title}>
              {title}
            </option>
          ))}
        </select>
        <br />
        <br />
        <p>Description</p>
        <input
          required
          type="text"
          placeholder="description"
          defaultValue={title?.description}
          onMouseOver={(e) =>
            setState((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddInfo;
