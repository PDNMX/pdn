import React, { useState, useEffect } from "react";
import axios from "axios";

const glosarioData = process.env.REACT_APP_GLOSARIO;

export default function Busqueda() {
  const [palabras, setPalabras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredPalabras, setFilteredPalabras] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(glosarioData)
      .then((res) => {
        setPalabras(res.data.feed.entry);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredPalabras(
      palabras.filter((country) =>
        //country.gsx$palabra.$t.toLowerCase().includes(search.toLowerCase());
        // busca al inicio del string
        country.gsx$palabra.$t.toLowerCase().startsWith(search.toLowerCase())
      )
    );

  }, [search, palabras]);

  if (loading) {
    return <p>Cargando Información...</p>;
  }
  return (
    <div>
      <input
        type="text"
        placeholder=""
        onChange={(e) => setSearch(e.target.value)}
      />
      <a href='a' onClick={(e) => {
          e.preventDefault();
          setSearch('abuso')}
          }>
              A
      </a>
      {filteredPalabras.map((country, idx) => (
        <ResultDetail key={idx} {...country} />
      ))}
    </div>
  );
}

const ResultDetail = (props) => {
    const { gsx$palabra, gsx$descripción, gsx$fuente } = props;
    return (
        <>
        <p>{gsx$palabra.$t}</p>
        <p>{gsx$descripción.$t}</p>
        <p>{gsx$fuente.$t}</p>
        </>
    );
};



