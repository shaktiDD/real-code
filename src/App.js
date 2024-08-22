import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EditorPage from './pages/EditorPage';
import Privateroute from "./components/Privateroute";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <>
            <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88',
                            },
                        },
                    }}
                ></Toaster>
            </div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>}></Route>
                    <Route path="/register" element={<RegisterPage/>}></Route>
                    <Route path="/home" element={<Privateroute element={<HomePage/>}/>}></Route>
                    <Route
                        path="/editor/:roomId"
                        element={<EditorPage />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
