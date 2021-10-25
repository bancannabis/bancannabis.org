import localForage from 'localforage';
import $axios from 'axios';
import { AES, enc } from 'crypto-ts';
import EthWrapper from '@/wrapper/ethWrapper';

export default class WalletModel {
  public balance = 0;
  public address = '';
  public privateKey = '';
  private eth = new EthWrapper();
  private localStorageKey = 'eth-wallet';
  private localPrivateKey = '';

  constructor(user: any, pinCode: string) {
    this.load(user)
      .then((result) => {
        console.log(result);
        if (result === undefined && pinCode !== '') {
          try {
            const account = this.eth.createAccount();
            if (account) {
              this.address = account.address;
              this.privateKey = AES.encrypt(account.privateKey, pinCode).toString();
              this.localPrivateKey = account?.privateKey;
              this.save(user);
            }
          } catch (e) {
            console.log(e);
          }
        } else {
          this.address = result?.address;
          this.privateKey = result?.privateKey;
          this.getAccount();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public async save(user: any) {
    const jwt = localStorage.getItem('auth._token.local');
    const wallet = this.toJSON();
    return await $axios.put(
      process.env.strapiURL + '/users/' + user.id,
      { wallet },
      {
        headers: { Authorization: jwt },
      },
    );
  }

  public async load(user: any) {
    try {
      const jwt = localStorage.getItem('auth._token.local');
      const response: any = await $axios.get(process.env.strapiURL + '/users/' + user.id, {
        headers: { Authorization: jwt },
      });
      console.log(response.data?.wallet);
      if (response.data?.wallet !== undefined) {
        this.address = response.data.wallet.address;
        this.privateKey = response.data.wallet.privateKey;
      }
      if (response.status === 200) {
        return response.data?.wallet;
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async remove() {
    return await localForage.removeItem(this.localStorageKey);
  }

  public async getAccount() {
    this.balance = await this.eth.getBalance(this.address);
    return true;
  }

  public async getGasPrice(gasParams: any) {
    return await this.eth.getGasPrice(gasParams);
  }

  public async sendEth(toAddress: string, amount: number, pinCode: string) {
    const bytes = AES.decrypt(this.privateKey.toString(), pinCode);
    const textPrivateKey = bytes.toString(enc.Utf8);
    return await this.eth.sendEthWithSign(this.address, toAddress, textPrivateKey, amount);
  }

  public toJSON() {
    return {
      address: this.address,
      privateKey: this.privateKey,
    };
  }
}
