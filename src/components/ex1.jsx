const App = () => {
  const [dialog, setDialog] = React.useState(null);
  return (
    <>
      <MainContent dialog={dialog} setDialog={setDialog} />
      <Dialog currentDialog={dialog} />
    </>
  );
};
const MainContent = ({ dialog, setDialog }) => {
  return (
    <>
      <Sidebar>
        <Link>Home</Link>
        <Link>About</Link>
        <LogInButton afterLogin={() => setDialog("login-success")} />
      </Sidebar>
      <Main>Stuff</Main>
    </>
  );
};
const Dialog = ({ currentDialog }) => {
  if (!currentDialog) {
    return null;
  }
  return <div>{/* Do stuff with currentDialog */}</div>;
};

//solution

const DialogContext = React.createContext();
const App = () => {
  const [dialog, setDialog] = React.useState(null);
  return (
    <>
      <DialogContext.Provider value={{ dialog, setDialog }}>
        <MainContent dialog={dialog} setDialog={setDialog} />
        <Dialog currentDialog={dialog} />
      </DialogContext.Provider>
    </>
  );
};
const MainContent = () => {
  const { setDialog } = React.useContext(DialogContext);
  return (
    <>
      <Sidebar>
        <Link>Home</Link>
        <Link>About</Link>
        <LogInButton afterLogin={() => setDialog("login-success")} />
      </Sidebar>
      <Main>Stuff</Main>
    </>
  );
};
const Dialog = () => {
  const { dialog } = React.useContext(DialogContext);
  if (!dialog) {
    return null;
  }
  return <div>{/* Do stuff with currentDialog */}</div>;
};
