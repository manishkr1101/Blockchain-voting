import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap'

class ElectionResult extends Component {
    constructor(props) {
        super(props);
        this.state = {candidates: []}
    }
    componentDidMount() {
        this.props.getCandidates()
            .then(res => this.setState({candidates: res}))
    }
    render() {
        return (
            <Container>
            <Row className="justify-content-md-center">
                <Col lg="8">
                    <h1 className="center" style={{margin: "16px 0", textAlign: "center"}}>Election Result</h1>
                    <div className="result-table">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Full Name</th>
                                    <th>Vote Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.candidates.map(cand => {
                                    return (
                                        <tr>
                                            <td>{cand.id}</td>
                                            <td>{cand.name}</td>
                                            <td>{cand.voteCount}</td>
                                        </tr>
                                    )
                                })}
                                
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
            </Container>
        );
    }
}

export default ElectionResult;
