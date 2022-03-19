import React from "react";
import { ethers } from "ethers";

// Import from files generated from scripts/deploy.js
import TokenArtifact from "../contracts/Token.json";
import contractAddress from "../contracts/contract-address.json";

import { NoWalletDetected } from "./NoWalletDetected"
import { ConnectWallet } from "./ConnectWallet"
import { Loading } from "./util/Loading"
import { Burn } from "./Burn"
import { Transfer } from "./Transfer"

const RINKEBY_NETWORK_ID = '4'

export class Dapp extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            selectedAddress: undefined,
            balance: undefined,
            networkError: undefined,
            tokenData: undefined
        };
        this.state = this.initialState;
    }

    componentWillUnmount() {
        this._stopPollingData();
    }

    componentDidMount() {
        const savedAddress = localStorage.getItem("selectedAddress");
        if(savedAddress && savedAddress !== "undefined") this._initialize(savedAddress);
    }
    
    render() {
        // No Wallet Detected
        if (window.ethereum === undefined) {
            return <NoWalletDetected/>;
        }

        // Connect Wallet
        if (!this.state.selectedAddress) {
            return (
              <ConnectWallet 
                connectWallet={() => this._connectWallet()} 
                networkError={this.state.networkError}
                dismiss={() => this._dismissNetworkError()}
              />
            );
        }

        // Loading
        if (!this.state.tokenData || typeof this.state.balance === 'undefined') {
            return <Loading />;
        }

        return (
            <div className="container p-3">
                <div className="row">
                    <h5>Connected to Wallet : {this.state.selectedAddress}<br/>
                    Your Balance : {this.state.balance.toNumber()} {this.state.tokenData.symbol}</h5>
                </div>
                <div className="row">
                    <Transfer tokenContract = {this._token} selectedAddress = {this.state.selectedAddress} />
                </div>
                <div className="row">
                    <Burn tokenContract = {this._token} selectedAddress = {this.state.selectedAddress} />
                </div>
            </div>
        );
    };
    async _connectWallet(){
        // Get wallet address
        const [ selectedAddress ] = await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Check network
        if(!this._checkNetwork()) {
            return;
        }
        this._initialize(selectedAddress);

        // Reinitialize whenever the user changes account.
        window.ethereum.on("accountsChanged", ([newAddress]) => {
            this._stopPollingData();
            if (newAddress === undefined) {
                return this._resetState();
            }
            this._initialize(newAddress);
        });

        // We reset the dapp state if the network is changed
        window.ethereum.on("chainChanged", ([networkId]) => {
            this._stopPollingData();
            this._resetState();
        });
    }

    _initialize(userAddress) {
        this.setState({
            selectedAddress: userAddress
        });
        this._initializeEthers();
        this._getTokenData();
        this._startPollingData();
        localStorage.setItem("selectedAddress", userAddress);
    }

    // Initialize Smart Contract
    async _initializeEthers() {
        // Initialize ethers by creating a provider using window.ethereum
        this._provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Initialize Contract using provider and token artifact
        this._token = new ethers.Contract(
            contractAddress.Token,
            TokenArtifact.abi,
            this._provider.getSigner(0)
        )
    }

    // Read Smart Contract
    async _getTokenData() {
        const name = await this._token.name();
        const symbol = await this._token.symbol();
        this.setState({ tokenData: { name, symbol } });
    }

    // Poll Data for Updating Balance
    _startPollingData = () => {
        this._pollDataInterval = setInterval(() => this._updateBalance(), 1000);
        this._updateBalance();
    }

    // Stop Polling Balance
    _stopPollingData = () => {
        clearInterval(this._pollDataInterval);
        this._pollDataInterval = undefined;
      }

    async _updateBalance() {
        const balance = await this._token.balanceOf(this.state.selectedAddress);        
        this.setState({ balance });
    }

    _checkNetwork = () => {
        if(window.ethereum.networkVersion === RINKEBY_NETWORK_ID) return true;
        this.setState({
            networkError: 'Please connect metamask to Rinkeby Test Network'
        });
        return false;
    }

    _dismissNetworkError = () => {
        this.setState({ networkError: undefined });
    }
}