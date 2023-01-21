import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Welcome } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" exact element={<Welcome />} />
          {/* <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
