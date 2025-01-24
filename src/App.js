import Homepage from './Homepage';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter basename="/personal-website">
    <Routes>
      <Route path="/" element={<Homepage/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
