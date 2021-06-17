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
              &nbsp; &nbsp; &nbsp; &nbsp;
              <vue-tooltip :tip="`${$t('App.core.wallet.card-conection')}` + conection + ' Ethereum'">
                <vue-icon-conection />
              </vue-tooltip>
              &nbsp; &nbsp;
              <vue-tooltip tip="Reaload Balance">
                <vue-button :loading="isLoading" @click="getAccount()">
                  <vue-icon-reload />
                </vue-button>
              </vue-tooltip>
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
            <vue-card-body :class="$style.card_big_body"></vue-card-body>
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
              <vue-input
                id="pincode"
                v-model="pinCode"
                name="pincode"
                label="Pincode"
                type="text"
                placeholder=""
                validation="required|max:4|min:4"
                :error-message="'4 digit pin'"
              />
              <vue-num-keyboard :self-value="pinCode" @pressed="pinCode = $event" />
            </vue-card-body>
            <vue-card-footer :class="$style.card_big_footer">
              <vue-button color="primary" :loading="isLoading" :disabled="isLoading" @click="tapSend()">
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
    <vue-modal :show="showWalletModal" :out-side-click="false" @close="showWalletModal = false">
      <validation-observer v-slot="{ invalid }">
        <vue-card :class="$style.card_modal">
          <vue-card-header
            image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.k8dJuoFpyilC_lDKzEoxYwHaHa%26pid%3DApi&f=1"
            title="Wallet Creation Process"
          />
          <vue-card-body :class="$style.card_modal_body">
            Hello! Before start using your Cripto wallet you need to set your, sign pin code.
            <br /><br />
            <form>
              <vue-input
                id="pincode"
                v-model="pinCode"
                name="pincode"
                label="Pincode"
                type="text"
                placeholder=""
                validation="required|max:4|min:4"
                :error-message="'4 digit pin'"
              />
            </form>
            <vue-num-keyboard :self-value="pinCode" @pressed="pinCode = $event" />
          </vue-card-body>
          <vue-card-footer :class="$style.card_modal_footer">
            <vue-button color="primary" :loading="isLoadingSet" :disabled="invalid" @click="setPinCode()">
              Set pin code
            </vue-button>
            {{ resultMessage }}
          </vue-card-footer>
        </vue-card>
      </validation-observer>
    </vue-modal>
  </div>
</template>

<script lang="ts">
/* istanbul ignore file */
import WalletModel from '@/model/WalletModel';
import { ValidationObserver } from 'vee-validate';
import { defineComponent, ref, useContext, computed, watch } from '@nuxtjs/composition-api';
import VueGrid from '@/components/organisms/VueGrid/VueGrid.vue';
import VueGridRow from '@/components/organisms/VueGrid/VueGridRow/VueGridRow.vue';
import VueGridColumn from '@/components/organisms/VueGrid/VueGridColumn/VueGridColumn.vue';
import VueBreadcrumb from '@/components/molecules/VueBreadcrumb/VueBreadcrumb.vue';
import VueCard from '@/components/molecules/VueCard/VueCard.vue';
import VueCardHeader from '@/components/molecules/VueCard/VueCardHeader/VueCardHeader.vue';
import VueCardBody from '@/components/molecules/VueCard/VueCardBody/VueCardBody.vue';
import VueIconCopy from '@/components/atoms/icons/VueIconCopy/VueIconCopy.vue';
import VueIconConection from '@/components/atoms/icons/VueIconConection/VueIconConection.vue';
import VueIconReload from '@/components/atoms/icons/VueIconReload/VueIconReload.vue';
import { addNotification } from '@/components/molecules/VueNotificationStack/utils';
import VueCardFooter from '@/components/molecules/VueCard/VueCardFooter/VueCardFooter.vue';
import VueInput from '@/components/atoms/VueInput/VueInput.vue';
import VueButton from '@/components/atoms/VueButton/VueButton.vue';
import VueTooltip from '@/components/molecules/VueTooltip/VueTooltip.vue';
import VueNumKeyboard from '@/components/organisms/VueNumKeyboard/VueNumKeyboard.vue';
import VueModal from '@/components/molecules/VueModal/VueModal.vue';

export default defineComponent({
  name: 'DashboardWallet',
  components: {
    ValidationObserver,
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
    VueIconConection,
    VueNumKeyboard,
    VueModal,
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
      inputPinCode: (value: string) => value.length === 4 || '* Pin Code must be a 4 digit code',
    };
    const balance = computed(() => '');
    watch(
      [balance],
      () => {
        // addNotification({ title: 'Success!', text: 'balance changed', type: 'success' });
      },
      { immediate: true },
    );
    const showWalletModal = ref(false);
    return { pending, user, rules, balance, showWalletModal };
  },
  data(): any {
    return {
      isLoading: false,
      isLoadingSet: false,
      qrSize: 200,
      toAmount: 0,
      toAddr: '',
      qrJson: '',
      validation: [],
      resultMessage: '',
      resultMessageUrl: '',
      conection: '',
      wallet: '',
      pinCode: '',
      hide: '',
    };
  },
  head: {
    title: 'Bancannabis | Wallet',
  },
  mounted() {
    if (this.user?.wallet?.address) {
      this.showWalletModal = false;
      this.wallet = new WalletModel(this.user, '');
    } else {
      this.showWalletModal = true;
    }
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
          // addNotification({ title: 'Success!', text: 'Reloaded', type: 'success' });
          this.isLoading = false;
        }
      } catch (e) {
        // console.log(e);
        addNotification({ title: 'ERROR!', text: 'Please try again', type: 'error' });
        throw e;
      }
    },
    setPinCode() {
      this.isLoadingSet = true;
      try {
        this.wallet = new WalletModel(this.user, this.pinCode);
        if (this.wallet !== '') {
          addNotification({ title: 'Success!', text: 'Wallet created', type: 'success' });
          this.isLoadingSet = false;
          this.showWalletModal = false;
          this.pinCode = '';
          // console.log(this.wallet);
        }
      } catch (e) {
        // console.log(e);
        addNotification({ title: 'ERROR!', text: 'Please try again', type: 'error' });
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
          addNotification({ title: 'ERROR!', text: 'Please try again. ' + err, type: 'error' });
          // console.error('Async: Could not copy text: ', err);
        },
      );
    },
    async tapSend() {
      if (this.isValidation() === true) {
        this.resultMessage = '';
        this.resultMessageUrl = '';
        this.isLoading = true;
        if (this.toAmount <= this.wallet.balance) {
          try {
            const result = await this.wallet.sendEth(this.toAddr, this.toAmount, this.pinCode);
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
      this.validation.push(this.rules.inputPinCode(`${this.pinCode}`));
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

.card_modal {
  border-radius: 10px !important;
  border-color: black !important;
  border: none !important;
  // border: 3px solid black !important;
  word-break: break-all !important;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}
.card_modal_body {
  word-break: break-all !important;
  &.card_headline {
    margin-top: 7rem;
  }
}
.card_modal_footer {
  padding-left: 1.7rem;
  display: flex;
  justify-content: center;
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
  // border: 3px solid black !important;
  word-break: break-all !important;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
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
  // border: 3px solid black !important;
  object-fit: contain;
  word-break: break-all !important;
  border: none !important;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
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

.is_blurred {
  filter: blur(2px);
  -webkit-filter: blur(2px);
  opacity: 0.5;
  position: relative;
  cursor: not-allowed;
  pointer-events: all;
}
</style>
