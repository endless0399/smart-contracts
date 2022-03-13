import React from "react";
import { ethers } from "ethers";

//Import from files generated from scripts/deploy.js
import TokenArtifact from "../contracts/Token.json";
import contractAddress from "../contracts/contract-address.json";

import { NoWalletDetected } from "./NoWalletDetected"
import { ConnectWallet } from "./ConnectWallet"

export class Dapp extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            selectedAddress: undefined,
            balance: undefined,
            networkError: undefined,
        };
        this.state = this.initialState;
    }
    
    render() {
        // No Wallet Detected
        if (window.ethereum === undefined) {
            return <NoWalletDetected/>;
        }

        if (!this.state.selectedAddress) {
            return (
              <ConnectWallet 
                connectWallet={() => this._connectWallet()} 
                networkError={this.state.networkError}
                dismiss={() => this._dismissNetworkError()}
              />
            );
        }
        return (
            <div>
                <p>Your Balance : {this.state.balance}</p>
                {/* <button onClick={() => this.displayBalance()}>Click to see your balance</button> */}
            </div>
        )
    };
}