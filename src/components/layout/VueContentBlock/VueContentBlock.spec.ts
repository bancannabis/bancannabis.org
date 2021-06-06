import { render, RenderResult } from '@testing-library/vue';
import VueContentBlock from './VueContentBlock.vue';

describe('VueContentBlock.vue', () => {
  let harness: RenderResult;

  beforeEach(() => {
    harness = render(VueContentBlock, {
      stubs: ['nuxt-link'],
      slots: {
        default: 'slot',
      },
    });
  });

  test('renders component', () => {
    const { getByText } = harness;

    getByText('slot');
  });
});
