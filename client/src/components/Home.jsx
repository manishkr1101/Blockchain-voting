import React, { Component } from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            candidateId: null,
            candidates: []
        }
        
    }
    componentDidMount() {
        this.getCandidates()
            .then(cand => {
                this.setState({candidates: cand})
                console.log(cand)
            })
    }
    getCandidates = async () => {
        const Election = this.props.electionSm;
        const candidateCount = await Election.methods.candidatesCount().call();
        
        let candidates = [];
        for(let i=1; i<=candidateCount; i++) {
            candidates.push(await Election.methods.candidates(i).call());
        }
        return candidates;
    }
    handleChange = (e) => {
        const {value} = e.target;
        this.setState({candidateId: value})
    }
    submitForm = (e) => {
        e.preventDefault();
        if(this.state.candidateId) {
            const Election = this.props.electionSm;
            const candidateId = (this.state.candidateId);
            // invoke vote method in smart contract
            Election.methods.vote(candidateId).send({
                from: this.props.account
            })
            .then(() => {
                alert('voted successfully')
                window.location.reload();
            })
            .catch(err => console.log(err))
            
        }
        else {
            alert('Please select a candidate')
        }
    }
    render() {
        
        return (
            <Container style={{paddingTop: "30px"}}>
                <Row className="justify-content-md-center">
                    <Col lg="8">
                        <p>Hi {this.props.account}</p>
                        <h1>Choose your candidate</h1>
                        <Form>
                            <div style={{margin: "16px 0"}}>
                                
                                {this.state.candidates.map(cand => {
                                    return (
                                        <Form.Check
                                            key={cand.id}
                                            type="radio"
                                            label={`${cand.name} [${cand.id}]`}
                                            name = "candidate"
                                            value={cand.id}
                                            onChange={this.handleChange}
                                        />
                                    )
                                })}
                            
                                
                            </div>
                            
                            <Button variant="success" style={{width: "100%"}} onClick={this.submitForm}>Elect Selected</Button>
                        </Form>
                        
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col lg="8">

                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;
