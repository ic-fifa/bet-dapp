import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "../page/Login";
import { lazy, Suspense } from "react";
const Dashboard = lazy(() => import('../page/Dashboard'));
const Champion = lazy(() => import('../page/Champion'));
const Single = lazy(() => import('../page/Single'));

const AuthRoute = () => {
    return (
        <HashRouter>
            <Suspense fallback={<>Loading......</>}>
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/champion" element={<Champion />}></Route>
                    <Route path="/single" element={<Single />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                </Routes>
            </Suspense>
        </HashRouter>
    )
}
export default AuthRoute;