import { mount, createLocalVue } from '@vue/test-utils';
import VueFooterSuscribe from './VueFooterSuscribe.vue';

const localVue = createLocalVue();

describe('VueFooterSuscribe.vue', () => {
  test('renders component', () => {
    const wrapper = mount(VueFooterSuscribe, { localVue });

    expect(wrapper.find('small').text()).toMatch('Copyright');
  });
});
