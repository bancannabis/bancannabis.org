import Web3 from 'web3';
import Tx from 'ethereumjs-tx';

declare const Buffer: any;

export default class EthWrapper {
  public host: string = process.env.ethProviderURL || 'wss://rinkeby.infura.io/ws/v3/0c90cede2053432cac408091c5d57039';

  public web3: any;
  constructor() {
    this.web3 = new Web3(this.host);
  }

  public createAccount(): any {
    const account = this.web3.eth.accounts.create();
    return account;
  }

  public getAccountFromPrivateKey(privateKey: string): any {
    const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    // console.log(account);
    return account;
  }

  public async getBalance(address: string) {
    const balance = await this.web3.eth.getBalance(address);
    // console.log(balance);
    return this.web3.utils.fromWei(balance, 'ether');
  }

  public async getGasPrice(gasParams: any) {
    return await this.web3.eth.estimateGas(gasParams);
  }

  public async sendEthWithSign(fromAddress: string, toAddress: string, privateKey: string, amount: number) {
    const ether = this.web3.utils.toWei(`${amount}`, 'ether');
    // console.log(ether);
    const gasParams = {
      from: fromAddress,
      to: toAddress,
      value: ether,
    };
    const gasLimit = await this.web3.eth.estimateGas(gasParams);
    const gasPrice = await this.web3.eth.getGasPrice();
    const count = await this.web3.eth.getTransactionCount(fromAddress);
    const params = {
      nonce: count,
      gasPrice: this.web3.utils.toHex(gasPrice),
      gasLimit: this.web3.utils.toHex(gasLimit),
      to: toAddress,
      value: this.web3.utils.toHex(ether),
    };
    const tx = new Tx(params);
    if (privateKey.slice(0, 2) === '0x') {
      privateKey = privateKey.slice(2);
    }
    // console.log('privateKey', privateKey);
    tx.sign(Buffer.from(privateKey, 'hex'));
    const rawTx = '0x' + tx.serialize().toString('hex');
    const result = await this.web3.eth.sendSignedTransaction(rawTx);
    console.log(result);
    return result;
  }

  public async sendEth(fromAddress: string, toAddress: string, amount: number) {
    const ether = this.web3.utils.toWei(`${amount}`, 'ether');
    // console.log(ether);
    const params = {
      from: fromAddress,
      to: toAddress,
      value: ether,
    };
    const result = await this.web3.eth.sendTransaction(params);
    // console.log(result);
    return result;
  }
}
