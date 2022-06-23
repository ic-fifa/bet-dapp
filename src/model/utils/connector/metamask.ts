import { IWalletConnector, WalletAuth, WalletType } from ".";
import { ethers } from "ethers";
import { 
    /* BscChain,  */
    BscNewWork } from "../config";
declare const window: any;
const { ethereum } = window;

export class MetaMaskWalletConnector implements IWalletConnector {
    public type: WalletType = WalletType.MetaMask;

    public connected: boolean = false;

    checkIsConnected = async (): Promise<boolean> => {
        if (!this.isMetaMaskInstalled()) return false;
        return ethereum.isConnected();
    }

    addNetwork = async (params: any) => {
        try {
            await ethereum.request({ method: 'wallet_addEthereumChain', params })
        } catch (error) {
            console.log(error)
        }
    }

    addBSCNetWork = async () => {
        await this.addNetwork([BscNewWork])
    }

    switchToOtherNetwork = async () => {
        console.log('switchToOtherNetwork')
        try {
            await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [BscNewWork]
            });
        } catch (error) {
            console.log(error);
        }
    }

    private isMetaMaskInstalled = () => {
        return Boolean(ethereum && ethereum.isMetaMask);
    }

    private check = () => {
        return !this.isMetaMaskInstalled() ? window.open('https://metamask.io/') : true
    }

    /* getBalance = async (signer) => {
        try {
            const usdtContract = new ethers.Contract(BscChain.address, BscChain.abi, signer);
            let usdtBalance = await usdtContract.balanceOf(await signer.getAddress());
            let symbol = await usdtContract.symbol();
            usdtBalance = ethers.utils.formatUnits(usdtBalance, 18);
            console.log(usdtBalance + symbol)
            return (usdtBalance + symbol)
            // return "88.00USDT"
        } catch (error) {
            throw new Error(`getBalance,${error}`);
        }
    } */

    getBalance = async (signer) => {
        return "1888.00 USDT";
    }

    /**
     * @description: get chainid
     * @param {*}
     * @return {*}
     */
    getChainId = async () => {
        const { ethereum } = window;
        try {
            const chainId = await ethereum.request({
                method: "eth_chainId"
            });
            console.log(chainId)
            return chainId
            // handleNewChain(chainId);
        } catch (error) {
            throw new Error(`eth_requestAccounts,${error}`);
        }
    }

    accountChangedHandler = async (newAccount) => {
        const address = await newAccount.getAddress();
        console.log(address)
        return {
            type: WalletType.MetaMask,
            address: address
        };
    }

    connect = async (): Promise<WalletAuth> => {
        if (this.check() !== true) throw new Error('MetaMask not install');
        const provider = new ethers.providers.Web3Provider(ethereum)
        try {
            await provider.send("eth_requestAccounts", [])
            const signer = provider.getSigner()
            const accountAddress = await signer.getAddress();
            const balance = await this.getBalance(accountAddress);
            return {
                type: WalletType.MetaMask,
                address: accountAddress,
                balance: balance
            };
        } catch (error) {
            throw new Error(`eth_requestAccounts,${error}`);
        }
    };

    disconnect = async () => {
        console.log('MetaMask disconnect')
    };

} 