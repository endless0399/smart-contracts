import React from "react";

export class About extends React.Component {
    render() {
        return (
            <div className="container p-3">
                <div className="row mb-3">
                    <h5>Code</h5>
                    <a href="https://github.com/endless0399/smart-contracts">https://github.com/endless0399/smart-contracts</a>
                </div>
                <div className="row">
                    <h5>Author</h5>
                    <p>Name: Siddharth Sahay<br/>
                    Email: sahaysiddharth003@gmail.com<br/>
                    Country: India</p>
                </div>
            </div>
        );
    }
}
