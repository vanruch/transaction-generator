import Web3 from 'web3';

export const DEFAULT_GAS = 4700000;

function isValidRPCAddress(rpc) {
  return /^((?:http)|(?:ws)):\/\//g.test(rpc);
}

export async function createWeb3() {
  const web3 = new Web3();

  const rpc = process.env.RPC;

  // TODO rewrite after ganache is fixed https://github.com/trufflesuite/ganache-core/pull/74
  const account1 = web3.eth.accounts.privateKeyToAccount(process.env.PK1);
  const account2 = web3.eth.accounts.privateKeyToAccount(process.env.PK2);
  web3.eth.defaultAccount = account1.address;
  if (isValidRPCAddress(rpc)) {
    web3.setProvider(rpc);
    web3.eth.accounts.wallet.add(account1);
    web3.eth.accounts.wallet.add(account2);
  } else {
    throw new Error('A configuration value for web3 rpc server is missing');
  }

  return web3;
}
