import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import RecordCount from './components/RecordCount.vue';  // ✅ FIXED PATH

describe('RecordCount — Component', () => {
  it('displays correct total count from props', () => {
    const wrapper = mount(RecordCount, {
      props: { total: 3 }
    });
    expect(wrapper.text()).toContain('3');
  });
});