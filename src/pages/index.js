import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'
import SearchInput from 'components/SearchInput'
const api = 'https://kitsu.io/api/edge/';



export default function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState('');

  useEffect(() => {
    if (text) {
      setInfo({});

      fetch(
        `${api}anime?filter[text]=${text}&page[limit]=12`
      )
        .then((response) => response.json())
        .then((response) => {
          setInfo(response);
        });
    }
  }, [text]);

  return (
    <div className="container mx-auto">
      <h1 className="text-center font-bold text-5xl">Animes</h1>
      <SearchInput
        value={text}
        onChange={(search) => setText(search)}
      />
      {text && !info.data && <span>Carregando...</span>}
      {info.data && (
        <ul className="animes-list flex flex-wrap justify-center flex-1 grid grid-cols-4 gap-6 mt-6 mx-auto">
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img
                src={anime.attributes.posterImage.small}
                alt={anime.attributes.canonicalTitle}
              />
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}