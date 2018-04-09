import { createWeb3, DEFAULT_GAS } from './web3_tools'

let taskId
let addresses = []
let counter = 0

const randomTransaction = async (web3) => {
  try {
    const value = Math.floor(Math.random() * 100);
    await web3.eth.sendTransaction({
      from: addresses[counter],
      to: addresses[1-counter],
      value,
      gas: DEFAULT_GAS,
    })
    console.log(`${addresses[counter]} sent ${value} to ${addresses[1-counter]}`);
    counter = 1-counter;
  } catch (err) {
    console.error(err)
  }
}

console.log('Connecting...')
createWeb3().then(async (web3) => {
  console.log('Connected.')
  addresses = [
    web3.eth.accounts.privateKeyToAccount(process.env.PK1).address,
    web3.eth.accounts.privateKeyToAccount(process.env.PK2).address,
  ]
  taskId = setInterval(() => randomTransaction(web3), process.env.TIMEOUT *
    1000)
})

process.on('SIGINT', () => {
  if (taskId) {
    clearInterval(taskId)
  }
  process.exit()
})
