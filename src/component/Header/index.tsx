import { Nav, Button, Dropdown, Tag } from "@douyinfe/semi-ui";
import { IconBell, IconLanguage } from '@douyinfe/semi-icons';
import { useEffect, useState } from "react";
import Logo from '../../image/logo.png';
import { Link } from "react-router-dom";
import Metamask from '../../image/metamask.svg';
import avatar from '../../image/nftgaga.png';
import { MetaMaskWalletConnector } from "../../model/utils/connector";
import session from '../../model/Session';

interface Props {
    headHeight: string,
    onLanguageChange: (code: string) => void;
}

export const Header: React.FC<Props> = ({ headHeight, onLanguageChange }) => {
    const [localeCode, setLocaleCode] = useState("en_GB")
    useEffect(() => {
        const code = localStorage.getItem('language') || 'en_GB';
        setLocaleCode(code)
        
    }, [])
    
    /* const handleNewChain = () => {
        console.log('网络被切换了');
    } */

    const clearAccount = () => {
        console.log('first disconnect')
        session.disconnectWallet();
    }

    const addBSCNetwork = async () => {
        console.log('addBSCNetwork', process.env)
        await new MetaMaskWalletConnector().addBSCNetWork();
    }
    const switchNetwork = async () => {
        await new MetaMaskWalletConnector().switchToOtherNetwork()
    }
    const connectWallet = async () => {
        try {
            await session.connectWallet();
        } catch (error) {
            console.error(error);
        }
    }

    const formatAddress = (walletAddress: string) => walletAddress.slice(0, 5) + '...' + walletAddress.slice(-3);

    const { walletAuth, chainId } = session;
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
                                    <Dropdown.Item active={localeCode==='en_GB'} onClick={() => onLanguageChange('en_GB')}>English</Dropdown.Item>
                                    <Dropdown.Item active={localeCode==='zh_CN'} onClick={() => onLanguageChange('zh_CN')}>简体中文</Dropdown.Item>
                                    <Dropdown.Item active={localeCode==='ar'} onClick={() => onLanguageChange('ar')}>Ar</Dropdown.Item>
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


                        <Button theme="solid" style={{ marginRight: 10 }} onClick={switchNetwork}>{chainId}</Button>
                        <Button icon={<img src={Metamask} alt='metamask' width={20} height={20} />} theme="solid" style={{ marginRight: 10 }} onClick={addBSCNetwork}>Add BSC Network</Button>
                        {
                            walletAuth ?
                                <>
                                    <Tag avatarShape='circle' size='large'>Balance{walletAuth.balance}</Tag>
                                    <Dropdown
                                        position={'bottomRight'}
                                        render={
                                            <Dropdown.Menu>
                                                <Dropdown.Item>Assets</Dropdown.Item>
                                                <Dropdown.Item>My Order</Dropdown.Item>
                                                <Dropdown.Item onClick={clearAccount}>Logout</Dropdown.Item>
                                            </Dropdown.Menu>
                                        }
                                    >
                                        <Tag avatarSrc={avatar} avatarShape='circle' size='large'>{formatAddress(walletAuth.address)}</Tag>
                                    </Dropdown>
                                </> :
                                <Button type="primary" onClick={connectWallet}>Connect Wallet</Button>

                        }
                    </Nav.Footer>
                </Nav>
            </div>
        </div>
    )

}

