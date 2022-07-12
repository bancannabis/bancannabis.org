<template>
  <div id="divContent">
    <iframe
      src="https://bcatoken.com/terminal.html?wallet={wallet}&email={email}&token={token}&view=4&t=1"
      style="position:absolute; top:0px"
      width="100%"
      height="100%"
    />
  </div>
</template>

<script lang="ts">
/* istanbul ignore file */
// import { ref } from '@nuxtjs/composition-api';
import { useContext } from '@nuxtjs/composition-api';

export default {
  name: 'buyminigod',
  auth: false,
  setup() {
    const { store } = useContext();
    store.dispatch('app/changeFooter', true);
  },
};
</script>
<style lang="scss" module>
@import '~@/assets/design-system';

.index {
  p {
    text-align: justify;
    text-justify: inter-word;
  }
}
.a {
  color: #9cbe34;
  font-weight: $footer-link-font-weight;

  &:hover {
    color: #291e59;
  }
}

#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}

/* Add some content at the bottom of the video/page */
.content {
  position: fixed;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: 100%;
  padding: 20px;
}

/* Style the button used to pause/play the video */
#myBtn {
  width: 200px;
  font-size: 18px;
  padding: 10px;
  border: none;
  background: #000;
  color: #fff;
  cursor: pointer;
}

#myBtn:hover {
  background: #ddd;
  color: black;
}
</style>
