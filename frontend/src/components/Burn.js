import React from "react";

import { Form, Button } from "react-bootstrap"
import { Loading } from "./util/Loading"
import { ErrorMessage } from "./util/ErrorMessage";

export class Burn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: undefined,
            burnError: undefined,
            isBurning: false
        }
        this._token = this.props.tokenContract;
        this.selectedAddress = this.props.selectedAddress;
    }

    componentDidCatch(error, info) {
        this._resetState();
    }

    render() {

        // Burn Error
        if(this.state.burnError) {
            return (
                <div className="container">
                    <div className="row justify-content-md-center">
                        <ErrorMessage message={this.state.burnError} dismiss={this._dismissError} />
                    </div>
                </div>
            );
        }

        // Burning
        if(this.state.isBurning) {
            return <Loading />;
        }

        return (
            <Form onSubmit={this._handleSubmit}>
                <Form.Group className="mb-2" controlId="formBasicNumber">
                    <Form.Control type="number" placeholder="Enter amount to burn" onChange={this._handleChange}/>
                </Form.Group>
                <div className="text-center mb-3">
                    <Button variant="dark" type="submit">Burn</Button>
                </div>
            </Form>
        );
    }

    _handleChange = (event) => {
        this.setState({ amount: event.target.value });
    }

    _handleSubmit = (event) => {
        event.preventDefault();
        this._burn(this.state.amount);
    }

    async _burn(amount) {
        this.setState({ isBurning: true });
        try {
            await this._token.burn(amount);
        } catch(error) {
            if(error.error) error = error.error;
            this.setState ({ burnError: "Encountered Error : " + error.message });
        } finally {
            this.setState({ isBurning: false });
        }
    }

    _dismissError = () => {
        this.setState({ burnError: undefined });
    }
}