<template>
  <label class="email-notification" :class="$style.email_notification">
    <input type="checkbox" checked />
    <svg viewBox="0 0 64 41">
      <path d="M3 2.5L32 21.5L61 2.5" />
    </svg>
    <div class="bell" :class="$style.bell"></div>
  </label>
</template>

<script lang="ts">
export default {
  name: 'VueMail',
};
</script>

<style lang="scss" module>
.email_notification {
  --border: #5e5e5e;
  --bell-default: #8c52ff;
  --bell-active: #8c52ff;
  box-shadow: inset 4px -4px 0 0 var(--border);
  position: relative;
  display: table;
  cursor: pointer;
  transition: transform 0.15s;
  transform: scale(var(--scale, 1)) translateZ(0);
  &:active {
    --scale: 0.96;
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    background: var(--border);
    display: block;
  }
  &:before {
    border-radius: 0 0 3px 0;
    left: 0;
    top: 0;
    height: 4px;
    width: 38px;
  }
  &:after {
    border-radius: 3px 0 0 0;
    right: 0;
    bottom: 0;
    width: 4px;
    height: 24px;
  }
  input {
    display: none;
    &:checked {
      & + svg {
        --svg-animation: tick;
        & + .bell {
          --bell-animation: bell;
          --bell-bottom-animation: bell-bottom;
          --bell-bottom-duration: 0s;
          --bell-bottom-delay: 1.3s;
          --bell-bottom-s: 0.9;
          --bell-top-y: 0px;
          --bell-top-delay: 0.1s;
          --bell-color: var(--bell-active);
        }
      }
    }
  }
  svg {
    display: block;
    width: 64px;
    height: 41px;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 4px;
    stroke-dasharray: 60px;
    stroke-dashoffset: 136px;
    stroke: var(--border);
    animation: var(--svg-animation, none) 0.3s linear;
  }
  .bell {
    position: absolute;
    right: 2px;
    top: 6px;
    height: 4px;
    width: 20px;
    border-radius: 2px;
    background: var(--bell-color, var(--bell-default));
    animation: var(--bell-animation, none) 1.2s linear 0.1s;
    transition: background 0.25s;
    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
    }
    &:before {
      left: 2px;
      bottom: 0;
      width: 16px;
      height: 19px;
      border-radius: 8px 8px 0 0;
      box-shadow: inset 0 0 0 4px var(--bell-color, var(--bell-default));
      clip-path: polygon(
        0 0,
        16px 0,
        16px calc(19px - var(--bell-top-y, 19px)),
        0 calc(19px - var(--bell-top-y, 19px))
      );
      transform: translateY(var(--bell-top-y, 19px));
      transition: transform 0.1s linear var(--bell-top-delay, 0s), clip-path 0.1s linear var(--bell-top-delay, 0s),
        box-shadow 0.25s;
    }
    &:after {
      bottom: -7px;
      left: 7px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--bell-color, var(--bell-default));
      transform: scale(var(--bell-bottom-s, 0));
      transition: transform var(--bell-bottom-duration, 0.2s) ease var(--bell-bottom-delay, 0s), background 0.25s;
      animation: var(--bell-bottom-animation, none) 1.2s linear 0.2s;
    }
  }
}

@keyframes tick {
  25% {
    stroke-dashoffset: 144px;
  }
  50% {
    stroke-dashoffset: 120px;
  }
  100% {
    stroke-dashoffset: 136px;
  }
}

@keyframes bell {
  8%,
  92% {
    transform: translate(6px, -8px) rotate(45deg);
  }
}

@keyframes bell-bottom {
  8%,
  100% {
    transform: scale(0.9);
  }
  14%,
  26%,
  38%,
  50%,
  62%,
  74%,
  86% {
    transform: translateX(2px) scale(0.9);
  }
  20%,
  32%,
  44%,
  56%,
  68%,
  80% {
    transform: translateX(-2px) scale(0.9);
  }
}
</style>
