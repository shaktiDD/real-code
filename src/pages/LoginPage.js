import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const LoginPage = () => {
    const navigate = useNavigate();


    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const registerpage = () => {
        navigate("/register");
    };

    const login = async () => {
        if (!email || !password) {
            toast.error('Email & password are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            const { token, msg } = response.data;
            toast.success(msg);

            // Optionally, store the token in local storage or handle it as needed
            localStorage.setItem('token', token);

            // Redirect to editor or another page
            navigate("/home")
        } catch (error) {
            if (error.response.status === 400) {
                toast.error('Incorrect password');
            } else {
                toast.error('An error occurred');
            }
        }
    };

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            login();
        }
    };

    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img
                    className="homePageLogo"
                    src="/code-sync.png"
                    alt="code-sync-logo"
                />
                <h4 className="mainLabel">Login with fuck email</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        type="password"
                        className="inputBox"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        onKeyUp={handleInputEnter}
                    />
                    <button className="btn joinBtn" onClick={login}>
                        Login
                    </button>
                    <span className="createInfo">
                        Don't have an account? &nbsp;
                        <a
                            onClick={registerpage}
                            href=""
                            className="createNewBtn"
                        >
                            Register here
                        </a>
                    </span>
                </div>
            </div>
            <footer>
                <h4>
                    Built with 💛 &nbsp; by &nbsp;
                    <a href="https://github.com/codersgyan">codersgyan</a>
                </h4>
            </footer>
        </div>
    );
};

export default LoginPage;
