import { Layout, Nav } from '@douyinfe/semi-ui';
import {  IconHome, IconHistogram, IconLive, IconSetting } from '@douyinfe/semi-icons';
import { PropsWithChildren } from 'react';
import { Header } from '../Header';


export type Props = PropsWithChildren<{}>;
const headHeight = '60px'
export const MainLayout = (props: Props) => {
    const { children } = props;
    return (
        <Layout style={{ height: '100%' }}>
            <Header headHeight={headHeight} />
            <Layout style={{ minHeight: `calc(100vh - ${headHeight})` }}>
                <Layout.Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                    <Nav
                        style={{ maxWidth: 220, height: '100%' }}
                        defaultSelectedKeys={['Dashboard']}
                        items={[
                            { itemKey: 'Dashboard', link:'#/', text: '首页', icon: <IconHome size="large" /> },
                            { itemKey: 'Champion', link:'#/champion', text: '猜冠军', icon: <IconHistogram size="large" /> },
                            { itemKey: 'Live', link:'#/single', text: '单场竞猜', icon: <IconLive size="large" /> },
                            { itemKey: 'Setting', text: '设置', icon: <IconSetting size="large" /> },
                        ]}
                    />
                </Layout.Sider>
                <div className='semi-layout-content'
                    style={{
                        minHeight: `calc(100vh - ${headHeight})`,
                        borderRadius: '10px 10px 0 0',
                        backgroundColor: 'var(--semi-color-bg-0)',
                        padding:'20px'
                    }}
                >
                   {children}
                </div>
            </Layout>
        </Layout>
    );
};