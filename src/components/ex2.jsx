const countContext = React.createContext(null);
const App = () => {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("");
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return (
    <>
      Playing as: {name}
      <countContext.Provider
        value={{ count, increment, decrement, name, setName }}
      >
        <CountDisplay />
        <Actions />
      </countContext.Provider>
    </>
  );
};

const CountDisplay = ({ count }) => {
  const { count } = React.useContext(countContext);
  return <h1>{count} clicks!</h1>;
};

const Actions = () => {
  const { increment, decrement, name, setName } = React.useContext(
    countContext
  );
  return (
    <div>
      <TextInput label="Name" value={name} setValue={setName} />
      <Action onClick={increment}>Increment</Action>
      <Action onClick={decrement}>Decrement</Action>
    </div>
  );
};
// NO NEED TO TWEAK ANYTHING BELOW THIS POINT
const Action = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};
const TextInput = ({ label, value, setValue }) => {
  return (
    <label>
      {label}
      <input
        type="text"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
    </label>
  );
};
render(<App />);

// solution

const AppContext = React.createContext(null);
const App = () => {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("");
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return (
    <AppContext.Provider
      value={{
        count,
        increment,
        decrement,
        name,
        setName,
      }}
    >
      Playing as: {name}
      <CountDisplay />
      <Actions />
    </AppContext.Provider>
  );
};
const CountDisplay = () => {
  const { count } = React.useContext(AppContext);
  return <h1>{count} clicks!</h1>;
};
const Actions = () => {
  const { name, setName, increment, decrement } = React.useContext(AppContext);
  return (
    <div>
      <TextInput label="Name" value={name} setValue={setName} />
      <Action onClick={increment}>Increment</Action>
      <Action onClick={decrement}>Decrement</Action>
    </div>
  );
};
// NO NEED TO TWEAK ANYTHING BELOW THIS POINT
const Action = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};
const TextInput = ({ label, value, setValue }) => {
  return (
    <label>
      {label}
      <input
        type="text"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
    </label>
  );
};
render(<App />);
