import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, CreateRecipe, Welcome, EditRecipe, Recipe, NotFound, Footer } from './components';

function App() {
    return (
        <BrowserRouter>
            <Header />
                <Routes>
                    <Route path="/" exact element={<Welcome />} />
                    <Route path="/:recipename" element={<Recipe />} />
                    <Route path="/create-recipe" element={<CreateRecipe />} />
                    <Route path="/edit-recipe" element={<EditRecipe />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
