import { useEffect, useState } from "react";
import Navbar from "../../Components/Navabar/Navbar";
import "./AllData.css";
import { useNavigate } from "react-router-dom";

const AllData = () => {
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

  console.log(result);

  const uniqueCountriesSet = new Set(result.map((item) => item.country));
  const uniqueCountries = [...uniqueCountriesSet];
  // console.log(uniqueCountries);

  const navigation = useNavigate();

  const handelClick = (id) => {
    navigation(`/alldata/${id}`);
  };

  return (
    <>
      <Navbar />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {uniqueCountries.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item}</td>
              <td>
                <button onClick={() => handelClick(item)}>view</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AllData;
