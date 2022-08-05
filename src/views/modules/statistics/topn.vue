<template>
<div>
  <el-row>
    <div>
      <h2>实时数据统计大屏</h2>
    </div>
  </el-row>
  <el-row>
    <el-col span="12">
      <div>
        <el-card>
          <div class="box-bar" style="height: 400px; width: 850px" id="topn-bar"></div>
        </el-card>
      </div>
    </el-col>
    <el-col span="12">
      <div>
        <el-card>
          <div class="box-bar" style="height: 400px; width: 850px" id="click-map"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col span="12">
      <div>
        <el-card>
          <div class="box-bar" style="height: 400px; width: 850px" id="category-sale"></div>
        </el-card>
      </div>
    </el-col>
    <el-col span="12">
      <div>
        <el-card>
          <div class="box-bar" style="height: 400px; width: 850px" id="sale-map"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'topn',
  data () {
    return {
      data: [
        {
          count: 42,
          skuId: 34,
          windowEnd: 1657974660000,
          windowStart: 1657974650000
        },
        {
          count: 40,
          skuId: 41,
          windowEnd: 1657974660000,
          windowStart: 1657974650000
        },
        {
          count: 38,
          skuId: 49,
          windowEnd: 1657974660000,
          windowStart: 1657974650000
        },
        {
          count: 37,
          skuId: 45,
          windowEnd: 1657974660000,
          windowStart: 1657974650000
        },
        {
          count: 37,
          skuId: 46,
          windowEnd: 1657974660000,
          windowStart: 1657974650000
        }
      ],
      chartBar: null,
      clickMap: null,
      saleMap: null,
      categorySale: null,
      priceData: [20, 30, 34, 56, 12, 34, 67, 78, 32, 53]
    }
  },
  methods: {
    initCategorySale () {
      const option = {
        title: {
          text: '昨日商品种类销售数据'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '手机' },
              { value: 735, name: '食品' },
              { value: 580, name: '电脑' },
              { value: 484, name: '书籍' },
              { value: 300, name: '配件' }
            ]
          }
        ]
      }
      this.clickMap = echarts.init(document.getElementById('category-sale'))
      this.clickMap.setOption(option)
    },
    initClickMap () {
      const option = {
        title: {
          text: '电商页面访问量统计'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // prettier-ignore
          data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18：00', '20：00', '22：00']
        },
        yAxis: {
          type: 'value',
          axisPointer: {
            snap: true
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [
            {
              lte: 6,
              color: 'green'
            },
            {
              gt: 6,
              lte: 8,
              color: 'red'
            },
            {
              gt: 8,
              lte: 14,
              color: 'green'
            },
            {
              gt: 14,
              lte: 17,
              color: 'red'
            },
            {
              gt: 17,
              color: 'green'
            }
          ]
        },
        series: [
          {
            name: 'clickNum',
            type: 'line',
            smooth: true,
            // prettier-ignore
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380],
            markArea: {
              itemStyle: {
                color: 'rgba(255, 173, 177, 0.4)'
              },
              data: [
                [
                  {
                    name: 'Morning Peak',
                    xAxis: '06:00'
                  },
                  {
                    xAxis: '10:00'
                  }
                ],
                [
                  {
                    name: 'Evening Peak',
                    xAxis: '18：00'
                  },
                  {
                    xAxis: '20：00'
                  }
                ]
              ]
            }
          }
        ]
      }
      this.clickMap = echarts.init(document.getElementById('click-map'))
      this.clickMap.setOption(option)
    },
    initTopBar () {
      // 处理数据
      const yAxisData = []
      const values = []
      // eslint-disable-next-line no-undef
      this.data.forEach(item => {
        yAxisData.push(item.skuId)
        values.push(item.count)
      })
      const option = {
        title: {
          text: '商品实时点击量排名'
        },
        xAxis: {
          max: 'dataMax',
          axisLabel: {
            formatter: '{value}人次'
          }
        },
        yAxis: {
          type: 'category',
          data: yAxisData,
          inverse: true,
          axisLabel: {
            formatter: '{value}号商品'
          },
          max: 4
        },
        series: [
          {
            name: 'X',
            type: 'bar',
            data: values,
            label: {
              show: true,
              position: 'right',
              valueAnimation: true
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  const colorList = ['#c23531', '#67b1e3', '#a8a861', '#a865d4', '#91c7ae']
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ],
        legend: {
          show: true
        },
        animationDuration: 0,
        animationDurationUpdate: 500,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
      }
      this.chartBar = echarts.init(document.getElementById('topn-bar'))
      this.chartBar.setOption(option)
    },
    initSaleMap () {
      const values = []
      const time = []
      // eslint-disable-next-line no-undef
      this.priceData.forEach(item => {
        values.push(item.totalPrice)
        const date = new Date(item.windowEnd)
        time.push(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())
      })
      const option = {
        title: {
          text: '实时销售额统计'
        },
        legend: {},
        xAxis: [
          {
            type: 'category',
            data: time
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: 'Price',
            axisLabel: {
              formatter: '{value}元'
            }
          }
        ],
        series: [
          {
            name: 'price',
            type: 'bar',
            data: values,
            itemStyle: {
              normal: {
                color: function (params) {
                  const colorList = ['#318dc2']
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }
      this.saleMap = echarts.init(document.getElementById('sale-map'))
      this.saleMap.setOption(option)
    },
    loadPrice () {
      this.$http({
        url: this.$http.adornUrl('/statistics/price/list'),
        method: 'get'
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.priceData = data.priceList
        }
      })
    },
    loadData () {
      this.$http({
        url: this.$http.adornUrl('/statistics/click/topN'),
        method: 'get'
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.data = data.data
        }
      })
    }
  },
  mounted () {
    this.initTopBar()
    this.initCategorySale()
    this.initClickMap()
    this.initSaleMap()
  },
  created () {
    setInterval(() => {
      this.loadData()
      this.loadPrice()
      this.initTopBar()
      this.initSaleMap()
    }, 5000)
  }
}
</script>

<style scoped>

</style>
