/*const {Web3} = require('web3')
const Tx = require('ethereumjs-tx').Transaction
const common = require('ethereumjs-common');
*/ 
const path = require('path')
const express = require("express")
const fs = require("fs") 
const app = express()

app.use(express.static(path.resolve(__dirname, 'static')))
/*
const testnetrpc = "https://data-seed-prebsc-1-s1.binance.org:8545"
const web3 = new Web3(testnetrpc)
const {abi} = require('./contractFiles/CourseContract.json')
*/
app.use(express.static(path.resolve(__dirname, 'static')))

app.get("/current", (req,res) => {
  const addr = readContractAddress()
  if(!addr.length) {
    res.status(404).end()
    return
  }

  res.status(200).send(addr).end();
}) 

function readContractAddress() {
  const addr = fs.readFileSync("contract.txt")
  return addr
}
function writeContractAddress(addr) {
  fs.writeFileSync("contract.txt", addr)
}

app.post('/current', (req,res) => {
  if(req.query.contract) {
    writeContractAddress(req.query.contract)
    res.status(200).end()
  } else {
    res.status(401).end()
  }
})

app.get("/reset", (req, res) => {
  writeContractAddress("")
  res.status(200).end()
})


app.get("/owner", (req,res) => {
  const addr = readOwnerAddress()
  if(!addr.length) {
    res.status(404).end()
    return
  }

  res.status(200).send(addr).end();
}) 

function readOwnerAddress() {
  const addr = fs.readFileSync("owner.txt")
  return addr
}
function writeOwnerAddress(addr) {
  fs.writeFileSync("owner.txt", addr)
}

app.post('/owner', (req,res) => {
  if(req.query.owner) {
    writeOwnerAddress(req.query.owner)
    res.status(200).end()
  } else {
    res.status(401).end()
  }
})


/*
const contractAddress = '0x0BA289AC7FfaD10067BdF09B324D487b57d0459F'

const contract = new web3.eth.Contract(abi, contractAddress)

async function readFromSmartContract()
{
    balanceOfAccount = await contract.methods.readData().call()
    return balanceOfAccount
}
async function writeFromSmartContract(ammount)
{
  // return await sendToTransaction(contract.methods.updateData(a))
  contract.methods.updateData(ammount).send()
}

const myaddress = "0xfb5526e1a56cdc0c0682d531c6a928d1a6a22d5d"
const privateKey = Buffer.from("af959ea4839ae4a691f62f832d8083802467f64bb6306805f0c5d32ffcb0a33d", "hex")
const chain = common.default.forCustomChain(
  'mainnet',{
    name: 'bnb',
    networkId: 97,
    chainId: 97
  },
  'petersburg'
)


function sendToContract(call) {

  return new Promise((resolve, reject) => {
    web3.eth.getTransactionCount(myaddress, (err, txcount) => {
      const txObject = {
        nonce: web3.utils.toHex(txcount),
        gasLimit: web3.utils.toHex(800000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        to: contractAddress,
        from: myaddress,
        data: call.encodeABI()
      }

      const tx = new Tx(txObject, {common: chain})
      tx.sign(privateKey)

      const serialize = tx.serialize()
      const raw = '0x' + serialize.toString('hex')

      web3.eth.sendSignedTransaction(raw, (err, txHash) => {

        if(err) reject(err)
        else resolve(txHash)

      })


    })
  });

}
*/
app.listen(3000)
