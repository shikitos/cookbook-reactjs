import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, CreateRecipe, Welcome, EditRecipe, Footer } from './components';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path="/" exact element={<Welcome />} />
          <Route path="/create-recipe" exact element={<CreateRecipe />} />
          <Route path="/edit-recipe" exact element={<EditRecipe />} />
          {/* <Route path="/tags/:name" element={<ComponentName />} />
          <Route path="/categories/recipes/:name" element={<ComponentName />} />
          <Route path="/search/:" element={< />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
