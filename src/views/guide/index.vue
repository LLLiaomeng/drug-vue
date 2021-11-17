<template>
  <div class="app-container">
<!--    <aside>-->
<!--      欢迎访问 基于医药知识图谱的合理用药审查系统V1.0！可点击下方按钮查看使用方式，本引导实现基于-->
<!--      <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js.</a>-->
<!--    </aside>-->
    <h2>
      欢迎访问 基于医药知识图谱的合理用药审查系统V1.0！
    </h2>
    <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">
      打开指引
    </el-button>
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './steps'

export default {
  name: 'Guide',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    // this.driver = new Driver()
    this.driver = new Driver({
      animate: false
    })
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
</script>
