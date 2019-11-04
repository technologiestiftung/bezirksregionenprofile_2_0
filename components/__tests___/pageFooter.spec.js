import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import vuetify from 'vuetify'
import pageFooter from '../pageFooter'

describe('pageFooter.vue', () => {
  let wrapper = null
  beforeEach(() => {
    Vue.use(vuetify)
    wrapper = shallowMount(pageFooter)
  })
  it('Renders vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
  it('has a link', () => {
    expect(wrapper.contains('a')).toBe(true)
  })
})
