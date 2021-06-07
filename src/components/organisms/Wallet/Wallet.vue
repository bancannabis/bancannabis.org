<template>
  <div :class="$style.card">
    <v-card-actions :class="$style.card_action">
      <v-card-title>
        <h3>Balance</h3>
        <v-card-text>{{ wallet.balance }} eth</v-card-text>
      </v-card-title>
      <v-spacer />
      <v-btn fab small flat :loading="isLoading" @click="getAccount()"><v-icon>mdi-cached</v-icon></v-btn>
    </v-card-actions>
    <v-card-actions :class="$style.card_action">
      <v-card-title>
        <h3>Address</h3>
        <v-card-text>{{ wallet.address }}</v-card-text>
      </v-card-title>
    </v-card-actions>
    <v-card flat>
      <qriously v-model="qrJson" :size="qrSize" />
    </v-card>
    <v-card-actions :class="$style.card_action">
      <v-card-title>
        <h3>Send</h3>
      </v-card-title>
      <v-text-field
        v-model="toAddr"
        label="To address"
        :counter="42"
        required
        placeholder="0x26d88305D5f16f5763E4bAcB15e106Dd22014F16"
      ></v-text-field>
    </v-card-actions>
    <v-card-actions :class="$style.card_action">
      <v-card-title>
        <h3>Amount</h3>
      </v-card-title>
      <v-text-field v-model="toAmount" label="ETH" type="number" required></v-text-field>
    </v-card-actions>
    <v-card-actions :class="$style.card_action">
      <v-btn color="blue" class="white--text" :loading="isLoading" :disabled="isLoading" @click="tapSend()">
        send
      </v-btn>
      <v-card-title>
        <h3>Result:</h3>
      </v-card-title>
      {{ resultMessage }}
      <ul v-for="(item, index) in validation" :key="index">
        <li v-if="item !== true">{{ item }}</li>
      </ul>
    </v-card-actions>
  </div>
</template>

<script lang="ts">
import WalletModel from '@/model/WalletModel';
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component
export default class Wallet extends Vue {
  private isLoading = false;
  private wallet: WalletModel = new WalletModel();
  private qrSize = 200;
  private toAmount = 0;
  private toAddr = '';
  private qrJson = '';
  private validation: any[] = [];
  private resultMessage = '';
  private rules: any = {
    senderAddrLimit: (value: string) => (value && value.length === 42) || '* Check Wallet lenght',
    senderAddrInput: (value: string) => {
      const pattern = /^[a-zA-Z0-9-]+$/;
      return pattern.test(value) || '* Incorret Address';
    },
    amountLimit: (value: number) => value > 0 || '* Amount limit > 0',
    amountInput: (value: string) => {
      const pattern = /^[0-9.]+$/;
      return (pattern.test(value) && !isNaN(Number(value))) || '* must be a number';
    },
  };

  @Watch('wallet.address')
  private onValueChange(newValue: string, oldValue: string): void {
    console.log(`watch: ${newValue}, ${oldValue}`);
    this.qrJson = 'ethereum:\n' + newValue;
  }

  private mounted() {
    // Vue.prototype.$toast('Welcome to your piggy bank!');
  }

  private async getAccount() {
    this.isLoading = true;
    await this.wallet.getAccount();
    this.validation = [];
    this.isLoading = false;
  }

  private async tapSend() {
    if (this.isValidation() === true) {
      console.log('OK');
      this.resultMessage = '';
      this.isLoading = true;
      try {
        const result = await this.wallet.sendEth(this.toAddr, this.toAmount);
        let message;
        if (result.status) {
          message = `SUCCESS\n${result.transactionHash}`;
          this.resultMessage = result.transactionHash;
        } else {
          message = 'Failed';
          this.resultMessage = message;
        }
        this.wallet.getAccount();
        // Vue.prototype.$toast(message);
      } catch (error) {
        console.error(error);
        this.resultMessage = error;
        // Vue.prototype.$toast(error);
      }
      this.isLoading = false;
    }
    console.log(this.isValidation());
  }

  private isValidation(): boolean {
    this.validation = [];
    this.validation.push(this.rules.senderAddrLimit(this.toAddr));
    this.validation.push(this.rules.senderAddrInput(this.toAddr));
    this.validation.push(this.rules.amountLimit(this.toAmount));
    this.validation.push(this.rules.amountInput(`${this.toAmount}`));
    const error: any[] = this.validation.filter((obj: any) => obj !== true);
    return error.length === 0;
  }
}
</script>
<style lang="scss" module>
@import '~@/assets/design-system';
.card {
  background-color: var(--brand-secondary-bg-color) !important;
  border-radius: 8px !important;
}
.card_action {
  padding: 0 !important;
}
</style>
