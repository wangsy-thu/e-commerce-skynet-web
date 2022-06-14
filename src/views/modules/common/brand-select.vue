<template>
  <div>
    <el-select placeholder="请选择" v-model="brandId" filterable clearable>
      <el-option
        v-for="item in brands"
        :key="item.brandId"
        :label="item.brandName"
        :value="item.brandId"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data () {
    // 这里存放数据
    return {
      catId: 0,
      brands: [
        {
          label: 'a',
          value: 1
        }
      ],
      brandId: '',
      subscribe: null
    }
  },
  // eslint-disable-next-line no-irregular-whitespace
  // 计算属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    brandId (val) {
      console.log('new brandId', this.brandId)
      this.PubSub.publish('brandId', val)
    }
  },
  // 方法集合
  methods: {
    getCatBrands () {
      this.$http({
        url: this.$http.adornUrl('/product/categorybrandrelation/brands/list'),
        method: 'get',
        params: this.$http.adornParams({
          catId: this.catId
        })
      }).then(({ data }) => {
        this.brands = data.data
      })
    }
  },
  created () {
  },
  mounted () {
    // 监听三级分类消息的变化
    this.subscribe = this.PubSub.subscribe('catPath', (msg, val) => {
      console.log('监听到三级分类变化')
      this.catId = val[val.length - 1]
      this.getCatBrands()
    })
  },
  // eslint-disable-next-line no-irregular-whitespace
  beforeCreate () {}, // 生命周期 - 创建之前
  // eslint-disable-next-line no-irregular-whitespace
  beforeMount () {}, // 生命周期 - 挂载之前
  // eslint-disable-next-line no-irregular-whitespace
  beforeUpdate () {}, // 生命周期 - 更新之前
  // eslint-disable-next-line no-irregular-whitespace
  updated () {}, // 生命周期 - 更新之后
  beforeDestroy () {
    this.PubSub.unsubscribe(this.subscribe) // 销毁订阅
    // eslint-disable-next-line no-irregular-whitespace
  }, // 生命周期 - 销毁之前
  // eslint-disable-next-line no-irregular-whitespace
  destroyed () {}, // 生命周期 - 销毁完成
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
</style>
