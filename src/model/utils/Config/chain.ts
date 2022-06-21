import { isLocalEnv, isTestNetEnv } from "./env";

export const bscTestUsdt = {
    address: "0x4F1709a58F80BFD6CC654ba5B14212849FC3284E",
    abi: [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function gimmeSome() external",
        "function balanceOf(address _owner) public view returns (uint256 balance)",
        "function transfer(address _to, uint256 _value) public returns (bool success)",
    ],
};
export const bscUsdt = {
    address: "0x55d398326f99059fF775485246999027B3197955",
    abi: [
        "function name() external view returns (string memory);",
        "function symbol() external view returns (string memory);",
        "function getOwner() external view returns (address);",
        "function gimmeSome() external",
        "function balanceOf(address account) external view returns (uint256);",
        "function transfer(address recipient, uint256 amount) external returns (bool);",
        "function totalSupply() external view returns (uint256);",
        "function decimals() external view returns (uint8);"
    ]
}

export const chain = isLocalEnv() ? bscTestUsdt : bscUsdt;