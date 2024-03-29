import { Suspense } from 'react';
import App from './page/App';
import ReactDOM from 'react-dom';
import { Loading } from './component/Loading';
import './styles.css';
import './locales/i18next-config'


const app = document.getElementById("root");
ReactDOM.render(
    <Suspense fallback={<Loading />}>
        <App />
    </Suspense>
    , app);
