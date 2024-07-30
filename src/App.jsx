import { Outlet, useNavigation } from "react-router-dom";
import Header from "./components/Header/Header";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import "./App.css";

function App() {
  const navigation = useNavigation();
  return (
    <>
      <Header />
      {navigation.state === "loading" ? <LoadingSpinner /> : <Outlet />}
    </>
  );
}

export default App;
