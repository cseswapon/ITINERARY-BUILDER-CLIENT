import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navabar/Navbar";
import { useEffect, useState } from "react";

const CountryInfo = () => {
  const { countryname } = useParams();
  const [result, setResult] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://itinerary-builder-server.vercel.app/api/v1/itinerary",
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

  const filterData =
    result.filter((item) => item.country === countryname) || [];

  console.log(filterData);

  let loading = false;

  if (filterData.length > 0) {
    loading = true;
  }

  console.log(loading);

  return (
    <>
      <Navbar />
      <h1>Country Info {countryname}</h1>
      {loading &&
        filterData.map((item, i) => (
          <div key={i}>
            <h3>Itinerary : {i + 1}</h3>
            <p>Title : {item.title}</p>
            <p>Description : {item.description}</p>
          </div>
        ))}
    </>
  );
};

export default CountryInfo;
