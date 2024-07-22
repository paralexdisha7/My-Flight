import React, { useState } from "react";
import axios from "axios";
import ToggleButton from "./components/ToggleButton";

const App = () => {
  const [origin, setOrigin] = useState("JFK");
  const [destination, setDestination] = useState("JFK");
  const [cabin, setCabin] = useState("Economy");
  const [results, setResults] = useState(null);

  const handleSearch = () => {
    const headers = {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9,hi;q=0.8",
      "cache-control": "no-cache",
      "content-type": "application/json",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    };

    const json_data = {
      origin: origin,
      destination: destination,
      partnerPrograms: [
        "Air Canada",
        "United Airlines",
        "KLM",
        "Qantas",
        "American Airlines",
        "Etihad Airways",
        "Alaska Airlines",
        "Qatar Airways",
        "LifeMiles",
      ],
      stops: 2,
      departureTimeFrom: "2024-07-09T00:00:00Z",
      departureTimeTo: "2024-10-07T00:00:00Z",
      isOldData: false,
      limit: 302,
      offset: 0,
      cabinSelection: [cabin],
      date: new Date().toISOString(),
    };

    axios
      .post("https://cardgpt.in/apitest", json_data, { headers })
      .then((response) => {
        setResults(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setResults([]);
      });
  };

  return (
    <div className="bg-[#172014] h-full text-[#cecfc3] font-poppins min-h-screen py-10">
      <div className="max-w-lg flex flex-col items-center mx-auto gap-10 py-2">
        <h1 className="font-semibold text-[#cecfc3] text-sm sm:text-xl  ">
          Choose Origin & Destination Airports
        </h1>
        <div className="flex flex-col w-1/2 bg-[#181818] py-2 px-1 gap-1 rounded-md shadow-md">
          <label className="text-xs opacity-70 px-3 font-extralight">
            Origin
          </label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="bg-[#181818] px-3 font-light"
          >
            <option value="JFK">JFK</option>
            <option value="DEL">DEL</option>
            <option value="SYD">SYD</option>
            <option value="BOM">BOM</option>
            <option value="BNE">BNE</option>
            <option value="BLR">BLR</option>
          </select>
        </div>
        <div className="flex flex-col w-1/2 bg-[#181818] py-2 px-1 gap-1 rounded-md shadow-md">
          <label className="text-xs opacity-70 px-3 font-extralight">
            Destination
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="bg-[#181818] px-3 font-light"
          >
            <option value="JFK">JFK</option>
            <option value="DEL">DEL</option>
            <option value="SYD">SYD</option>
            <option value="LHR">LHR</option>
            <option value="CDG">CDG</option>
            <option value="DOH">DOH</option>
            <option value="SIN">SIN</option>
          </select>
        </div>
        <div className="flex flex-col w-1/2 bg-[#181818] py-2 px-1 gap-1 rounded-md shadow-md">
          <label className="text-xs opacity-70 px-3 font-extralight">
            Cabin Selection
          </label>
          <select
            value={cabin}
            onChange={(e) => setCabin(e.target.value)}
            className="bg-[#181818] px-3 font-light"
          >
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="First">First</option>
          </select>
        </div>
       
       <div className="flex  gap-2 text-sm sm:text-lg sm:gap-4 bg-[#181818] w-1/2 py-6  rounded-md justify-center shadow-md ">
       <ToggleButton/><p className="font-light">Show <span className="font-semibold text-[#ba6d20]">Pro Filters</span></p>
       </div>

        <button
          onClick={handleSearch}
          className="bg-[#38b8a6] rounded-md px-10 py-2 hover:bg-[#287a6f] active:bg-[#1b564f]"
        >
          Search
        </button>
        <div className="flex flex-wrap gap-8 justify-center sm:flex-nowrap">
          {results ? (
            results.length > 0 ? (
              results.map((result, index) => (
                <div
                  key={index}
                  className="flex flex-col p-2 bg-[#1a4d2f] items-center gap-8 rounded-md min-w-72 py-8"
                >
                  <div className="">
                    <img
                      src={`${result.partner_program}.png`}
                      alt="Logo"
                      className="text-sm h-20 "
                    />
                  </div>
                  <p className="text-xl">{result.partner_program || "N/A"}</p>
                  <div className="text-center font-light">
                    <p className="text-sm">
                      {origin} &rarr; {destination}
                    </p>
                    <p className="text-xs">
                      {new Date("2024-07-09T00:00:00Z").toLocaleDateString()} -{" "}
                      {new Date("2024-10-07T00:00:00Z").toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col ">
                    <div className="flex justify-center gap-2 ">
                      {" "}
                      <p className="text-2xl font-semibold">
                        {result.min_business_miles !== null
                          ? `${result.min_business_miles} `
                          : "N/A"}
                      </p>
                      <p className="text-xs mt-2">
                        {result.min_business_miles !== null
                          ? `+ $${result.min_business_tax}`
                          : "N/A"}
                      </p>
                    </div>
                    <p className="text-xs font-light text-center">
                      Min Business Miles
                    </p>
                  </div>

                  <div className="flex flex-col ">
                    <div className="flex justify-center gap-2 ">
                      <p className="text-2xl font-semibold">
                        {result.min_economy_miles !== null
                          ? `${result.min_economy_miles} `
                          : "N/A"}
                      </p>
                      <p className="text-xs mt-2">
                        {result.min_economy_miles !== null
                          ? `+ $${result.min_economy_tax}`
                          : "N/A"}
                      </p>
                    </div>
                    <p className="text-xs font-light text-center">
                      Min Economy Miles
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex justify-center gap-2 ">
                      {" "}
                      <p className="text-2xl font-semibold">
                        {result.min_first_miles !== null
                          ? `${result.min_first_miles}`
                          : "N/A"}
                      </p>
                      <p className="text-xs mt-2">
                        {result.min_first_miles &&
                          ` + $${result.min_first_tax}`}
                      </p>
                    </div>
                    <p className="text-xs font-light text-center">
                      Min First Miles
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="w-max text-teal-600 sm:text-2xl capitalize">Try another search route !</p>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
