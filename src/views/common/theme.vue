<template>
  <el-form>
    <h2>布局设置</h2>
    <el-form-item label="导航条类型">
      <el-radio-group v-model="navbarLayoutType">
        <el-radio label="default" border>白色</el-radio>
        <el-radio label="inverse" border>默认</el-radio>
      </el-radio-group>
    </el-form-item>
    <h2>主题设置</h2>
    <el-form-item label="系统主题">
      <el-radio-group v-model="themeColorType">
        <el-radio label="#3E8EF7" border>蓝色</el-radio>
        <el-radio label="#0BB2D4" border>青色</el-radio>
        <el-radio label="#11C26D" border>绿色</el-radio>
        <el-radio label="#17B3A3" border>蓝绿色</el-radio>
        <el-radio label="#667AFA" border>靛青色</el-radio>
        <el-radio label="#997B71" border>棕色</el-radio>
        <el-radio label="#9463F7" border>紫色</el-radio>
        <el-radio label="#757575" border>灰色</el-radio>
        <el-radio label="#EB6709" border>橙色</el-radio>
        <el-radio label="#F74584" border>粉红色</el-radio>
        <el-radio label="#FCB900" border>黄色</el-radio>
        <el-radio label="#FF4C52" border>红色</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="侧边栏颜色">
      <el-radio-group v-model="sidebarLayoutSkin">
        <el-radio label="light" border>白色</el-radio>
        <el-radio label="dark" border>黑色</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    computed: {
      themeColorType: {
        get () { return this.$store.state.common.themeColorType },
        set (val) { this.$store.commit('common/updateThemeColorType', val) }
      },
      navbarLayoutType: {
        get () { return this.$store.state.common.navbarLayoutType },
        set (val) { this.$store.commit('common/updateNavbarLayoutType', val) }
      },
      sidebarLayoutSkin: {
        get () { return this.$store.state.common.sidebarLayoutSkin },
        set (val) { this.$store.commit('common/updateSidebarLayoutSkin', val) }
      }
    }
  }
</script>

