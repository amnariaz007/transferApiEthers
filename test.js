const { ethers } = require("ethers");

const INFURA_ID = 'M3_iXU0ue6L9IvtybWp6T1omocT_MQlO'
const provider = new ethers.providers.JsonRpcProvider(`https://eth-goerli.g.alchemy.com/v2/${INFURA_ID}`)

const account1 = '0x696697ac9272d53E700336784619AF7D07a32569' // Your account address 1
const account2 = '0x3E2e6a6570b37fE80B45C70c39D1404aA1011557' // Your account address 2

const privateKey1 = '' // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
];

const address = '0x4584047851e05bA84C341A4ea7C255783EB3595c'
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const balance = await contract.balanceOf(account1)

    console.log(`\nReading from ${address}\n`)
    console.log(`Balance of sender: ${balance}\n`)

    const contractWithWallet = contract.connect(wallet)

    const tx = await contractWithWallet.transfer(account2, '100000000000000')
    await tx.wait()

    console.log(tx)

    const balanceOfSender = await contract.balanceOf(account1)
    const balanceOfReciever = await contract.balanceOf(account2)

    console.log(`\nBalance of sender: ${balanceOfSender}`)
    console.log(`Balance of reciever: ${balanceOfReciever}\n`)
}

main()