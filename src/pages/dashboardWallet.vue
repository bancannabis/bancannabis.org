<template>
  <div :class="$style.dashboard">
    <vue-grid with-vertical-space>
      <vue-grid-row>
        <vue-grid-column>
          <vue-breadcrumb
            :items="[
              { label: $t('App.core.dashboard.home'), href: '/dashboard' },
              { label: 'Wallet', href: '/wallet' },
            ]"
          />
        </vue-grid-column>
      </vue-grid-row>
      <vue-grid-row>
        <vue-grid-column>
          <vue-card :class="$style.card_little">
            <vue-card-header
              image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.bvgS8JySSprQFWN3P56XFwHaHa%26pid%3DApi&f=1"
              title="Balance"
              :subtitle="wallet.balance + ' ETH'"
            >
              &nbsp; &nbsp;
              <vue-tooltip tip="Reaload Balance">
                <vue-button :loading="isLoading" @click="getAccount()">
                  <vue-icon-reload />
                </vue-button>
              </vue-tooltip>
              &nbsp; &nbsp; &nbsp; &nbsp; conected to: {{ conection }}
            </vue-card-header>
            <vue-card-body :class="$style.card_big_body"></vue-card-body>
          </vue-card>
        </vue-grid-column>
        <vue-grid-column :class="$style.column_little">
          <vue-card :class="$style.card_little">
            <vue-card-header
              image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.6KBhMsm3Mny7d_i3L_Wa4gHaHa%26pid%3DApi&f=1"
              title="Address"
              :subtitle="wallet.address"
            >
              &nbsp; &nbsp;
              <vue-tooltip tip="Copy to Clipboard">
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
              <a
                v-if="resultMessageUrl"
                :class="$style.a"
                :href="resultMessageUrl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="tx explorer"
              >
                Explore Transaction here.
              </a>
              {{ resultMessage }}
              <ul v-for="(item, index) in validation" :key="index">
                <li v-if="item !== true">{{ item }}</li>
              </ul>
            </vue-card-footer>
          </vue-card>
        </vue-grid-column>
      </vue-grid-row>
    </vue-grid>
  </div>
</template>

<script lang="ts">
/* istanbul ignore file */
import WalletModel from '@/model/WalletModel';
import { defineComponent, ref, useContext, computed, watch } from '@nuxtjs/composition-api';
import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';
import VueBreadcrumb from '@/components/molecules/VueBreadcrumb/VueBreadcrumb.vue';
import VueCard from '@/components/molecules/VueCard/VueCard.vue';
import VueCardHeader from '@/components/molecules/VueCard/VueCardHeader/VueCardHeader.vue';
import VueCardBody from '@/components/molecules/VueCard/VueCardBody/VueCardBody.vue';
import VueIconCopy from '@/components/atoms/icons/VueIconCopy/VueIconCopy.vue';
// import VueIconPlug from '@/components/atoms/icons/VueIconPlug/VueIconPlug.vue';
import VueIconReload from '@/components/atoms/icons/VueIconReload/VueIconReload.vue';
import { addNotification } from '@/components/molecules/VueNotificationStack/utils';
import VueCardFooter from '@/components/molecules/VueCard/VueCardFooter/VueCardFooter.vue';
import VueInput from '@/components/atoms/VueInput/VueInput.vue';
import VueButton from '@/components/atoms/VueButton/VueButton.vue';
import VueTooltip from '@/components/molecules/VueTooltip/VueTooltip.vue';

export default defineComponent({
  name: 'DashboardWallet',
  components: {
    VueBreadcrumb,
    VueGrid,
    VueGridColumn,
    VueCardHeader,
    VueGridRow,
    VueCard,
    VueCardBody,
    VueIconCopy,
    VueIconReload,
    VueCardFooter,
    VueInput,
    VueButton,
    VueTooltip,
    // VueIconPlug,
  },
  middleware: 'auth',
  props: {
    loading: { type: Boolean, default: false },
  },
  setup() {
    const { app } = useContext();
    const pending = ref(false);
    const user = computed(() => app.$auth.user);
    const rules = {
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
    const balance = computed(() => '');
    watch(
      [balance],
      () => {
        // addNotification({ title: 'Success!', text: 'balance changed', type: 'success' });
      },
      { immediate: true },
    );
    return { pending, user, rules, balance };
  },
  data(): any {
    return {
      isLoading: false,
      wallet: new WalletModel(),
      qrSize: 200,
      toAmount: 0,
      toAddr: '',
      qrJson: '',
      validation: [],
      resultMessage: '',
      resultMessageUrl: '',
      conection: '',
    };
  },
  head: {
    title: 'Bancannabis | Wallet',
  },
  mounted() {
    console.log(process.env.ethProviderURL);
    if (process.env.ethProviderURL === 'wss://rinkeby.infura.io/ws/v3/0c90cede2053432cac408091c5d57039') {
      this.conection = 'Testnet';
    } else {
      this.conection = 'Mainnet';
    }
  },
  methods: {
    async getAccount() {
      this.isLoading = true;
      try {
        const account: any = await this.wallet.getAccount();
        if (account) {
          addNotification({ title: 'Success!', text: 'Reloaded', type: 'success' });
          this.isLoading = false;
        }
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    copy() {
      const copy = this.wallet.address;
      navigator.clipboard.writeText(copy).then(
        function() {
          addNotification({ title: 'Success!', text: 'Copyed to clipboard.', type: 'success' });
        },
        function(err) {
          console.error('Async: Could not copy text: ', err);
        },
      );
    },
    async tapSend() {
      if (this.isValidation() === true) {
        this.resultMessage = '';
        this.resultMessageUrl = '';
        this.isLoading = true;
        if (this.toAmount < this.wallet.balance) {
          try {
            const result = await this.wallet.sendEth(this.toAddr, this.toAmount);
            let message;
            if (result.status) {
              message = `SUCCESS\n${result.transactionHash}`;
              const url = 'https://blockexplorer.one/eth/rinkeby/tx/';
              this.resultMessageUrl = url + result.transactionHash;
              this.isLoading = false;
            } else {
              message = 'Failed';
              this.resultMessage = message;
            }
            this.wallet.getAccount();
          } catch (error) {
            addNotification({ title: 'Error!', text: error, type: 'error' });
            this.resultMessage = error;
            this.isLoading = false;
          }
        } else {
          addNotification({ title: 'Warning!', text: 'Insuficent balance.', type: 'warning' });
          this.isLoading = false;
        }
      }
    },
    isValidation(): boolean {
      this.validation = [];
      this.validation.push(this.rules.senderAddrLimit(this.toAddr));
      this.validation.push(this.rules.senderAddrInput(this.toAddr));
      this.validation.push(this.rules.amountLimit(this.toAmount));
      this.validation.push(this.rules.amountInput(`${this.toAmount}`));
      const error: any[] = this.validation.filter((obj: any) => obj !== true);
      return error.length === 0;
    },
  },
});
</script>

<style lang="scss" module>
@import '~@/assets/design-system';

.dashboard {
  padding-top: $nav-bar-height;
}

.card {
  border-radius: 10px !important;
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
  word-break: break-all !important;
}
.card_big_body {
  word-break: break-all !important;
  &.card_headline {
    margin-top: 7rem;
  }
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

.wallet {
  max-height: 40rem !important;
  // max-width: 40rem !important;
}

.card_row {
  padding: 2rem 2rem 1rem 4rem;
  display: block;
}

.column {
  margin-left: auto;
  margin-right: auto;
  width: 15em;
}

@media only screen and (min-width: 1000px) {
  .column_little {
    padding-left: 2rem !important;
  }
}

.ul {
  padding-top: 2rem;
  padding-left: 8rem;
  list-style-type: circle;
}
</style>
