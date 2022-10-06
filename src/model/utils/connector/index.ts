import { MetaMaskWalletConnector } from "./metamask";

export enum WalletType {
    MetaMask
}

export interface WalletAuth {
    type: WalletType;
    address: string;
    balance: any;
}

export interface IWalletConnector {
    type: WalletType;
    connected: boolean;
    /**
     * connect to the wallet
     * @returns {Promise<WalletAuth>}
     */
    connect: () => Promise<WalletAuth>;

    /**
     * disconnect from the wallet
     * @returns {Promise<void>}
     */
    disconnect: () => Promise<void>;

    getChainId: () => Promise<string>;

    sign:(randomStr:string)=>Promise<any>;
}
export {
    MetaMaskWalletConnector
}