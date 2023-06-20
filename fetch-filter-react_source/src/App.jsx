import "./style.scss";
import { useEffect, useState } from "react";
// import parsedData from "./common/dataSource";

function App() {
  const [data, setData] = useState({
    results: [],
  });

  const [users, setUsers] = useState([]);

  const [searchData, setSearchData] = useState("");

  const { results } = data;

  // the async function inside useEffect is using IIFE (Immediately Invoked Function Expression)
  useEffect(() => {
    //   fetch("https://randomuser.me/api/?results=32")
    //     .then((data) => {
    //       return data.json();
    //     })
    //     .then((data) => {
    //       setData(data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    //   // setData(parsedData);
    //
    (async () => {
      const rawData = await fetch("https://randomuser.me/api/?results=32");
      const data = await rawData.json();
      setData(data);
      setUsers(data.results || []);
    })();
  }, []);

  useEffect(() => {
    const newUsers = results?.filter((user) => {
      const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
      if (fullName.toLowerCase().replaceAll(" ", "").includes(searchData)) {
        return true;
      }
      return false;
    });
    setUsers(newUsers || []);
    console.log(newUsers);
  }, [results, searchData]);

  return (
    <div id="app">
      <h1>List of random profiles</h1>

      <div className="container">
        <input
          id="filter"
          className="form-control mb-3 form-control-lg"
          placeholder="Filter the list of profiles (title, first name, last name)..."
          onChange={(event) => {
            setSearchData(event.target.value.toLowerCase().replaceAll(" ", ""));
          }}
        />
        <div className="users row">
          {users.map((item, index) => {
            const fullName = `${item.name.title} ${item.name.first} ${item.name.last}`;
            return (
              <div className="col-2 user" key={`item-${index}`}>
                <img src={item.picture.large} alt={fullName}></img>
                <h3>{fullName}</h3>
                <button
                  onClick={() => {
                    window.open(item.picture.large);
                  }}
                >
                  Show details
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
