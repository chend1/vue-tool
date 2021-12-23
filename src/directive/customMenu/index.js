import Vue from 'vue'
import customMenu from './index.vue'

export const CustomMenuBox = (props) => {
  // 创建构造器
  const CustomMenuConstructor = Vue.extend(customMenu)
  const instance = new CustomMenuConstructor({ propsData: props })
  instance.$mount()
  document.body.appendChild(instance.$el)
  // 监听关闭事件
  // instance.$on('close', {
  //   if (instance) {
  //     document.body.removeChild(instance.$el)
  //     instance.$destroy()
  //     instance = null
  //   }
  // })
  return instance
}
