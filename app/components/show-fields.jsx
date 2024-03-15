import React from "react";

const ShowKeyValuePairs = ({ data, page }) => {
  console.log(data);
  return (
    <>
      {data.map((datum, index) => (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 border m-2 border-black bg-white">
          <a href={page + "/" + datum._id} key={index}>
            <strong>{datum._id}:</strong>{" "}
            {Object.entries(datum).map((data) => (
              <h1>{data}</h1>
            ))}
          </a>
        </div>
      ))}
    </>
  );
};

export default ShowKeyValuePairs;
