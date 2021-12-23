<template>
  <div class="home" ref="test">
    <div class="left">
      <video
        ref="video"
        src="http://192.168.0.200:8088/cms/video?video=D:\local_pacs_img\US\20211221\1.2.1071.4.4.135.20211105172118410/f3271e573910ae36406d750fb01d6722.mkv"
        autoplay
        controls
      ></video>
    </div>
    <div class="rigth">
      <div class="tool">
        <span>
          截屏
          <code>F3</code>
        </span>
        <span>
          开始录屏
          <code>F2</code>
        </span>
        <span>
          结束录屏
          <code>F8</code>
        </span>
        <span>
          全屏
          <code>Enter</code>
        </span>
      </div>
      <img :src="src" alt="" v-if="src !== ''" />
      <video :src="localVideo" ref="localVideo" autoplay controls v-if="localVideo !== ''"></video>
    </div>
  </div>
</template>

<script>
import { videoScreenShot } from '@/utils'
export default {
  name: 'Home',
  data() {
    return {
      src: '',
      localVideo: '',
      isScreen: true
    }
  },
  methods: {
    // 获取视频流
    async getStream() {
      let stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      })
      this.mediaRecorder = new MediaRecorder(stream)
      try {
        this.$refs.video.srcObject = stream
      } catch (err) {
        console.log(err)
      }
    },
  },
  created() {
    this.getStream()
  },
  mounted() {
    const handler = async (e) => {
      if (e.code === 'F3') {
        this.src = await videoScreenShot(this.$refs.video)
      }
      if (e.code === 'F2') {
        if (this.mediaRecorder && this.isScreen) {
          this.$message.success('开始录制，按F8结束录制')
          this.mediaRecorder.start()
          this.isScreen = false
        }
      }
      if (e.code === 'F8' && !this.isScreen) {
        this.$message.success('录制结束')
        this.mediaRecorder.stop()
        this.isScreen = true
        // 获取录制的内容
        this.mediaRecorder.ondataavailable = (e) => {
          console.log(e)
          const blob = new Blob([e.data], { type: e.data.type })
          let audioURL = window.URL.createObjectURL(blob)
          this.localVideo = audioURL
          console.log(blob)
        }
      }
      if (e.code === 'Enter') {
        this.$refs.video.requestFullscreen()
      }
    }
    document.addEventListener('keydown', handler)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handler)
    })
  },
}
</script>

<style scoped lang="less">
.home {
  display: flex;
  width: 100%;
  video {
    flex: 1;
  }
  .tool {
    width: 500px;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
}
</style>
