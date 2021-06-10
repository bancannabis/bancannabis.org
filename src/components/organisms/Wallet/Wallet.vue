<template>
  <div :class="$style.wallet">
    <vue-grid-row>
      <vue-grid-column>
        <vue-card :class="$style.card_little">
          <vue-card-header
            image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.bvgS8JySSprQFWN3P56XFwHaHa%26pid%3DApi&f=1"
            title="Balance"
            :subtitle="wallet.balance"
          >
            &nbsp; &nbsp;
            <vue-tooltip tip="Reaload balance">
              <vue-button :loading="isLoading" @click="sync()">
                <vue-icon-reload />
              </vue-button>
            </vue-tooltip>
          </vue-card-header>
          <vue-card-body :class="$style.card_big_body"></vue-card-body>
        </vue-card>
      </vue-grid-column>
      <vue-grid-column>
        <vue-card :class="$style.card_little">
          <vue-card-header
            image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.6KBhMsm3Mny7d_i3L_Wa4gHaHa%26pid%3DApi&f=1"
            title="Address"
            :subtitle="wallet.address"
          >
            &nbsp; &nbsp;
            <vue-tooltip tip="Copy">
              <vue-button @click="copy()">
                <vue-icon-copy />
              </vue-button>
            </vue-tooltip>
          </vue-card-header>
          <vue-card-body :class="$style.card_big_body">
            <qriously v-model="qrJson" :size="qrSize" />
          </vue-card-body>
        </vue-card>
      </vue-grid-column>
    </vue-grid-row>
    <vue-grid-row>
      <vue-grid-column>
        <vue-card :class="$style.card_big">
          <vue-card-header
            image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.inOmdWncw2vzH9hJsXqgGQHaHa%26pid%3DApi&f=1"
            title="Send Info"
          />
          <vue-card-body :class="$style.card_big_body">
            <vue-input
              id="address"
              v-model="toAddr"
              label="To address"
              :counter="42"
              name="address"
              type="string"
              required
              placeholder="0x26d88305D5f16f5763E4bAcB15e106Dd22014F16"
            ></vue-input>
            <vue-input id="amount" v-model="toAmount" label="ETH" type="number" name="amount" required></vue-input>
          </vue-card-body>
          <vue-card-footer :class="$style.card_big_footer">
            <vue-button class="white--text" :loading="isLoading" :disabled="isLoading" @click="tapSend()">
              send
            </vue-button>
            <h3>Result:</h3>
            {{ resultMessage }}
            <ul v-for="(item, index) in validation" :key="index">
              <li v-if="item !== true">{{ item }}</li>
            </ul>
          </vue-card-footer>
        </vue-card>
      </vue-grid-column>
    </vue-grid-row>
  </div>
</template>

<script lang="ts">
import WalletModel from '@/model/WalletModel';
import { Component, Watch, Vue } from 'vue-property-decorator';
import VueTooltip from '@/components/molecules/VueTooltip/VueTooltip.vue';
import VueCard from '@/components/molecules/VueCard/VueCard.vue';
import VueCardHeader from '@/components/molecules/VueCard/VueCardHeader/VueCardHeader.vue';
import VueCardBody from '@/components/molecules/VueCard/VueCardBody/VueCardBody.vue';
import VueText from '@/components/atoms/VueText/VueText.vue';
import VueInput from '@/components/atoms/VueInput/VueInput.vue';
import VueButton from '@/components/atoms/VueButton/VueButton.vue';
import VueQriously from 'vue-qriously';
import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';
import VueIconCopy from '@/components/atoms/icons/VueIconCopy/VueIconCopy.vue';
import VueIconReload from '@/components/atoms/icons/VueIconReload/VueIconReload.vue';
import { addNotification } from '@/components/molecules/VueNotificationStack/utils';
import VueCardFooter from '@/components/molecules/VueCard/VueCardFooter/VueCardFooter.vue';

@Component({
  components: {
    VueTooltip,
    VueGrid,
    VueGridRow,
    VueGridColumn,
    VueCard,
    VueCardHeader,
    VueCardBody,
    VueText,
    VueInput,
    VueButton,
    VueIconCopy,
    VueQriously,
    VueIconReload,
    VueCardFooter,
  },
})
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
    try {
      const account: any = await this.wallet.getAccount();
      return account;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  private sync() {
    this.getAccount().then((res) => {
      console.log(res);
      addNotification({ title: 'Success!', text: 'Reloaded', type: 'success' });
      this.isLoading = false;
    });
  }

  private copy() {
    const copy = this.wallet.address;
    navigator.clipboard.writeText(copy).then(
      function() {
        console.log('Async: Copying to clipboard was successful!');
        addNotification({ title: 'Success!', text: 'Coppied to clipboard.', type: 'success' });
      },
      function(err) {
        console.error('Async: Could not copy text: ', err);
      },
    );
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

.card_big {
  border-radius: 10px !important;
  min-width: auto;
  min-height: 40rem;
  // background-image: url('/images/card_bg_purple.png');
  background-repeat: no-repeat;
  background-size: cover;
  border-color: black !important;
  border: none !important;
  border: 3px solid black !important;
}
.card_big_body {
  word-break: break-all !important;
}
.card_big_footer {
  padding-left: 1.7rem;
}

.card_little {
  border-radius: 10px !important;
  max-width: auto;
  max-height: 40rem;
  border: 3px solid black !important;
  object-fit: contain;
  word-break: break-all !important;
}
</style>
