import React from "react";

import { Loading } from "./util/Loading";
import { ErrorMessage } from "./util/ErrorMessage";
import { Form, Button } from "react-bootstrap"

export class Transfer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            amount: undefined,
            targetAddress: undefined,
            txHash: undefined,
            transferError: undefined,
            isTxBeingSent: false
        }
        this._token = this.props.tokenContract;
        this.selectedAddress = this.props.selectedAddress;
    }
    
    render() {

        //Transaction Failed
        if(this.state.transferError) {
            return (
                <div className="container">
                    <div className="row justify-content-md-center">
                        <ErrorMessage message={this.state.transferError} dismiss={this._dismissError} />
                    </div>
                </div>
            )
        }

        // Transaction in Process
        if(this.state.isTxBeingSent) {
            return <Loading />
        }
        return (
            <Form onSubmit={this._handleSubmit}>
                <Form.Group className="mb-2" controlId="formBasicText">
                    <Form.Control type="text" placeholder="Enter address" onChange={this._handleAddressChange}/>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicNumber">
                    <Form.Control type="number" placeholder="Enter amount" onChange={this._handleAmountChange}/>
                </Form.Group>
                <div className="text-center mb-3">
                    <Button variant="dark" type="submit">Transfer</Button>
                </div>
            </Form>
        );
    }

    _handleAmountChange = (event) => {
        this.setState({ amount: event.target.value });
    }

    _handleAddressChange = (event) => {
        this.setState({ targetAddress: event.target.value });
    }

    _handleSubmit = (event) => {
        event.preventDefault();
        this._transfer(this.state.targetAddress, this.state.amount);
    }

    async _transfer(to, amount) {
        this.setState({ isTxBeingSent: true });
        try {
            const txHash = await this._token.transfer(to, amount); 
            console.log(txHash);
        } catch(error) {
            if(error.error) error = error.error;
            this.setState({ transferError: error.message });
        } finally {
            this.setState({ isTxBeingSent: false });
        }
    }

    _dismissError = () => {
        this.setState({ transferError: undefined });
    }
}