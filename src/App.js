import Header from "./components/header/Header";
import RepoCard from "./components/body/RepoCard";
import {Route, Routes } from 'react-router-dom';
import Details from "./components/body/graph/Details";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<><Header/><RepoCard/></>} />
        <Route path='/details/:user/:repo' element={<Details/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
