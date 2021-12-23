<template>
  <div class="custom-menu" :style="{top: position.positionY +'px', left: position.positionX+'px'}" v-if="isMenu">
    <div class="list">
      <ul>
        <li @click="menuClick(list)" v-for="(list,index) in menuList" :key="index">{{list.name}}</li>
        <!-- <li @click="menuClick(list)">菜单2</li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomMenu',
  props: {
    position: {
      type: Object,
      default () {
        return {
          positionY: 0,
          positionX: 0
        }
      }
    },
    show: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      default () {
        return [{ name: '操作' }, { name: '删除' }]
      }
    }
  },
  data () {
    return {
      isMenu: this.show
    }
  },
  methods: {
    menuClick (list) {
      list.method()
      this.isMenu = false
    }
  },
  mounted () {
    // document.oncontextmenu = (e) => {
    //   this.positionY = e.clientY
    //   this.positionX = e.clientX
    //   this.isMenu = true
    //   return false
    // }
  }
}
</script>

<style scoped lang="less">
.custom-menu{
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  background-color: #fff;
  z-index: 9999;
  .list{
    ul{
      li{
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        &:hover{
          background-color: #eee;
        }
      }
    }
  }
}
</style>
