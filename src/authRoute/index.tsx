import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "page/Home";
import Login from "page/Login";
const AuthRoute = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export default AuthRoute;