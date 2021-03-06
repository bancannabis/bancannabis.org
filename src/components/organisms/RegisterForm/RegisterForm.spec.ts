import { createLocalVue, mount } from '@vue/test-utils';
import LoginForm from '@/components/organisms/LoginForm/LoginForm.vue';
import { i18n } from '@/test/i18n';

const localVue = createLocalVue();

describe('LoginForm.vue', () => {
  test('renders component', () => {
    const wrapper = mount<any>(LoginForm, {
      i18n,
      localVue,
    });

    expect(wrapper.vm).toBeDefined();
  });

  test('should submit form values', async () => {
    const wrapper = mount<any>(LoginForm, {
      i18n,
      localVue,
    });

    wrapper.setData({
      username: 'foo',
      password: '123456',
      checked: false,
    });

    wrapper.find('form').trigger('submit');
    await wrapper.vm.$nextTick();

    const actual = wrapper.emitted('submit');
    const expected = [[{ password: '123456', username: 'foo', checked: false }]];

    expect(actual).toEqual(expected);
  });
});
