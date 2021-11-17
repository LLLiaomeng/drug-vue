<template>
  <div>
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="id" label="编号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="患者姓名" width="120">
          <template slot-scope="scope">
            <el-button @click="handleSelect(scope.$index,scope.row)" type="text" size="medium">{{ scope.row.name }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="disease" label="疾病" width="120">
        </el-table-column>
        <el-table-column prop="symptom" label="症状" width="120">
        </el-table-column>
        <!--      <el-table-column prop="medicalOrder.formulaList" label="药品详情" width="200">-->
        <!--      </el-table-column>-->
        <el-table-column prop="details" label="处方详情" width="300">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="210" class="align-center">
          <template slot-scope="scope">
            <el-button @click="edit(scope.$index)" size="small">编辑</el-button>
            <el-button @click="check(scope.$index)" size="small">审查</el-button>
            <el-button @click="detelePre(scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <el-pagination
        background
        layout="prev, pager, next"
        page-size="10"
        :total="total"
        @current-change="page">
      </el-pagination>

      <!--详细界面-->
      <el-dialog title="详细信息" :visible.sync="selectFormVisible" :close-on-click-modal="false">
        <el-form :inline="true" :model="selectForm" label-width="120px" ref="selectForm">
          <el-form-item label="卡号" prop="cardId">
            <el-input v-model="selectForm.cardId" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="姓名" prop="name">
            <el-input v-model="selectForm.name" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-input v-model="selectForm.name" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="selectForm.age" auto-complete="off" :disabled="true" d></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker v-model="selectForm.birthday" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                            disabled></el-date-picker>
          </el-form-item>
          <el-form-item label="体重" prop="weight">
            <el-input v-model="selectForm.weight" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="身高" prop="height">
            <el-input v-model="selectForm.height" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="人群类型" prop="crowdList">
            <el-input v-model="selectForm.crowdList" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="特殊人群类型" prop="specialCrowdList">
            <el-input v-model="selectForm.specialCrowdList" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="过敏原" prop="allergyList">
            <el-input v-model="selectForm.allergyList" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="selectFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {

  data() {
    return {
      infoList: [{
        person: {
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
        },
        medicalOrder: {
          moId: '',
          cardId: '',
          bsCondition: '',
          hospital: '',
          department: '',
          doctorWay: '',
          startDate: '',
          endDate: '',
          recordDate: '',
          diseaseList: [],
          symptomList: [],
          formulaList: [{
            drugList: [{
              formulaId: '',
              name: '',
              route: '',
              dosageNum: '',
              dosageUnit: '',
              freqNum: '',
              freqUnit: '',
              amount: '',
              code: '',
            }]
          }],
          projectList: [{
            moId: '',
            name: '',
            code: '',
            amount: '',
          }],
        },
      }],

      tableData: [],

      //查看详细
      selectForm: [{
        cardId: "",
        userName: "",
        age: '',
        gender: "",
        birthday: "",
        weight: "",
        height: "",
        crowdList: [],
        specialCrowdList: [],
        allergyList: [],

      }],
      //详细界面是否显示
      selectFormVisible: false,
      basicInfo: {
        name: "",
        gender: "",
        age: "",
        cardId: "",
        disease: "",
        symptom: "",
        bsCondition: "",
        drug: "",
        project: ""
      },

    }
  },

  mounted: function () {
    const _this = this;
    axios.post('http://localhost:8018/drug/selectAll').then(function (resp) {
      _this.infoList = resp.data;

      for (let i = 0; i < _this.infoList.length; i++) {
        let data = {};
        data["id"] = _this.infoList[i].medicalOrder.moId;
        data["name"] = _this.infoList[i].person.name;
        data["date"] = _this.infoList[i].medicalOrder.recordDate;
        let disease = "", symptom = "", details = "";
        for (let j = 0; j < _this.infoList[i].medicalOrder.diseaseList.length; j++) {
          disease += _this.infoList[i].medicalOrder.diseaseList[j] + "  ";
        }
        for (let j = 0; j < _this.infoList[i].medicalOrder.symptomList.length; j++) {
          symptom += _this.infoList[i].medicalOrder.symptomList[j] + "  ";
        }
        for (let j = 0; j < _this.infoList[i].medicalOrder.formulaList.length; j++) {
          for (let p = 0; p < _this.infoList[i].medicalOrder.formulaList[j].drugList.length; p++) {
            let drug = _this.infoList[i].medicalOrder.formulaList[j].drugList[p];
            details += "【" + drug.name + "】" + "  " + drug.route + "  " + drug.dosageNum + drug.dosageUnit + "  " + drug.freqNum + drug.freqUnit + "  " + drug.amount + "  ";
          }
        }
        data["disease"] = disease;
        data["symptom"] = symptom;
        data["details"] = details;
        _this.tableData.push(data);
      }
    });
  },

  methods: {
    // edit(row) {
    //     this.$router.push({
    //         path:'/update',
    //         query:{
    //                 name:row.name,
    //                 id:row.id
    //         }
    //     })
    // },
    check(index) {
      let basicInfo = {};
      let info = this.infoList[index];
      basicInfo["name"] = "姓名：" + info.person.name;
      basicInfo["age"] = "年龄：" + Math.floor(info.person.age / 365);
      basicInfo["gender"] = "性别：" + info.person.gender;
      basicInfo["cardId"] = "卡号：" + info.person.cardId;
      basicInfo["bsCondition"] = "病生状态描述：" + info.medicalOrder.bsCondition;
      let disease = "疾病：", symptom = "症状：", drugString = "药品处方：", projectString = "诊疗项目：";
      for (let i = 0; i < info.medicalOrder.diseaseList.length; i++) {
        disease += info.medicalOrder.diseaseList[i] + "  ";
      }
      for (let i = 0; i < info.medicalOrder.symptomList.length; i++) {
        symptom += info.medicalOrder.symptomList[i] + "  ";
      }
      for (let i = 0; i < info.medicalOrder.formulaList.length; i++) {
        for (let j = 0; j < info.medicalOrder.formulaList[i].drugList.length; j++) {
          let drug = info.medicalOrder.formulaList[i].drugList[j];
          drugString += "【" + drug.name + "】" + "  " + drug.route + "  " + drug.dosageNum + drug.dosageUnit + "  " + drug.freqNum + drug.freqUnit + "  " + drug.amount + "  ";
        }
      }
      for (let i = 0; i < info.medicalOrder.projectList.length; i++) {
        let project = info.medicalOrder.projectList[i];
        projectString += "【" + project.name + "】" + "  " + project.code + "  " + project.amount + "  ";
      }
      basicInfo["disease"] = disease;
      basicInfo["symptom"] = symptom;
      basicInfo["drug"] = drugString;
      basicInfo["project"] = projectString;
      this.basicInfo = basicInfo;

      const _this = this;
      axios.post('http://localhost:8018/drug/check', this.infoList[index]).then(function (resp) {
        _this.result = resp.data;
        let routeData = _this.$router.resolve({
          path: '/check/results',
          query: {result: JSON.stringify(_this.result), basicInfo: JSON.stringify(_this.basicInfo)}
        });
        window.open(routeData.href, '_parent');
      });
    },

    handleSelect: function (index, row) {
      this.selectFormVisible = true;
      this.selectForm = Object.assign({}, row);
    },

    // edit: function(row) {
    //     this.editFormVisible = true;
    //     this.editForm = Object.assign({}, row);
    // },

    edit(index) {
      let routeData = this.$router.resolve({
        path: '/manage/editPrescription',
        query: {info: JSON.stringify(this.infoList[index])}
      });
      window.open(routeData.href, '_parent');
    },

    review(index, row) {
      this.$router.push({path: '/results'})
    },

    detelePre(row) {
      const _this = this
      axios.delete('http://localhost:8018/drug/deleteMOById/' + row.id).then(function (resp) {
        _this.$alert('处方：' + row.name + ' 删除成功!', 'OK!!!', {
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
    },

  },

  created() {
    const _this = this
    axios.get('http://localhost:8181/book/findAll/1/5').then(function (resp) {
      _this.tableData = resp.data.content
      _this.total = resp.data.totalElements

    })
  }

}
</script>

<style>

</style>
