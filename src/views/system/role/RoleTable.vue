<template>
  <div>
    <el-row type="flex" justify="space-between" style="position: sticky;">
      <el-col :span="12">
        <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="addHandler">新增</el-button>
        <el-button type="success" icon="el-icon-edit" size="small" @click="modifyHandler(undefined)" :disabled="isOperater != 1">修改</el-button>
        <el-button type="danger" icon="el-icon-delete" size="small" @click="removeHandler(undefined)" :disabled="isOperater == 0">删除</el-button>
        <el-button type="warning" icon="el-icon-document-add" size="small" @click="exportHandler" :disabled="isOperater == 0">导出</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="" plain size="mini" icon="el-icon-refresh" @click="queryHandler(true)"></el-button>
        <el-button type="" plain size="mini" icon="el-icon-full-screen"></el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around" :gutter="20">
      <el-col :span="16">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix" body-style="{margin:0}">
            <span><b></b></span>
          </div>
          
          <!-- <a-empty v-if="pageData.records.length == 0" >
            <span slot="description">
              暂无数据
            </span>
          </a-empty> -->
          <el-table :data="pageData.records" style="width: 100%" 
              @selection-change="selectionChange"
              @row-click="rowlClick"
              @select="rowSelect"
              row-key="id"
              ref="table"
              v-loading="table.loading">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="角色名称" prop="nameZh" fixed="left" width="200">
              <template slot-scope="scope">
                  <span>{{scope.row.nameZh}}</span>
                </template>
              </el-table-column>
            <el-table-column label="描述" prop="desc" width=""></el-table-column>
            <el-table-column label="角色名称(英文)" prop="name" width="150"></el-table-column>
            <el-table-column label="状态" prop="status" width="100">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  @click.stop.native="statusChange(scope.row)"
                  :active-value="1"
                  active-color="#13ce66"
                  :inactive-value="0"
                  inactive-color="#ff4949"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" @click.stop="modifyHandler(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click.stop="removeHandler(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          
          <!-- 分页 -->
          <my-pagination :pageData="pageData" :pageInfo="pageInfo" @queryHandler="queryHandler"></my-pagination>
          <!-- 分页 END -->
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>
              <b>权限分配</b>
              <span style="font-size: 14px;margin-left: 10px;">
                {{authority.role.nameZh}}
              </span>
            </span>
            <el-button style="float: right; padding: 3px 5px" size="mini" type="primary" @click="addRoleMenus">保存</el-button>
          </div>
          <el-tree ref="authorityTree" 
						:data="authority.tree" 
						:show-checkbox="true" 
						node-key="id" 
						:check-strictly="true"
						:default-expanded-keys="[1]" 
						:props="authority.defaultProps">
					</el-tree>
					<el-checkbox :indeterminate="authority.isIndeterminate" 
						v-model="authority.checkAll" @change="authorityHandler().handleCheckAllChange()">
						全选
          </el-checkbox>
        </el-card>

        <a-tree
          style="display: none"
          v-model="authority.selected"
          checkable
          :replaceFields="{title: 'name', key: 'id'}" 
          :auto-expand-parent="false"
          :tree-data="authority.tree"
          @select="onSelect">
        </a-tree>
      </el-col>
    </el-row>
    
    
    <!-- 弹出框——新增和修改信息 -->
    <el-dialog
      :title="dialog.title + '角色'"
      :visible.sync="dialog.visible"
      :close-on-click-modal="false"
      @open="queryRoles"
      @close="dialogClose"
      width="40%">
      
      <!-- slot name="modelForm" ></slot> -->
      <el-form :model="modelForm" :rules="form.formRules" ref="modelForm" status-icon label-position="right" size="small" label-width="80px">
        <el-row type="flex" justify="space-between">
          <el-col :span="24" style="display: none;">
            <el-form-item label="id">
              <el-input v-model="modelForm.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="角色名称" prop="nameZh">
              <el-input v-model="modelForm.nameZh" placeholder="请输入角色名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24" >
            <el-form-item label="英文名称" prop="name">
              <el-input v-model="modelForm.name" placeholder="'请输入角色英文名称">
                <template slot="prepend">ROLE_</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态" prop="status">
              <el-select v-model="modelForm.status" placeholder="默认状态为启用" style="width: 100%;">
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述" prop="desc">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入角色描述信息"
                v-model="modelForm.desc">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false" size="medium">取 消</el-button>
        <el-button @click="resetForm()" size="medium">重 置</el-button>
        <el-button type="primary" @click="submitHandler(0)" size="medium">{{dialog.submitText}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "RoleTable",
  data() {
    var checkPath = (rule, value, callback) => {
      if (this.modelForm.type != 3 && !value) {
        return callback(new Error("路径不能为空"));
      }
      callback();
    };
    var checkComponent = (rule, value, callback) => {
      if (this.modelForm.type == 2 && !value) {
        return callback(new Error("组件名称不能为空"));
      }
      callback();
    };
    var checkPermission = (rule, value, callback) => {
      if (this.modelForm.type == 3 && !value) {
        return callback(new Error("权限标识不能为空"));
      }
      callback();
    };
    return {
      checkedKeys: [],
      // 删除、修改、到处按钮是否禁用
      isOperater: 0,
      table: {
        loading: true,
        rows: [],
      },
      // 树形权限数据
      authority: {
        role: {},
        tree: [],
        selected: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        checkAll: false,
        isIndeterminate: false
      },
      dialog: {
        visible: false,
        title: "",
        submitText: "提交"
      },
      pageInfo: {
        current: 1,
        size: 10,
        total: 0,
        parentMenu: 0
      },
      modelForm: {
        id: null,
        name: null,
        nameZh: null,
        desc: null,
        status: 1
      },
      form: {
        roles: [],
        originalModel: {},
        formRules: {
          username: [
            { required: true, message: "用户名不可以为空", trigger: "blur" },
            { min: 5, max: 20, message: "长度在5-20个字符之间", trigger: "blur" }
          ],
          nickname: [
            // { validator: checkNickname, trigger: "blur" },
            { max: 10, message: "昵称最长为10个字符", trigger: "blur" },
          ],
          email: [
            // { required: true, validator: checkEmail, trigger: "blur" },
            { required: true, type: "email", message: "长度在2-20个字符之间", trigger: "blur"},
            { min: 6, max: 30, message: "长度在6-30个字符之间"},
          ],
          // parentMenu: [{ required: true, message: "请选择上级菜单或目录", trigger: "blur" }],
        },
      },
      pageData: {current: 1, total: 0, records: []},
      method: this.$axios.get
    };
  },
  methods: {
    onSelect(keys, callback) {
        console.log(keys)
    },
    /**
     * 状态改变方法
     * @param {Object} row 点击行的数据
     */
    async statusChange(row) {
      // console.log(row);
      this.method = this.$axios.post;
      if (row.status != 1) {
        await this.$alert("是否将当前【" + row.nameZh + "】设置为禁用状态", "禁用角色", {
          distinguishCancelAndClose: true,
          confirmButtonText: "禁用",
          cancelButtonText: "取消"
        }).then(() => {
          row.status = 0;
        }).catch(action => {
          row.status = 1;
          return;
        });
        if (row.status == 1) return;
      } else {
        row.status = 1;
      }
      this.baseRequest({id: row.id, status: row.status}, false).then(res => {
        // console.log(res)
        if (res.code == 200) {
          // this.modelForm = {type: 1, order: 3, status: 1}
          this.$notify({
            title: "修改角色“" + row.nameZh + "”状态成功",
            type: "success"
          })
        }
      }).catch(err => {
        row.status = row.status == 0 ? 1 : 0;
        this.$notify({
          title: "修改出现错误",
          type: "error"
        })
      });
    },
    // 表格中的选择项发生改变事件
    selectionChange(selection) {
      // 改变修改、删除、到处按钮的禁用状态
      this.isOperater = selection.length;
      this.table.rows = selection;
    },
    // 表格行被选择事件
    rowSelect(selection, row) {
      console.log(selection, row);
      // this.table.row = row;
    },
    // 当某一行被点击时
    rowlClick(row) {
      console.log(row)
      // 获取角色菜单数据
      this.getRoleMenu(row);
    },
    //
    // 以下和右边的权限管理有关
    // 
    authorityHandler() {
      function toggleSelect() {
        this.$refs.authorityTree.setCheckedKeys([3]);
      }
      let vm = this;
      return {
        handleCheckAllChange: function() {
          let arr = vm.authority.checkAll ? vm.authority.tree.map(el => el.id) : [];
          vm.$refs.authorityTree.setCheckedKeys(arr)
        }
      }
    },
    /**
     * 获取当前点击角色拥有的菜单
     * @param {Object} row
     */
    getRoleMenu(row) {
      // alert("获取当前角色的菜单");
      this.authority.role = row;
      // console.log(this.authority.role)
      this.$axios.get(this.$api.ROLE_MENU_API, {roleId: row.id}, false).then(res => {
        // 设置对应的权限
        this.$refs.authorityTree.setCheckedKeys(res.data);
        this.authority.selected = res.data;
      });
    },
    /**
     * 保存角色的菜单树
     */
    addRoleMenus() {
      this.method = this.$axios.post;
      let ids = this.$refs.authorityTree.getCheckedNodes(false, true).map(el => el.id);
      this.baseRequest({
        id: this.authority.role.id,
        menuIds: this.$refs.authorityTree.getCheckedKeys()
        // menuIds: ids,
      });
    },
    //
    // 以下是和CRUD有关的方法
    //
    /**
     * @param {Function} method
     * @param {Object} data
     */
     async baseRequest(data, isShow = true) {
      console.log(this.API)
      return await this.method(this.API, data, isShow).then(res => {
        console.log(res)
        if (res.code == 200) {
          
        }
        return res;
      }).catch(err => {
        // console.log(err, "1111")
        Promise.reject(err);
      });
    },
    // 刷新和获取表格数据
    queryHandler(refresh) {
      if (refresh) {
        this.authority.role = {};
        this.authority.tree = this.$store.state.menuModule.menu;
      }
      this.table.loading = true;
      this.$axios.get(this.API, this.pageInfo).then(res => {
        // console.log(res)
        this.pageData = res.data ? res.data : {current: 1, total: 0, records: []};
        this.table.loading = false;
        // console.log(res.data)
      }).catch(err => {
        this.table.loading = false;
        // console.log(err)
      })
    },
    // 新增按钮
    addHandler() {
      // this.clearForm(this.modelForm);
      this.dialog.title = "新增";
      this.dialog.submitText = "新增";
      this.dialog.visible = true;
      this.method = this.$axios.put;
    },
    // 修改按钮
    modifyHandler(row = this.table.rows.slice(-1)[0]) {
      this.modelForm = row;
      this.form.originalModel = JSON.parse(JSON.stringify(row));
      // this.$tools.copyObj()
      // 查询当前用户的角色信息（id数组）
      
      this.dialog.title = "修改";
      this.dialog.submitText = "更新";
      this.dialog.visible = true;
      this.method = this.$axios.post;
    },
    // 删除按钮
    removeHandler(rows = this.table.rows) {
      this.$alert("本次操作一经确认将无法撤回，是否继续", "角色删除", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: '取消'
      }).then(() => {
        this.method = this.$axios.delete;
        if (Array.isArray(rows)) {
          this.baseRequest(rows.map(el => el.id)).then(res => this.queryHandler()).catch(err >= {});
        } else {
          this.baseRequest([rows.id]).then(res => this.queryHandler()).catch(err >= {});
        }
      }).catch(action => {
        
      });
    },
    // 导出按钮
    exportHandler() {
      
    },
    /**
     * 表单提交 新增or更新
     * @param {Object} type
     */
    submitHandler(type) {
      console.log(this.modelForm)
      this.$refs["modelForm"].validate((valid) => {
        if (valid) {
          this.method(this.API, this.modelForm).then(res => {
            if (res.code == 200) {
              // this.modelForm = {type: 1, order: 3, status: 1}
              this.form.originalModel = null;
              this.dialog.visible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    //
    // 这下面是关于表单的方法
    // 
    resetForm() {
      this.modelForm = {}
      // this.$refs["modelForm"].resetFields();
    },
    typeChange(val) {
      console.log(val)
      // this.type = val;
    },
    // 这将在对话框被打开的时候进行调用
    queryRoles() {
      if (this.form.roles.length == 0) {
        this.$axios.get(this.$api.ROLE_API, {size: 20}, false).then(res => {
          // console.log(res.data);
          this.form.roles = res.data.records;
        });
      }
    },
    dialogClose() {
      // this.$tools.clearObj(this.modelForm, this);
      console.log(this.form.originalModel)
      if (this.form.originalModel != null) {
        this.$tools.copyObj(this.modelForm, this.form.originalModel, this);
      }
      this.modelForm = {};
      // this.$refs["modelForm"].resetFields();

    },
  },
  computed: {
    
  },
  mounted() {
    this.queryHandler(true);
    this.authority.tree = this.$store.state.menuModule.menu;
    console.log(this.authority);
  },
  watch: {
    pageInfo() {
      console.log("我变了")
    }
  },
  props: {
    // pageData: Object,
    // table: Object,
    // modelForm: Object,
    API: String
  },
};
</script>

<style>
  .el-form-item__content {
    /* display: flex; */
  }
</style>
