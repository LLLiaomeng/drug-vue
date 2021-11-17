<template>
  <div>
    <el-card class="box-card">
      <el-table :data="personList" border style="width: 100%">
        <el-table-column fixed prop="cardId" label="医保卡号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="120">
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="120">
        </el-table-column>
        <el-table-column prop="weight" label="体重" width="120">
        </el-table-column>
        <el-table-column prop="height" label="身高" width="120">
        </el-table-column>
        <el-table-column prop="crowdList" label="人群类型" width="120">
        </el-table-column>
        <el-table-column prop="specialCrowdList" label="特殊人群类型" width="120">
        </el-table-column>
        <el-table-column prop="allergyList" label="过敏原" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button @click="edit(scope.$index)" type="text" size="small">编辑</el-button>
            <el-button @click="detelePatient(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--编辑界面-->
      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :inline="true" :model="editForm" label-width="80px" :rules="addFormRules" ref="editForm">
          <el-form-item label="医保号" prop="id">
            <el-input v-model="editForm.cardId"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-input v-model="editForm.gender">
            </el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="editForm.age">
            </el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-input v-model="editForm.birthday">
            </el-input>
          </el-form-item>
          <el-form-item label="体重" prop="weight">
            <el-input v-model="editForm.weight"></el-input>
          </el-form-item>
          <el-form-item label="身高" prop="height">
            <el-input v-model="editForm.height"></el-input>
          </el-form-item>
          <el-form-item label="人群类型" prop="crowdList">
            <el-input type="textarea" v-model="editForm.crowdList"></el-input>
          </el-form-item>
          <el-form-item label="特殊人群类型" prop="specialCrowdList">
            <el-input type="textarea" v-model="editForm.specialCrowdList"></el-input>
          </el-form-item>
          <el-form-item label="过敏原" prop="allergyList">
            <el-input type="textarea" v-model="editForm.allergyList"></el-input>
          </el-form-item>

          <br>
          <el-form-item label="操作提示" prop="">
         <span style="color:#F00"> 注意事项
         </span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>


      <!--        分页-->
      <el-pagination background layout="prev, pager, next" page-size="10" :total="total" @current-change="page">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  mounted: function () {
    const _this = this;
    axios.post('http://localhost:8018/drug/selectPerson', this.form).then(function (resp) {
      _this.personList = resp.data;
      for (let i = 0; i < _this.personList.length; i++) {
        _this.personList[i].age = Math.floor(_this.personList[i].age / 365);
      }
    });
  },
  methods: {
    // edit(row) {
    //     this.$router.push({
    //         path:'/update',
    //         query:{
    //             name:row.name,
    //             id:row.id
    //         }
    //     })
    // },

    // edit: function(row) {
    //     this.editFormVisible = true;
    //     this.editForm = Object.assign({}, row);
    // },
    edit(index) {
      let routeData = this.$router.resolve({
        path: '/manage/editPatient',
        query: {person: JSON.stringify(this.personList[index])}
      });
      window.open(routeData.href, '_parent');
    },

    editSubmit: function () {
      const _this = this;
      axios.post('http://localhost:8018/drug/', this.info).then(function (resp) {
      });
    },

    detelePatient(row) {
      const _this = this
      axios.delete('http://localhost:8018/drug/deletePersonById/' + row.cardId).then(function (resp) {
        _this.$alert('患者：' + row.name + '删除成功!', 'OK!!!', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.reload()

          }
        });
      })
    },
    page(currentPage) {
      const _this = this
      axios.get('http://localhost:8018/drug/findAll/' + currentPage + '/10').then(function (resp) {
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements

      })
    }
  },

  data() {
    return {

      // personList:[{
      //   cardId:'',
      //   name:'',
      //   age:'',
      //   gender:'',
      //   birthday:'',
      //   weight:'',
      //   height:'',
      //   crowdList:[],
      //   specialCrowdList:[],
      //   allergyList:[],
      // }],
      personList: [],
      //编辑界面是否显示
      editFormVisible: false,
      //编辑按钮Loading加载
      editLoading: false,
      //编辑界面数据
      editForm: [{
        cardId: '',
        name: '',
        age: '',
        gender: '',
        birthday: '',
        weight: '',
        height: '',
        crowdList: [],
        specialCrowdList: [],
        allergyList: [],
      }],
    }
  },

  created() {
    const _this = this
    axios.get('http://localhost:8018/drug/').then(function (resp) {
      _this.tableData = resp.data.content
      _this.total = resp.data.totalElements

    })
  }
}
</script>

<style>

</style>
