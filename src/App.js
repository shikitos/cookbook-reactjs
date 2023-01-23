import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Welcome } from './components';
import { Header } from './components';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path="/" exact element={<Welcome />} />
          {/* <Route path="/tags/:name" element={<ComponentName />} />
          <Route path="/categories/recipes/:name" element={<ComponentName />} />
          <Route path="/search/:" element={< />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
