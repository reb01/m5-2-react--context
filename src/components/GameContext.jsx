import React, { useState, useEffect } from "react";
export const GameContext = React.createContext(null);

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

function usePersistedState(defaultValue, localStorageId) {
  const [persistedState, setPersistedState] = useState(() => {
    const localStorageData = localStorage.getItem(localStorageId);
    return localStorageData ? JSON.parse(localStorageData) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(localStorageId, JSON.stringify(persistedState));
  }, [persistedState, localStorageId]);
  return [persistedState, setPersistedState];
}
export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = usePersistedState(1000, "num-cookies");

  const [purchasedItems, setPurchasedItems] = usePersistedState(
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
    },
    "purchasedItems"
  );

  function pauseGame() {
    localStorage.setItem("gamePauseTime", JSON.stringify(Date.now()));
  }
  useEffect(() => {
    onGameLoad();
    window.addEventListener("beforeunload", pauseGame);
    return () => {
      window.removeEventListener("beforeunload", pauseGame);
    };
  }, []);
  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;
      return acc + value * numOwned;
    }, 0);
  };

  const onGameLoad = () => {
    const timeAtUnload = JSON.parse(localStorage.getItem("gamePauseTime"));
    const currentTime = Date.now();
    const timeTabClosed = currentTime - timeAtUnload;
    const cookies =
      numCookies +
      calculateCookiesPerSecond(purchasedItems) *
        Math.floor(timeTabClosed / 1000);

    setNumCookies(cookies);
  };

  return (
    <GameContext.Provider
      value={{
        items,
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        cookiesPerSecond: calculateCookiesPerSecond(purchasedItems),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
