import { isMainNetEnv } from "./env";
export const BSCTestNetWork = {
    chainId: '0x61',
    chainName: 'usdt-BSC-Test-Network',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    // rpcUrls: ["https://data-seed-prebsc-2-s3.binance.org:8545/"],
     
    blockExplorerUrls: ["https://testnet.bscscan.com"]
}

export const BSCMainNetWork = {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18
    },
    rpcUrls: ['https://bsc-dataseed1.ninicoin.io'],
    blockExplorerUrls: ['https://bscscan.com/']
}

export const LuckContract = "0x29B9566558b21151872F629aEbD1719eDDd829e3";

export const bscTestUsdt = "0xA31659971F30bfbc14FF6bb21394c8c87075A590"

export const bscUsdt = "0x55d398326f99059fF775485246999027B3197955"

export const BscChain = isMainNetEnv() ? bscUsdt : bscTestUsdt;

export const BscNewWork = isMainNetEnv() ? BSCMainNetWork : BSCTestNetWork;