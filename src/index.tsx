import { Suspense } from 'react';
import AuthRoute from './authRoute';
import ReactDOM from 'react-dom';
import { Loading } from './component/Loading';
import './styles.css';


const app = document.getElementById("app");
ReactDOM.render(
    <Suspense fallback={<Loading />}>
        <AuthRoute />
    </Suspense>
    ,app);
