import "./App.css";
import React, { useEffect, useState } from "react";
import MovieFilter from "./components/MovieFilter";
import Filter from "./components/Filter";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  const fetchPopular = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTU1ZDA0MzMwNjcyYmU4MTU4ZTAyNTM3MzFmNWZkYyIsInN1YiI6IjY1OGZmNWE2NTFhNjRlMDRlOGY0MGY2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VNp_L3-xnzdIM80Jp3LuI6QzQ5xmNA46mKzGiWATpRo",
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const movies = await response.json();
      setPopular(movies.results);
      setFiltered(movies.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  return (
    <div className="App">
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <motion.div
        layout
        className="popular-movies"
      >
        <AnimatePresence>
        {filtered.map((movie) => {
          return <MovieFilter key={movie.id} movie={movie} />;
        })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default App;
