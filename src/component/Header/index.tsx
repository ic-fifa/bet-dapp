import { Nav, Button, Dropdown, Tag } from "@douyinfe/semi-ui";
import { IconBell, IconLanguage } from '@douyinfe/semi-icons';
import { PureComponent } from "react";
import Logo from '../../image/logo.png';
import { Link } from "react-router-dom";
import Metamask from '../../image/metamask.svg';
import avatar from '../../image/nftgaga.png';
import { MetaMaskWalletConnector } from "../../model/utils/connector";
import session from '../../model/Session';
import { observer } from "mobx-react";
import { t } from 'i18next';
interface Props {
    headHeight: string,
    onLanguageChange: (code: string) => void;
}

@observer
export class Header extends PureComponent<Props>{
    /* const [localeCode, setLocaleCode] = useState("en_GB")
    useEffect(() => {
        const code = localStorage.getItem('language') || 'en_GB';
        setLocaleCode(code)
    }, []) */

    /* handleNewChain = () => {
        console.log('网络被切换了');
    } */

    onLanguageChange = (code: string) => {
        this.props.onLanguageChange(code)
    }

    clearAccount = () => {
        console.log('first disconnect')
        session.disconnectWallet();
    }

    addBSCNetwork = async () => {
        console.log('addBSCNetwork', process.env)
        await new MetaMaskWalletConnector().addBSCNetWork();
    }
    switchNetwork = async () => {
        await new MetaMaskWalletConnector().switchToOtherNetwork()
    }
    connectWallet = async () => {
        try {
            await session.connectWallet();
        } catch (error) {
            console.error(error);
        }
    }

    formatAddress = (walletAddress: string) => walletAddress.slice(0, 5) + '...' + walletAddress.slice(-3);

    render() {

        const { walletAuth, chainId } = session, { headHeight } = this.props;
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
                            <Dropdown
                                position={'bottomRight'}
                                showTick
                                render={
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => this.onLanguageChange('en_GB')}>English</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.onLanguageChange('zh_CN')}>简体中文</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.onLanguageChange('ar')}>Ar</Dropdown.Item>
                                    </Dropdown.Menu>
                                }
                            >
                                <Button
                                    theme="borderless"
                                    icon={<IconLanguage size="large" />}
                                    style={{
                                        color: 'var(--semi-color-text-2)',
                                        marginRight: '12px',
                                    }}
                                />
                            </Dropdown>


                            <Button theme="solid" style={{ marginRight: 10 }} onClick={this.switchNetwork}>{chainId}</Button>
                            <Button icon={<img src={Metamask} alt='metamask' width={20} height={20} />} theme="solid" style={{ marginRight: 10 }} onClick={this.addBSCNetwork}>Add BSC Network</Button>
                            {
                                walletAuth ?
                                    <>
                                        <span style={{color:"#fff"}}>{walletAuth.balance}</span>
                                        <Dropdown
                                            position={'bottomRight'}
                                            render={
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>Assets</Dropdown.Item>
                                                    <Dropdown.Item>My Order</Dropdown.Item>
                                                    <Dropdown.Item onClick={this.clearAccount}>Logout</Dropdown.Item>
                                                </Dropdown.Menu>
                                            }
                                        >
                                            <Tag avatarSrc={avatar} avatarShape='circle' size='large'>{this.formatAddress(walletAuth.address)}</Tag>
                                        </Dropdown>
                                    </> :
                                    <Button type="primary" onClick={this.connectWallet}>{t('header.connect')}</Button>

                            }
                        </Nav.Footer>
                    </Nav>
                </div>
            </div>
        )
    }

}

