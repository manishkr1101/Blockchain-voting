# Building process

- Configure truffle and write contracts.
- Create a react app

## Requirements
- Truffle v5.0.2 (this project)
- Ganache
- Metamask
- IDE (VS Code)

## Configure truffle and write contracts
- run the command `truffle init` to get a boilerplate for smart contract.
- set correct version of solidity compiler in `truffle-config.json` or some other configuration.
- Write your smart contract in `contracts` folder.
- create a file `2_deploy_contracts.js` under `migrations` folder and use this to deploy several contracts you have written.
- to compile the contracts execute `truffle compile`
    - It will generate bytecode and saves it in forms of json under `build` folder.
- Contract setup is complete.

> use `sudo` before `truffle` in linux.

- Add `contracts_build_directory: path.join(__dirname, "client/src/contracts")` in `truffle-config.js` file so that it becomes usable with react.

