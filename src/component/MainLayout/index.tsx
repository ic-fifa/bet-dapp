import { Layout, Nav, ConfigProvider, LocaleProvider } from '@douyinfe/semi-ui';
import { IconHome, IconHistogram, IconLive, IconSetting } from '@douyinfe/semi-icons';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Header } from '../Header';
import { useTranslation } from 'react-i18next';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import zh_TW from '@douyinfe/semi-ui/lib/es/locale/source/zh_TW';

export type Props = PropsWithChildren<{}>;
const headHeight = '60px'

const language = {
    'zh_CN': zh_CN,
    'en_GB': en_GB,
    'zh_TW': zh_TW
};
export const MainLayout: React.FC<Props> = (props) => {
    const { t } = useTranslation();

    const [locale, setLocale] = useState(en_GB)
    const [localeCode, setLocaleCode] = useState("en_GB")

    const initLanguage = () =>{
        const code = localStorage.getItem('language') || 'en_GB';
        setLocale(language[code]);
        setLocaleCode(code)
    }

    const onLanguageChange = (code: string) => {
        localStorage.setItem('language', code);
        window.location.reload();
    }
    useEffect(() => {
        initLanguage()
    }, [])
    

    const { children } = props;
    return (
        <LocaleProvider locale={locale}>
            <ConfigProvider direction={localeCode === 'ar' ? 'rtl' : 'ltr'} locale={locale}>
                <Layout style={{ height: '100%' }}>
                    <Header headHeight={headHeight} onLanguageChange={(code) => { onLanguageChange(code) }} />
                    <Layout style={{ minHeight: `calc(100vh - ${headHeight})` }}>
                        <Layout.Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                            <Nav
                                style={{ maxWidth: 220, height: '100%' }}
                                defaultSelectedKeys={['Dashboard']}
                                items={[
                                    { itemKey: 'Dashboard', link: '#/', text: `${t('sidebar.dashboard')}`, icon: <IconHome size="large" /> },
                                    { itemKey: 'Champion', link: '#/champion', text: `${t('sidebar.champion')}`, icon: <IconHistogram size="large" /> },
                                    { itemKey: 'Single', link: '#/single', text: `${t('sidebar.single')}`, icon: <IconLive size="large" /> },
                                    { itemKey: 'Withdraw', link: '#/withdraw', text: 'Withdraw', icon: <IconSetting size="large" /> },
                                    { itemKey: 'Deposit', link: '#/deposit', text: 'Deposit', icon: <IconSetting size="large" /> },
                                    { itemKey: 'Setting', text: `${t('sidebar.setting')}`, icon: <IconSetting size="large" /> }
                                ]}
                            />
                        </Layout.Sider>
                        <div className='semi-layout-content'
                            style={{
                                minHeight: `calc(100vh - ${headHeight})`,
                                borderRadius: '10px 10px 0 0',
                                backgroundColor: 'var(--semi-color-bg-0)',
                                padding: '20px'
                            }}
                        >
                            {children}
                        </div>
                    </Layout>
                </Layout>
             </ConfigProvider>
        </LocaleProvider>
    );


};