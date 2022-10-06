import axios from 'axios';
import { action, computed, observable } from 'mobx';

import { IWalletConnector, MetaMaskWalletConnector, WalletAuth } from './utils/connector';

const WALLET_AUTH = 'walletAuth';
declare const window: any;
const { ethereum } = window;
axios.defaults.baseURL = 'https://api.lucker.app';
export class SessionStore {
    @observable
    chain = 'chainID'

    @observable
    local = 'en_GB'

    @observable
    connecting = false;

    @observable
    private localAuth?: WalletAuth;

    @observable
    inviter = 'test'

    private static connector: IWalletConnector;

    constructor() {
        if (!SessionStore.connector) {
            SessionStore.connector = new MetaMaskWalletConnector();
        }
        this.restoreSession();
        ethereum.on('chainChanged', (chainId) => {
            console.log('chainId change', chainId)
        });

        /* ethereum.on('disconnect', (error) => {
            console.log('disconnect')
        }); */
    }

    @computed get isConnected() {
        return !!this.localAuth;
    }

    @computed get walletAuth() {
        return this.localAuth;
    }

    @computed get chainId() {
        return this.chain
    }

    public setChainId = async () => {
        try {
            this.chain = await SessionStore.connector.getChainId();
            sessionStorage.setItem("Chain", this.chain)
        } catch (error) {
            console.log(error)
        }
    }

    public connectWallet = async () => {
        this.connecting = true;
        try {
            this.localAuth = await SessionStore.connector.connect();
            console.log(this.localAuth.address);
            const { data } = await axios.get(`/api/Account/Sign/${this.localAuth.address}`);
            
            const randomStr = `${data.data.address}${data.data.timestamp}${data.data.nonce}`;
            console.log('data',randomStr)
            const signedMsg = await SessionStore.connector.sign(randomStr);
            console.log('signedMsg================>', signedMsg)
            const res = await axios.post('/api/Account/Login', {
                ...data.data,
                web_sign: signedMsg,
                inviter_address: this.inviter || ''
            })
            console.log('token=======================>', res.data.data.token)
            sessionStorage.setItem(WALLET_AUTH, JSON.stringify(this.localAuth));
        } catch (error) {
            console.log(error)
        } finally {
            this.connecting = false;
        }
    };
    public disconnectWallet = () => {
        if (!this.walletAuth) {
            console.debug(`wallet auth is null, it means disconnected`);
            return;
        }
        SessionStore.connector.disconnect();
        this.clearAuth();
        console.debug(`wallet disconnected`);
    };

    @action
    private restoreSession() {
        const storeVal = sessionStorage.getItem(WALLET_AUTH);
        if (!storeVal) return;
        this.localAuth = storeVal ? JSON.parse(storeVal) : undefined;
    }

    private clearAuth() {
        sessionStorage.removeItem(WALLET_AUTH);
        this.localAuth = undefined;
    }

    private saveToStorage(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }


}

export default new SessionStore();
