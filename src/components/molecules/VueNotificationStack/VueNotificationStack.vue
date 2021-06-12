<template>
  <div :class="$style.vueNotificationStack">
    <transition-group name="list" tag="div">
      <div v-for="n in orderedNotifications" :key="n.id" :class="[$style.notification, $style[n.type]]">
        <div :class="$style.title">
          <b>{{ n.title }}</b>
        </div>
        <div :class="$style.text">
          {{ n.text }}
        </div>
        <div :class="$style.close" @click="removeNotification(n)" />
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from '@vue/composition-api';
import { getGUID } from '@vuesion/utils/dist/randomGenerator';
import { EventBus } from '@/services/EventBus';
import { INotification } from './INotification';

export default defineComponent({
  name: 'VueNotificationStack',
  props: {
    duration: { type: Number, default: 2000 },
  },
  setup(props) {
    const notifications = ref<INotification[]>([]);
    const orderedNotifications = computed<INotification[]>(() => notifications.value.slice(0).reverse());
    const removeNotification = (n: INotification) => {
      notifications.value = notifications.value.filter((notification: INotification) => notification.id !== n.id);
    };
    const addNotification = (n: INotification) => {
      n.id = getGUID();
      n.type = n.type || 'default';

      notifications.value.push(n);

      setTimeout(() => removeNotification(n), props.duration);
    };

    onMounted(() => {
      EventBus.$on('notification.add', addNotification);
    });

    return {
      orderedNotifications,
      removeNotification,
    };
  },
});
</script>

<style lang="scss" module>
@import '~@/assets/design-system';

.vueNotificationStack {
  position: fixed;
  top: $nav-bar-height;
  left: 0;
  right: 0;
  min-width: 2em;
  z-index: $notifications-index;
  padding: $notifications-padding;

  :global {
    .list-move {
      transition: all 500ms ease-in-out;
    }

    .list-enter {
      opacity: 0;
      transform: translateY(-100%);
    }
    .list-enter-active {
      transition: all 500ms ease-in-out;
    }
    .list-enter-to {
      opacity: 1;
      transform: translateY(0);
    }

    .list-leave {
      opacity: 1;
      transform: translateY(0);
    }
    .list-leave-active {
      transition: all 500ms ease-in-out;
    }
    .list-leave-to {
      opacity: 0;
      transform: translateY(100%);
    }
  }

  @include mediaMin(tabletLandscape) {
    left: initial;
    max-width: $notifications-max-width;
  }
}

.notification {
  padding: $notification-padding;
  position: relative;
  //box-shadow: $notification-shadow;
  //box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
  //rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

.default {
  background-color: $notification-default-bg;
  border: $notification-default-border;
  border-radius: 5px;
}

.success {
  background-color: #53c1b1;
  border: $notification-default-border;
  border-radius: 5px;
}

.error {
  background-color: #a88699;
  border: $notification-default-border;
  border-radius: 5px;
}

.warning {
  background-color: #dfe226;
  border: $notification-default-border;
  border-radius: 5px;
}

.title {
  font-weight: 800;
  padding-right: $space-12;
  color: $brand-high-emphasis-text-color;
}

.text {
  max-height: $notification-max-height;
  padding-right: $space-12;
  overflow-y: hidden;
  color: $brand-high-emphasis-text-color;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: $notification-close-width;
  background-color: transparent;
  cursor: pointer;
  &:before,
  &:after {
    transition: all 0.25s ease-in-out;
    position: absolute;
    background-color: $notification-close-cross-color;
    width: 8rem;
    height: $space-20;
    right: $space-20;
    top: 50%;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
}
</style>
