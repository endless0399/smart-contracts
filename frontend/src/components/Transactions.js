import React from "react";
import { ethers } from "ethers";
import { ErrorMessage } from "./util/ErrorMessage";
import { NoWalletDetected } from "./util/NoWalletDetected";

import TokenArtifact from "../contracts/Token.json";
import contractAddress from "../contracts/contract-address.json";

export class Transactions extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedAddress: undefined,
            errorMessage: undefined,
            transactions: undefined,
            tokenData: undefined
        }
    }

    componentDidMount() {
        const savedAddress = localStorage.getItem("selectedAddress");
        if(savedAddress && savedAddress !== "undefined") {
            this._initialize(savedAddress);
        }
    }

    render() {
        // No Wallet Detected
        if (window.ethereum === undefined) {
            return <NoWalletDetected />
        }

        // Connect Wallet
        if (!this.state.selectedAddress) {
            return <ErrorMessage message={"Please connect an account first"}/>;
        }

        this._detectChanges();
        
        return(
            <div>
                <div className="container p-3 mr3">
                    <div className="row mb-3">
                        <h5>Transaction History for: {this.state.selectedAddress}</h5>
                    </div>
                    <div className="row mb-3">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Address</th>
                                    <th>Action Type</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.transactions && this.state.transactions.map((txn, id) =>
                                    <tr key={id}>
                                        <td>{txn.otherAddress}</td>
                                        <td>{txn.action}</td>
                                        <td>{txn.value.toString()} {this.state.tokenData && this.state.tokenData.symbol}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    async _detectChanges() {
        // Reinitialize whenever the user changes account.
        window.ethereum.on("accountsChanged", ([newAddress]) => {
            if (newAddress === undefined) {
                return this._resetState();
            }
            this._initialize(newAddress);
        });

        // We reset the dapp state if the network is changed
        window.ethereum.on("chainChanged", ([networkId]) => {
            this._resetState();
        });
    }

    _initialize = (selectedAddress) => {
        this.setState({ selectedAddress: selectedAddress });
        this._initContract(selectedAddress);
        this._loadTokenData();
        this._loadTransactions(selectedAddress);
        localStorage.setItem("selectedAddress", selectedAddress);
    }

    async _initContract(selectedAddress) {
        this._provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Initialize Contract using provider and token artifact
        this._token = new ethers.Contract(
            contractAddress.Token,
            TokenArtifact.abi,
            this._provider.getSigner(0)
        )
    }

    async _loadTokenData() {
        const name = await this._token.name();
        const symbol = await this._token.symbol();
        this.setState({ tokenData: { name, symbol } });
    }

    async _loadTransactions(selectedAddress) {
        const Txns = await this._token.getTransactions(selectedAddress);
        const revTxns = [ ...Txns ].reverse();
        this.setState({ transactions: revTxns });
    }

    _dismissError() {
        this.setState({ errorMessage: undefined });
    }
}