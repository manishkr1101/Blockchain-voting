import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap'
import './App.css';
import Web3 from 'web3';
import ElectionAbi from './contracts/Election.json'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAccount: ''
    }
  }
  componentDidMount() {
    this.loadWeb3()
    .then(() => this.loadBlockchainData()); 
  }
  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert("Non Ethereum browser detected")
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    this.setState({...this.state, currentAccount: account})
    const networkId = await web3.eth.net.getId();
    const networkData = ElectionAbi.networks[networkId];

    if(networkData) {
      const election = new web3.eth.Contract(ElectionAbi.abi, networkData.address);
      console.log(election);
    } else {
      alert('the smart contracts not deployed to the current network')
    }
  }
  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Election Dapp</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Nav.Link href="#">{this.state.currentAccount}</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }
}

export default App;
