import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Card from "./assets/Components/Card";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(1);
  const listRef = useRef(null);

  const getData = async () => {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=30`
    );
    setUserData(response.data);

  if (listRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  
  };

  useEffect(() => {
    getData();
  }, [index]);

  let printUserData = (
    <h3 className="text-gray-300 text-sm text-center font-semibold w-full">
      Loading...
    </h3>
  );

  if (userData.length > 0) {
    printUserData = userData.map((elem, idx) => (
      <div key={idx}>
        <Card elem={elem} />
      </div>
    ));
  }

  return (
    <div className="bg-black h-screen flex flex-col text-white">

      {/* Scrollable cards area */}
      <div ref={listRef} className="flex flex-wrap gap-4 p-4 flex-1 overflow-auto">
        {printUserData}
      </div>

      {/* Fixed bottom buttons */}
      <div className="flex justify-center items-center gap-6 p-4 border-t border-gray-700">
        <button
        disabled={index === 1} 
        style={{opacity: index === 1 ? 0.5 : 1,cursor: index === 1 ? "not-allowed" : "pointer", }}
          className="bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-1 font-semibold"
          onClick={() => {
            if (index > 1) {
              setIndex(index - 1);
              setUserData([]);
            }
          }}
        >
          Prev
        </button>

        <h4 className="text-white font-medium">Page {index}</h4>

        <button
          className="bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-1 font-semibold"
          onClick={() => {
            setIndex(index + 1);
            setUserData([]);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
