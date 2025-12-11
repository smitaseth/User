import { useEffect, useState } from "react";

function api() {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    fetch("https://swapi.dev/api/people/1/")
      .then((response) => response.json())
      .then((data) => setPerson(data));
    console.log(person);
  }, []);
}

export default api;
