import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import useInterval from "../hooks/use-interval.hook";
import { GameContext } from "./GameContext";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

// const items = [
//   { id: "cursor", name: "Cursor", cost: 10, value: 1 },
//   { id: "grandma", name: "Grandma", cost: 100, value: 10 },
//   { id: "farm", name: "Farm", cost: 1000, value: 80 },
// ];

// It is a custom hook to set and get local storage data - (stores numCookies).
// It takes 2 parameters - defaultValue and localStorageId.

// It contains a useState hook - [persistedState and setPersistedState] which GETS local storage, where
// this is the intitial value:
// () => {
// const localStorageData = localStorage.getItem(localStorageId);
// return localStorageData ? JSON.parse(localStorageData) : defaultValue;
// }
// It also contains a useEffect hook to set persisted state upon a change in persisted state.

// To SET local storage (generic) = setter:
// localStorage.setItem('myData', data);
// so in useEffect we have:
// localStorage.setItem(localStorageId, JSON.stringify(persistedState)); where;
// localStorageId = 'myData' (this is just a name given to retrieve the data) and JSON.stringify(persistedState) = data.
// useEffect is used to only run when [persistedState or localStorageId]) are ran.
// So, everytime something changes in persistedState or localStorageId then useEffect is ran to set any new data.

// To GET local storage (generic) = getter:
// localStorage.getItem('myData');
// So in the persistedState useState hook, this is defined by localStorageData = localStorage.getItem(localStorageId);
// If local storage exists, then localStorageData is returned. If not, the default value is given, which is 1000.

// function usePersistedState(defaultValue, localStorageId) {
//   const [persistedState, setPersistedState] = useState(() => {
//     const localStorageData = localStorage.getItem(localStorageId);
//     return localStorageData ? JSON.parse(localStorageData) : defaultValue;
//   });

//   useEffect(() => {
//     localStorage.setItem(localStorageId, JSON.stringify(persistedState));
//   }, [persistedState, localStorageId]);
//   return [persistedState, setPersistedState];
// }

function App() {
  const { numCookies, setNumCookies, cookiesPerSecond } = React.useContext(
    GameContext
  );
  //const [numCookies, setNumCookies] = usePersistedState(1000, "num-cookies");

  // const [purchasedItems, setPurchasedItems] = usePersistedState(
  //   {
  //     cursor: 0,
  //     grandma: 0,
  //     farm: 0,
  //   },
  //   "purchasedItems"
  // );
  // const calculateCookiesPerSecond = (purchasedItems) => {
  //   return Object.keys(purchasedItems).reduce((acc, itemId) => {
  //     const numOwned = purchasedItems[itemId];
  //     const item = items.find((item) => item.id === itemId);
  //     const value = item.value;

  //     return acc + value * numOwned;
  //   }, 0);
  // };
  useInterval(() => {
    const numOfGeneratedCookies = cookiesPerSecond;

    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home numCookies={numCookies} />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;
