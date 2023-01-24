import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateRecipe, Welcome } from './components';
import { Header } from './components';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path="/" exact element={<Welcome />} />
          <Route path="/create-recipe" exact element={<CreateRecipe />} />
          {/* <Route path="/tags/:name" element={<ComponentName />} />
          <Route path="/categories/recipes/:name" element={<ComponentName />} />
          <Route path="/search/:" element={< />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
