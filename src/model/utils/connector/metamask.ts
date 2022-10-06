import { IWalletConnector, WalletAuth, WalletType } from ".";
import { ethers, Signer } from "ethers";
import lucker from "../abi/lucker.json";
import usdt from "../abi/usdt.json";
import BigNumber from 'bignumber.js';
import {
    BscChain,
    BscNewWork,
    bscTestUsdt,
    LuckContract
} from "../config";
import { observable } from "mobx";

declare const window: any;
const { ethereum } = window;

export type NumberLike = string | number | bigint | BigNumber;
export const toBigNumber = (value: NumberLike) =>
  new BigNumber((value + '').replaceAll(',', ''));

export class MetaMaskWalletConnector implements IWalletConnector {
    public type: WalletType = WalletType.MetaMask;

    public connected: boolean = false;

    @observable
    signer: Signer | undefined;

    @observable
    provider

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

    depositUsdt = async (amount) => {
        console.log('depositUsdt', amount);
        const provider = new ethers.providers.JsonRpcProvider()
            try {
                const signer = provider.getSigner()
                console.log('depositUsdt')
                const luckContract = new ethers.Contract(LuckContract, lucker.abi, signer);
                console.log(lucker.abi)
                await luckContract.deposit(toBigNumber(amount));

            } catch (error) {
                throw new Error(JSON.stringify(error));
            }
    }

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

    sign = async (randomStr: string) => {
        const { signer } = this;
        if (signer !== undefined)
            try {
                return await signer.signMessage(randomStr)
            } catch (error) {
                console.log(error)
            }
    }

    getNonce = async (accountAddress) => {
        const { signer } = this;
        if (signer !== undefined)
            try {
                const luckContract = new ethers.Contract(LuckContract, lucker.abi, signer);

                const resttt = await luckContract.getNonce(accountAddress);
                console.log('getNonce', resttt)
            } catch (error) {
                throw new Error(JSON.stringify(error));
            }
    }

    getBalance = async (accountAddress) => {
        const { signer } = this;
        try {
            const usdtContract = new ethers.Contract(bscTestUsdt, usdt.abi, signer);
            let usdtBalance = await usdtContract.balanceOf(accountAddress);

            const symbol = await usdtContract.symbol();
            usdtBalance = ethers.utils.formatUnits(usdtBalance, 18);

            return (usdtBalance + symbol)
        } catch (error) {
            throw new Error(`getBalance,${error}`);
        }
    }

    connect = async (): Promise<WalletAuth> => {
        if (this.check() !== true) throw new Error('MetaMask not install');
        const provider = new ethers.providers.Web3Provider(ethereum)
        try {
            await provider.send("eth_requestAccounts", [])
            this.signer = provider.getSigner()

            const accountAddress = await this.signer.getAddress();

            const balance = await this.getBalance(accountAddress);
            await this.getNonce(accountAddress);
            return {
                type: WalletType.MetaMask,
                address: accountAddress,
                balance: balance
            };
        } catch (error) {
            throw new Error(`eth_requestAccounts_connect,${error}`);
        }
    };

    disconnect = async () => {
        console.log('MetaMask disconnect')
    };

} 