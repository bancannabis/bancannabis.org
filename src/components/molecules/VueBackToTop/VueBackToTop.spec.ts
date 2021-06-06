import Vue from 'vue';
import { fireEvent, render, RenderResult } from '@testing-library/vue';
import { triggerWindow } from '@/test/test-utils';
import VueBackToTop from './VueBackToTop.vue';

describe('VueBackToTop.vue', () => {
  let harness: RenderResult;

  beforeEach(() => {
    (window as any).innerHeight = 100;
    (window as any).pageYOffset = 400;

    harness = render(VueBackToTop, {
      stubs: ['nuxt-link'],
    });
  });

  test('renders component', () => {
    const { html } = harness;

    expect(html()).toMatch('<div data-testid="back-to-top" class="vueBackToTop">');
  });

  test('it should scroll to top on click', async () => {
    const { getByTestId } = harness;
    window.scrollTo = jest.fn();

    expect(window.scrollTo).not.toHaveBeenCalled();

    await fireEvent.click(getByTestId('back-to-top'));

    expect(window.scrollTo).toHaveBeenCalled();
  });

  test('should show the button', async () => {
    const { html } = harness;

    triggerWindow.scroll();

    (window as any).pageYOffset = 300;

    triggerWindow.scroll();

    await Vue.nextTick();

    expect(html()).toMatch('<div data-testid="back-to-top" class="vueBackToTop show">');

    (window as any).pageYOffset = 0;

    triggerWindow.scroll();

    await Vue.nextTick();

    expect(html()).toMatch('<div data-testid="back-to-top" class="vueBackToTop">');
  });
});
