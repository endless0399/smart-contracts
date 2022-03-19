import React from "react";
import { ErrorMessage } from "./util/ErrorMessage";
import { Dapp } from "./Dapp";

import { Loading } from "./util/Loading";

export class Transactions extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedAddress: undefined,
            errorMessage: undefined
        }
    }

    componentDidMount() {
        const savedAddress = localStorage.getItem("selectedAddress");
        if(savedAddress && savedAddress !== "undefined") this.setState({selectedAddress: savedAddress });
    }

    render() {
        // No Wallet Detected
        if (window.ethereum === undefined) {
            return <Dapp />;
        }

        // Connect Wallet
        if (!this.state.selectedAddress) {
            return <Dapp />;
        }
        
        return(
            <div className="container p-3">
                <div className="row mb-3">
                    <h5>Transaction History for: {this.state.selectedAddress}</h5>
                </div>
            </div>
        );
    }

    _dismissError() {
        this.setState({ errorMessage: undefined });
    }
}