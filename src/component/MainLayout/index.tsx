import { Layout, Nav, ConfigProvider, LocaleProvider } from '@douyinfe/semi-ui';
import { IconHome, IconHistogram, IconLive, IconSetting } from '@douyinfe/semi-icons';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Header } from '../Header';
import { useTranslation } from 'react-i18next';
import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import en_GB from '@douyinfe/semi-ui/lib/es/locale/source/en_GB';
import ko_KR from '@douyinfe/semi-ui/lib/es/locale/source/ko_KR';
import ja_JP from '@douyinfe/semi-ui/lib/es/locale/source/ja_JP';
import ar from '@douyinfe/semi-ui/lib/es/locale/source/ar';
import vi_VN from '@douyinfe/semi-ui/lib/es/locale/source/vi_VN';
import ru_RU from '@douyinfe/semi-ui/lib/es/locale/source/ru_RU';
import id_ID from '@douyinfe/semi-ui/lib/es/locale/source/id_ID';
import ms_MY from '@douyinfe/semi-ui/lib/es/locale/source/ms_MY';
import th_TH from '@douyinfe/semi-ui/lib/es/locale/source/th_TH';
import tr_TR from '@douyinfe/semi-ui/lib/es/locale/source/tr_TR';
import pt_BR from '@douyinfe/semi-ui/lib/es/locale/source/pt_BR';
import zh_TW from '@douyinfe/semi-ui/lib/es/locale/source/zh_TW';
import es from '@douyinfe/semi-ui/lib/es/locale/source/es';

export type Props = PropsWithChildren<{}>;
const headHeight = '60px'

const language = {
    'zh_CN': zh_CN,
    'en_GB': en_GB,
    'ko_KR': ko_KR,
    'ja_JP': ja_JP,
    'ar': ar,
    'vi_VN': vi_VN,
    'ru_RU': ru_RU,
    'id_ID': id_ID,
    'ms_MY': ms_MY,
    'th_TH': th_TH,
    'tr_TR': tr_TR,
    'pt_BR': pt_BR,
    'zh_TW': zh_TW,
    'es': es,
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