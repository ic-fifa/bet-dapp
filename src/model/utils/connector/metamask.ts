import { IWalletConnector, WalletAuth, WalletType } from ".";
import { ethers } from "ethers";
import { APP_NAME, chain, isLocalEnv } from "../Config";
declare var window: any
export class MetaMaskWalletConnector implements IWalletConnector {
    public type = WalletType.MetaMask;

    public connected: boolean = false;

    constructor() {
        this.connect();
    }

    /**
   * @description: check metamask
   * @param {*}
   * @return {bool}
   */
    private isMetaMask = () => {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    }

    private check = () => {
        return !this.isMetaMask() ? window.open('https://metamask.io/') : true
    }

    getBalance = async (signer:ethers.providers.JsonRpcSigner):Promise<string> => {
        console.log(
            chain.address
        )
        try {
            const usdtContract = new ethers.Contract(chain.address, chain.abi, signer);
            let usdtBalance = await usdtContract.balanceOf(await signer.getAddress());
            let symbol = await usdtContract.symbol();
            usdtBalance = ethers.utils.formatUnits(usdtBalance, 18);
            console.log(usdtBalance + symbol)
            return (usdtBalance + symbol)
        } catch (error) {
            console.log('getBalance',error)
        }
    }

    accountChangedHandler = async (newAccount) => {
        const address = await newAccount.getAddress();
        return {
            type: WalletType.MetaMask,
            address: address
        };
    }
    connect = async (): Promise<WalletAuth> => {
        let address
        if (this.check() !== true) throw new Error('MetaMask not install');
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        provider.send("eth_requestAccounts", []).then(async res => {
			const signer = provider.getSigner();
			// let mySignature = await signer.signMessage("Some custom message");
            address = await signer.getAddress();
            await this.getBalance(signer);
		}).catch(error => {
			throw new Error(
                'eth_requestAccounts Error'
            );
		});
        return {
            type: WalletType.MetaMask,
            address: address
        };
       /*  try {
            const SignerProvider = await provider.send("eth_requestAccounts", []);
            const signer:ethers.providers.JsonRpcSigner = provider.getSigner();
            const address = await signer.getAddress();
            const balance = await this.getBalance(signer);
            return {
                type: WalletType.MetaMask,
                address: address
            };
        } catch (error) {
            throw new Error(
                'eth_requestAccounts Error'
            );
        } */
    };

    disconnect = async () => {

    };

} 