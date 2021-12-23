
import { CustomMenuBox } from './customMenu/index.js'
export default (Vue) => {
  Vue.directive('customMenu', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el, binding) {
      // 取消默认的浏览器自带右键菜单
      window.oncontextmenu = function (e) {
        e.preventDefault()
      }
      let instance = null
      el.oncontextmenu = function (e) {
        // 防止重复显示
        if (instance) {
          document.body.removeChild(instance.$el)
          instance.$destroy()
          instance = null
        }
        const positionX = e.pageX
        const positionY = e.pageY
        console.log(positionX, positionY, binding)
        instance = CustomMenuBox({
          show: true,
          position: { positionX, positionY },
          menuList: binding.value
        })
        // hook:destroyed  监听销毁事件
        instance.$on('hook:destroyed', () => {
          instance = null
        })
      }
    }
  })
}
