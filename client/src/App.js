import React from "react";

import Routes from "./components/Routes.jsx";
import Session from './components/Session.jsx'

const App = ({refetch, session}) => {
  return (
    <Routes refetch={refetch} session={session} />
  );
}

//export default App;

const RootSession = Session(App);

export { RootSession }
