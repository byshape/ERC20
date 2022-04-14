# Description
This is a standard ERC20 smart contract. Its main features:
* It receives name, symbol, digits, initial supply and address of tokens owner to constructor.
* It shows the account's balance.
* It transfers tokens to an account.
* It approves tokens to an account.
* It transfers approved tokens to an account.
* It shows an allowances.
* It mints tokens by contract owner to an account.
* It burns tokens from an account.

## Launch instructions
Run this command in terminal
```
npm install --save-dev hardhat
```
When installation process is finished, create `.env` file and add `API_URL` and `PRIVATE_KEY` variables there.

Run:
* `npx hardhat test` to run tests
* `npx hardhat coverage` to get coverage report
* `npx hardhat run --network ropsten scripts/deploy.ts` to deploy smart contract to the ropsten testnet
* `npx hardhat help` to get the list of available tasks, including tasks for interaction with deployed contract: balances, allowances, transfer, approve, transferFrom.
