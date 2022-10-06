import { PureComponent } from "react";
import { MainLayout } from "../../component/MainLayout"
import {t} from "i18next";
export default class Withdraw extends PureComponent {
    render() {
        return (
            <MainLayout>
                <h1 style={{color:'#fff'}}>Withdraw page{t('test')}</h1>
            </MainLayout>

        )
    }
}