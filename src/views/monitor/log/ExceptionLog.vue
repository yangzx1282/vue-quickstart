<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="searchFrom">
        <el-row type="flex" justify="start" :gutter="0">
          <el-form-item label="" size="mini"><el-input v-model="searchFrom.name" placeholder="请输入菜单名称进行查询"></el-input></el-form-item>
          <el-form-item label="" size="mini">
            <div class="block">
              <span class="demonstration"></span>
              <el-date-picker
                v-model="searchFrom.dateScope"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                style="width: 280px;"
              ></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item size="mini">
            <el-select v-model="searchFrom.status" placeholder="菜单状态状态" style="width: 150px;">
              <el-option label="全部" :value="0"></el-option>
              <el-option v-for="item in statusOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item size="mini">
            <el-button type="success" icon="el-icon-search" @click="searchHandler">搜索</el-button>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="warning" icon="el-icon-refresh-left" native-type="reset">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <el-row>
        <!-- 使用组件的形式 -->
        <data-table :API="API" :logType="logType">
          
        </data-table>
      </el-row>
    </el-card>
    
  </div>
</template>

<script>
import DataTable from "./LogTable"
export default {
  data() {
    return {
      // 搜索表单
      searchFrom: {
        name: '',
        dateScope: null,
        status: null,
      },
      API: this.$api.LOG_API,
      logType: "ERROR",
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      statusOpt: [
        {
          value: 1,
          label: '启用'
        },
        {
          value: 2,
          label: '禁用'
        }
      ],
      // 与后台查询的字段对应的(表格)标签
      table: {
        labels: [
          {label: "菜单名称", prop: "name", width: 100, fixed: "left", type: "text"},
          {label: "昵称", prop: "name", width: 150, fixed: "", type: "text"},
          {label: "性别", prop: "gender", width: 50, fixed: "", type: "radio"},
          {label: "邮箱", prop: "email", width: 200, fixed: "", type: "email"},
          {label: "状态", prop: "status", width: 70, fixed: "", type: "select"},
          {label: "创建时间", prop: "createTime", width: 200, fixed: "", type: "text"},
        ],
        props: {
          title: "菜单列表",
          span: 24,
          left: 0,
          right: 0
        }
      },
      // 从后台来的数据，和字段对应
      pageData: {currentPage: 2, totalCount: 100, records: this.$store.state.menuModule.menu}
            
    }
  },
  methods: {
    searchHandler() {
      console.log(this.modelForm)
    },
    statusChange(value) {
      
      console.log(value.status);
      if (value.status != 1) {
        this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '保存',
          cancelButtonText: '放弃修改'
        })
          .then(() => {
            this.$message({
              type: 'info',
              message: '修改用户状态成功'
            });
          })
          .catch(action => {
            // this.$message({
            //   type: 'info',
            //   message: action === 'cancel'
            //     ? '放弃保存并离开页面'
            //     : '停留在当前页面'
            // })
            value.status = 1;
          });
      }
    },
    // 改变修改、删除、到处按钮的禁用状态
    selectionChange(selection) {
      selection.length > 0 ? this.isOperater = false : this.isOperater = true;
    },
    /**
     * 清空表单
     */
    clearForm() {
      Object.keys(this.modelForm).forEach(key => {
        this.modelForm[key] = null;
      })
    }
  },
  mounted() {
    // console.log(this.API)
    console.log(this.$slots)
  },
  components: { DataTable }
};
</script>

<style>
  
</style>
