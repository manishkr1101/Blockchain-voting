import React from 'react';
import {BrowserRouter as Router,
  Switch, 
  Route} from 'react-router-dom';

import './App.css';
import Web3 from 'web3';
import ElectionAbi from './contracts/Election.json'

import Nabvar from './components/Navbar'
import Home from './components/Home'
import ElectionResult from './components/ElectionResult'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAccount: '0x',
      loading: true,
      Election: {}
    }
  }
  componentDidMount() {
    this.setState({loading: true});
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
    
    const networkId = await web3.eth.net.getId();
    const networkData = ElectionAbi.networks[networkId];

    if(networkData) {
      const electionContract = new web3.eth.Contract(ElectionAbi.abi, networkData.address);
      this.setState({
        loading: false, 
        currentAccount: account,
        Election: electionContract
      })
    } else {
      alert('the smart contracts not deplo yed to the current network')
    }
  }
  updateState(state) {
    this.setState({
      ...this.state,
      ...state
    });
  }
  getCandidates = async () => {
    const Election = this.state.Election;
    const candidateCount = await Election.methods.candidatesCount().call();
    
    let candidates = [];
    for(let i=1; i<=candidateCount; i++) {
        candidates.push(await Election.methods.candidates(i).call());
    }
    return candidates;
  }
  render() {
    
    if(this.state.loading) {
      return <div>Loading...</div>
    }

    return (
      <Router>
        <div>
          <Nabvar account={this.state.currentAccount}/>
        </div>
        <Switch>
          <Route path="/result">
            <ElectionResult getCandidates={this.getCandidates} />
          </Route>
          
          <Route path="/">
            <Home account={this.state.currentAccount} electionSm={this.state.Election} />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
