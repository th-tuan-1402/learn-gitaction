// tests/pages/hello.spec.js
import { mount } from '@vue/test-utils';
import HelloPage from '../../pages/hello.vue';

describe('HelloPage', () => {
    it('renders correctly', () => {
        const wrapper = mount(HelloPage);
        expect(wrapper.text()).toContain('Hello, Nuxt.js!');
    });
});
