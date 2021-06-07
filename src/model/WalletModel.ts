import localForage from 'localforage';
import EthWrapper from '@/wrapper/ethWrapper';

export default class WalletModel {
  public balance = 0;
  public address = '';
  public privateKey = '';

  private eth = new EthWrapper();
  private localStorageKey = 'eth-wallet';

  constructor() {
    this.load()
      .then((result) => {
        if (result === null) {
          const account = this.eth.createAccount();
          this.address = account.address;
          this.privateKey = account.privateKey;
          this.save();
        } else {
          this.address = result.address;
          this.privateKey = result.privateKey;
          this.getAccount();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public async save() {
    return await localForage.setItem(this.localStorageKey, this.toJSON());
  }

  public async load() {
    const result: any = await localForage.getItem(this.localStorageKey);
    if (result !== null) {
      this.address = result.address;
      this.privateKey = result.privateKey;
    }
    return result;
  }

  public async remove() {
    return await localForage.removeItem(this.localStorageKey);
  }

  public async getAccount() {
    this.balance = await this.eth.getBalance(this.address);
  }

  public async sendEth(toAddress: string, amount: number) {
    return await this.eth.sendEthWithSign(this.address, toAddress, this.privateKey, amount);
  }

  public toJSON() {
    return {
      address: this.address,
      privateKey: this.privateKey,
    };
  }
}
