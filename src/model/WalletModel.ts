import localForage from 'localforage';
import EthWrapper from '@/wrapper/ethWrapper';
import $axios from 'axios';

export default class WalletModel {
  public balance = 0;
  public address = '';
  public privateKey = '';

  private eth = new EthWrapper();
  private localStorageKey = 'eth-wallet';

  constructor(user: any) {
    console.log(user);
    this.load(user)
      .then((result) => {
        if (result === null) {
          const account = this.eth.createAccount();
          this.address = account.address;
          this.privateKey = account.privateKey;
          this.save(user);
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

  public async save(user: any) {
    const response = await $axios.get(process.env.strapiURL + '/users/' + user._id);
    console.log(response);
    return await localForage.setItem(this.localStorageKey, this.toJSON());
  }

  public async load(user: any) {
    const response = await $axios.get(process.env.strapiURL + '/users/' + user._id);
    console.log(response);
    const result: any = await localForage.getItem(this.localStorageKey);
    if (result !== null) {
      this.address = result.address;
      this.privateKey = result.privateKey;
    }
    return result;
  }

  /*  public async save(user:any) {
    return await localForage.setItem(this.localStorageKey, this.toJSON());
  }

  public async load() {
    const result: any = await localForage.getItem(this.localStorageKey);
    if (result !== null) {
      this.address = result.address;
      this.privateKey = result.privateKey;
    }
    return result;
  } */

  public async remove() {
    return await localForage.removeItem(this.localStorageKey);
  }

  public async getAccount() {
    this.balance = await this.eth.getBalance(this.address);
    return true;
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
