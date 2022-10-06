import { Button, Input } from "@douyinfe/semi-ui";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { PureComponent } from "react";

import { MainLayout } from "../../component/MainLayout"
import { MetaMaskWalletConnector } from "model/utils/connector";

@observer
export default class DepositPage extends PureComponent {
    @observable
    amount;

    deposit = async () => {
        const { amount } = this;
        try {
            await new MetaMaskWalletConnector().depositUsdt(amount);
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <MainLayout>
                <h1 style={{ color: '#fff' }}>Deposit page</h1>
                <label style={{ color: '#fff' }}>充值数量</label>
                <Input onChange={current => this.amount = current } />
                <Button onClick={this.deposit}>Deposit</Button>
            </MainLayout>
        )
    }
}