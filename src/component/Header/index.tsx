import { Nav, Button, Avatar, Dropdown, Tag } from "@douyinfe/semi-ui";
import { IconBell, IconHelpCircle } from '@douyinfe/semi-icons';
import { PureComponent } from "react";
import Logo from '../../image/logo.png';
import { Link } from "react-router-dom";
import avatar from '../../image/discord.svg';
import Metamask from '../../image/metamask.svg';
import { MetaMaskWalletConnector } from "../../model/utils/connector";
interface Props {
    headHeight: string
}
type State = {
    isConnect: boolean;
    walletAddress: string;
    balance: string;
}
export class Header extends PureComponent<Props, State>{
    state: Readonly<State> = {
        isConnect: false,
        walletAddress: '',
        balance: '0'
    };
    componentDidMount = async () => {
        const connected = await new MetaMaskWalletConnector().connected;
        this.setState({ isConnect: connected })
    }
    connectWallet = async () => {
        const wallet = await new MetaMaskWalletConnector().connect();
        if (wallet) {
            this.setState({ isConnect: true, walletAddress: wallet.address })
        }

        console.log('connectWallet', wallet)
    }
    render() {
        const { headHeight } = this.props, { isConnect, walletAddress, balance } = this.state;
        return (
            <div className='semi-layout-header' style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                {/* Validation */}
                <div>
                    <Nav mode="horizontal" defaultSelectedKeys={['Home']} style={{ height: headHeight }}>
                        <Nav.Header>
                            <Link to="/"><img src={Logo} alt="logo" style={{ width: '96px', height: '26px' }} /></Link>
                        </Nav.Header>
                        <Nav.Footer>
                            <Button
                                theme="borderless"
                                icon={<IconBell size="large" />}
                                style={{
                                    color: 'var(--semi-color-text-2)',
                                    marginRight: '12px',
                                }}
                            />
                            <Button
                                theme="borderless"
                                icon={<IconHelpCircle size="large" />}
                                style={{
                                    color: 'var(--semi-color-text-2)',
                                    marginRight: '12px',
                                }}
                            />

                            <Button icon={<img src={Metamask} />} theme="solid" style={{ marginRight: 10 }}>Add BSC Network</Button>
                            {
                                !isConnect ?
                                    <Button type="primary" onClick={this.connectWallet}>Connect Wallet</Button> :
                                    <>
                                        <Tag avatarShape='circle' size='large'>Balance{balance}</Tag>
                                        <Dropdown
                                            position={'bottomRight'}
                                            render={
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>Assets</Dropdown.Item>
                                                    <Dropdown.Item>My Order</Dropdown.Item>
                                                </Dropdown.Menu>
                                            }
                                        >
                                            <Tag avatarSrc={avatar} avatarShape='circle' size='large'>{walletAddress}</Tag>
                                        </Dropdown>
                                    </>
                            }
                        </Nav.Footer>
                    </Nav>
                </div>
            </div>
        )
    }
}