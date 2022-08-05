<template>
  <div class="mod-other-sku">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item label="平台">
        <el-select value="当当">

        </el-select>
      </el-form-item>
      <el-form-item label="排序字段">
        <el-select value="skuPrice">

        </el-select>
      </el-form-item>
      <el-form-item label="价格">
        <el-input-number v-model="dataForm.price.min" style="width:160px" :min="0"></el-input-number>-
        <el-input-number v-model="dataForm.price.max" style="width:160px" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.keyword" placeholder="请输入检索关键字" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()" type="primary">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.topic" placeholder="请输入抓取主题" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="fetchData()">抓取新数据</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column type="expand">
        <template slot-scope="props">
          <img :src="props.row.skuImgUrl">
          <el-form el-form label-position="left" inline class="demo-table-expand">
            <el-row>
              <div>
                <el-form-item label="商品名称">
                  <span>{{ props.row.skuName}}</span>
                </el-form-item>
              </div>
            </el-row>
            <el-row>
              <div>
                <el-form-item label="商品图片URL">
                  <span>{{ props.row.skuImgUrl}}</span>
                </el-form-item>
              </div>
            </el-row>
            <el-row>
              <div>
                <el-form-item label="商品价格">
                  <span>{{ props.row.skuPrice}}</span>
                </el-form-item>
              </div>
            </el-row>
            <el-row>
              <div>
                <el-form-item label="平台名称">
                  <span>{{ props.row.platformName}}</span>
                </el-form-item>
              </div>
            </el-row>
            <el-row>
              <div>
                <el-form-item label="店铺名称">
                  <span>{{ props.row.shopName}}</span>
                </el-form-item>
              </div>
            </el-row>
            <el-row>
              <div>
                <el-form-item label="评论数量">
                  <span>{{ props.row.commentNum}}</span>
                </el-form-item>
              </div>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="skuName"
        header-align="center"
        align="center"
        label="商品名称"
        width="600px"
      >
      </el-table-column>
      <el-table-column
        prop="skuImgUrl"
        header-align="center"
        align="center"
        label="商品图片"
        width="400px"
      >
      </el-table-column>
      <el-table-column
        prop="skuPrice"
        header-align="center"
        align="center"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="platformName"
        header-align="center"
        align="center"
        label="平台名称">
      </el-table-column>
      <el-table-column
        prop="shopName"
        header-align="center"
        align="center"
        label="店铺名称">
      </el-table-column>
      <el-table-column
        prop="commentNum"
        header-align="center"
        align="center"
        label="评论数量">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataForm: {
        keyword: '',
        sort: '',
        price: {
          min: 0,
          max: 0
        },
        topic: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  activated () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      // 解析价格区间
      let priceStr = ''
      if (this.dataForm.price.min < this.dataForm.price.max) {
        priceStr = this.dataForm.price.min + '_' + this.dataForm.price.max
      }
      console.log(priceStr)
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/craw/search'),
        method: 'post',
        data: this.$http.adornData({
          keyword: this.dataForm.keyword,
          price: priceStr,
          sort: 'skuPrice' + '_asc',
          page: this.pageIndex,
          size: this.pageSize
        }, false)
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataList = data.data.products
          this.totalPage = data.data.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    fetchData () {
      this.$confirm(`确定抓取主题为${this.dataForm.topic}的商品数据么？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/craw/fetch'),
          method: 'get',
          params: this.$http.adornParams({keyword: this.dataForm.topic})
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
</style>
