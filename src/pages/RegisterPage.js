import {useNavigate} from "react-router-dom";
import {useState} from "react";

import toast from "react-hot-toast";
import axios from "axios";


const RegiterPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            handleReigster()
        }
    };

    const handleReigster = async () => {
        if (!name || !email || !password || !confirmPassword) {
            toast.error("All fields are required");
        }

        if (password !== confirmPassword) {
            toast.error('Password do not match');
            return
        }
        try {
            const response = await axios.post("http://localhost:3000/api/auth/register", {
                name,
                email,
                password,
            })
            toast.success('Registered successfully')
            navigate("/")
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.msg || 'Registration failed');
            } else {
                toast.error('An error occurred');
            }
        }
    }
    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img
                    className="homePageLogo"
                    src="/code-sync.png"
                    alt="code-sync-logo"
                />
                <h4 className="mainLabel">Register here with your email</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        onKeyUp={handleInputEnter}
                    />

                    <input
                        type="password"
                        className="inputBox"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        onKeyUp={handleInputEnter}
                    />
                    <button className="btn joinBtn" onClick={handleReigster}>
                        Register
                    </button>
                    {/*<span className="createInfo">*/}
                    {/*    Don't have an account  &nbsp;*/}
                    {/*    <a*/}
                    {/*        onClick={createNewRoom}*/}
                    {/*        href=""*/}
                    {/*        className="createNewBtn"*/}
                    {/*    >*/}
                    {/*        Register here*/}
                    {/*    </a>*/}
                    {/*</span>*/}
                </div>
            </div>
            <footer>
                <h4>
                    Built with 💛 &nbsp; by &nbsp;
                    <a href="https://github.com/codersgyan">Coder's Gyan</a>
                </h4>
            </footer>
        </div>
    )
}

export default RegiterPage