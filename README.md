A simple script for generating random transactions on blockchain. It takes two accounts and sends a random amount of 0-100 wei back and forth. 

# Usage

To install dependencies:
```
yarn
```

To run call 
```
yarn start
```

with environment variables:

* `PK1` - the private key of first account
* `PK2` - the private key of second account
* `TIMEOUT` - time in seconds between transactions
* `RPC` - rpc address of the Ethereum node (e.g. `http://localhost:8545` or `ws://remotenode.com:8546`)   
