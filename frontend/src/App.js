import { Navbar } from "./components/Sidebar/Navbar";
import { Route, Routes, BrowserRouter} from 'react-router-dom'
import './App.css'
import { Home } from "./components/Home/Home";
export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}