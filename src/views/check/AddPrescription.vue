<template>
  <div>
    <el-container>

      <el-main>
        <el-card class="box-card">

          <el-form ref="info" :model="info" label-width="80px" class="demo-form-inline">

            <el-form-item label="患者">
              <el-select v-model="info.person" clearable value-key="cardId" placeholder="请选择患者">
                <el-option
                  v-for="item in personList"
                  :key="item.cardId"
                  :label="item.name + item.cardId"
                  :value="item">
                  <span style="float: left">{{ item.name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ item.cardId }}</span>
                </el-option>
              </el-select>
              <el-button type="primary" @click="selectMedicalOrder">读取最新处方</el-button>
            </el-form-item>
            <!--            <el-row>-->
            <!--              <el-col :span="5">-->
            <!--                <el-form-item label="医院">-->
            <!--                  <el-select v-model="info.medicalOrder.hospital" placeholder="请选择医院">-->
            <!--                    <el-option label="四川省人民医院" value="四川省人民医院"></el-option>-->
            <!--                    <el-option label="华西医院" value="华西医院"></el-option>-->
            <!--                    <el-option label="成都市第三人民医院" value="成都市第三人民医院"></el-option>-->
            <!--                  </el-select>-->
            <!--                </el-form-item>-->
            <!--              </el-col>-->
            <!--              <el-col :span="5">-->
            <!--                <el-form-item label="就医方式">-->
            <!--                  <el-select v-model="info.medicalOrder.doctorWay" placeholder="请选择就医方式">-->
            <!--                    <el-option label="城乡门诊统筹" value="cxmztc"></el-option>-->
            <!--                    <el-option label="城职门诊统筹" value="czmztc"></el-option>-->
            <!--                    <el-option label="工伤康复住院" value="gskfzt"></el-option>-->
            <!--                    <el-option label="工伤门诊" value="gsmz"></el-option>-->
            <!--                    <el-option label="工伤普通住院" value="gsptzy"></el-option>-->
            <!--                    <el-option label="离休、二等乙级门诊" value="edyjmz"></el-option>-->
            <!--                    <el-option label="离休、二等乙级住院" value="edyjzy"></el-option>-->
            <!--                    <el-option label="普通城乡门诊" value="ptcxmz"></el-option>-->
            <!--                    <el-option label="普通城乡住院" value="ptcxzy"></el-option>-->
            <!--                    <el-option label="普通人员门诊" value="ptrymz"></el-option>-->
            <!--                    <el-option label="普通人员住院" value="ptryzy"></el-option>-->
            <!--                    <el-option label="少儿门诊" value="semz"></el-option>-->
            <!--                    <el-option label="少儿住院" value="sezy"></el-option>-->
            <!--                    <el-option label="生育住院" value="syzy"></el-option>-->

            <!--                  </el-select>-->
            <!--                </el-form-item>-->
            <!--              </el-col>-->
            <!--              <el-col :span="5">-->
            <!--                <el-form-item label="科室">-->
            <!--                  <el-select v-model="info.medicalOrder.department" placeholder="请选择科室">-->
            <!--                    <el-option label="内科" value="neike"></el-option>-->
            <!--                    <el-option label="外科" value="waike"></el-option>-->
            <!--                    <el-option label="妇科" value="fuke"></el-option>-->
            <!--                    <el-option label="儿科" value="erke"></el-option>-->
            <!--                  </el-select>-->
            <!--                </el-form-item>-->
            <!--              </el-col>-->
            <!--              <el-col :span="9">-->
            <!--                <el-form-item label="就诊日期">-->
            <!--                  <div class="block">-->
            <!--                    <el-date-picker-->
            <!--                      v-model="date"-->
            <!--                      type="daterange"-->
            <!--                      range-separator="至"-->
            <!--                      start-placeholder="开始日期"-->
            <!--                      end-placeholder="结束日期"-->
            <!--                      format="yyyy 年 MM 月 dd 日"-->
            <!--                      value-format="yyyy-MM-dd"-->
            <!--                      unlink-panels=true>-->
            <!--                    </el-date-picker>-->
            <!--                  </div>-->
            <!--                </el-form-item>-->
            <!--              </el-col>-->

            <!--            </el-row>-->
            <el-row>
              <el-col :span="12">
                <el-form-item label="疾病">
                  <el-tag v-for="d in info.medicalOrder.diseaseList" closable @close="removeDisease(d)">{{ d }}</el-tag>
                  <span @keyup.enter="addDisease"><el-input v-model="disease"></el-input></span>
                  <el-button type="primary" size="small" icon="el-icon-plus" @click="addDisease">添加疾病</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="症状">
                  <el-tag v-for="d in info.medicalOrder.symptomList" closable @close="removeSymptom(d)">{{ d }}</el-tag>
                  <span @keyup.enter="addSymptom"><el-input v-model="symptom"></el-input></span>
                  <el-button type="primary" size="small" icon="el-icon-plus" @click="addSymptom">添加症状</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="病生状态描述">
              <el-input type="textarea" v-model="info.medicalOrder.bsCondition"></el-input>
            </el-form-item>
          </el-form>

          <el-form ref="formName" :model="info">
            <el-table ref="table" :data="info.medicalOrder.formulaList" empty-text='暂无数据' style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props1">
                  <el-table ref="table" :data="props1.row.drugList" style="width: 100%">
                    <el-table-column label="药品名称">
                      <template slot-scope="props2">
                        <el-form-item>
                          <el-input v-model="props2.row.name"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="给药途径">
                      <template slot-scope="props2">
                        <el-form-item>
                          <el-input v-model="props2.row.route"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="用药剂量">
                      <template slot-scope="props2">
                        <el-form-item>
                          <el-input v-model="props2.row.dosageNum" style="width:70px"></el-input>
                          <el-select v-model="props2.row.dosageUnit" placeholder="单位" style="width:100px">
                            <el-option label="颗" value="颗"></el-option>
                            <el-option label="包" value="包"></el-option>
                            <el-option label="片" value="片"></el-option>
                          </el-select>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="用药频率">
                      <template slot-scope="props2">
                        <el-form-item>
                          <el-input v-model="props2.row.freqNum" style="width:70px"></el-input>
                          <!--                                                    <el-input v-model="props.row.ypfreq" style="width:50px"></el-input>-->
                          <el-select v-model="props2.row.freqUnit" placeholder="单位" style="width:100px">
                            <el-option label="次/天" value="次/天"></el-option>
                            <el-option label="次/周" value="次/周"></el-option>
                          </el-select>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column label="数量">
                      <template slot-scope="props2">
                        <el-form-item>
                          <el-input v-model="props2.row.amount"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <!--                    <el-table-column label="药品编码">-->
                    <!--                      <template slot-scope="props2">-->
                    <!--                        <el-form-item>-->
                    <!--                          <el-input v-model="props2.row.code"></el-input>-->
                    <!--                        </el-form-item>-->
                    <!--                      </template>-->
                    <!--                    </el-table-column>-->
                    <el-table-column label="操作">
                      <template slot-scope="props2">
                        <el-button type="danger" size="mini" @click="ypdel(props1.$index,props2.$index)"
                                   icon='el-icon-delete'></el-button>
                        <el-button type="primary" size="mini" @click="ypadd(props1.$index)"
                                   icon='el-icon-plus'></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column label="处方:药品">
                <template slot-scope="props1">
                  {{ props1.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="props1">
                  <el-button type="danger" size="mini" @click="ypdelTable(props1.$index)"
                             icon='el-icon-delete'></el-button>
                  <el-button type="primary" size="mini" @click="ypaddTable" icon='el-icon-plus'></el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-form-item style="height: 10px"></el-form-item>

            <!--            <el-table ref="table" :data="projectList" empty-text='暂无数据' style="width: 100%">-->
            <!--              <el-table-column type="expand">-->
            <!--                <template slot-scope="props1">-->
            <!--                  <el-table ref="table" :data="props1.row.project" style="width: 100%">-->
            <!--                    <el-table-column label="项目名称">-->
            <!--                      <template slot-scope="props2">-->
            <!--                        <el-form-item>-->
            <!--                          <el-input v-model="props2.row.name"></el-input>-->
            <!--                        </el-form-item>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->

            <!--                    <el-table-column label="数量">-->
            <!--                      <template slot-scope="props2">-->
            <!--                        <el-form-item>-->
            <!--                          <el-input v-model="props2.row.amount"></el-input>-->
            <!--                        </el-form-item>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                    <el-table-column label="项目编码">-->
            <!--                      <template slot-scope="props2">-->
            <!--                        <el-form-item>-->
            <!--                          <el-input v-model="props2.row.code"></el-input>-->
            <!--                        </el-form-item>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                    <el-table-column label="操作">-->
            <!--                      <template slot-scope="props2">-->
            <!--                        <el-button type="danger" size="mini" @click="zldel(props1.$index,props2.$index)"-->
            <!--                                   icon='el-icon-delete'></el-button>-->
            <!--                        <el-button type="primary" size="mini" @click="zladd(props1.$index)"-->
            <!--                                   icon='el-icon-plus'></el-button>-->
            <!--                      </template>-->
            <!--                    </el-table-column>-->
            <!--                  </el-table>-->
            <!--                </template>-->
            <!--              </el-table-column>-->
            <!--              <el-table-column label="处方:项目">-->
            <!--                <template slot-scope="props1">-->
            <!--                  {{ props1.$index + 1 }}-->
            <!--                </template>-->
            <!--              </el-table-column>-->
            <!--              <el-table-column label="操作">-->
            <!--                <template slot-scope="props1">-->
            <!--                  <el-button type="danger" size="mini" @click="zldelTable(props1.$index)"-->
            <!--                             icon='el-icon-delete'></el-button>-->
            <!--                  <el-button type="primary" size="mini" @click="zladdTable" icon='el-icon-plus'></el-button>-->
            <!--                </template>-->
            <!--              </el-table-column>-->
            <!--            </el-table>-->
            <el-form-item style="height: 10px"></el-form-item>

            <el-form-item style="text-align: center">
              <!--                            <el-button type="primary" @click="onSubmit('formName')">提交</el-button>-->
              <el-button type="primary" @click="onSubmit">审查</el-button>
              <el-button type="primary" @click="insertMedicalOrder">保存</el-button>
              <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>

    </el-container>
  </div>
</template>

<style>

</style>

<script>

export default {
  data() {
    return {

      // form: {
      //
      //       ypformulation: [{
      //           drug:[{
      //               ypname: "",
      //               route: "",
      //               dosage: "",
      //               ypfreq: "",
      //               ypamount:"",}]
      //       }],
      //       zlformulation:[{
      //           zl:[{
      //               zlname:"",
      //               code:"",
      //               zlamount:"",
      //           }]
      //       }],
      //
      //       desc: '',
      //       hospital:'',
      //       doctorway:'',
      //       patient:"",
      //       department:'',
      //       disease: [],
      //       symptom: [],
      //       jlcent:"",
      //       plcent:"",
      //   },

      result: [{
        type: "",
        decision: "",
        reason: "",
      }],

      date: [],

      info: {
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
      },

      personList: [{
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

      projectList: [{
        project: [{
          moId: '',
          name: '',
          code: '',
          amount: '',
        }]
      }],

      disease: "",

      symptom: "",

      personNameId: "",

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

    };
  },


  mounted: function () {
    const _this = this;
    axios.post('http://localhost:8018/drug/selectPerson', this.form).then(function (resp) {
      _this.personList = resp.data;
    });

  },


  methods: {
    selectMedicalOrder() {
      const _this = this;
      axios.post('http://localhost:8018/drug/selectMedicalOrder', this.info).then(function (resp) {
        _this.info.medicalOrder = resp.data;
        _this.projectList = [{
          project: [{
            moId: '',
            name: '',
            code: '',
            amount: '',
          }]
        }];
        _this.projectList[0].project = _this.info.medicalOrder.projectList;
        _this.date = [];
        _this.date.push(_this.info.medicalOrder.startDate);
        _this.date.push(_this.info.medicalOrder.endDate);
      });
    },
    insertMedicalOrder() {
      this.info.medicalOrder.projectList = this.projectList[0].project;
      this.info.medicalOrder.startDate = this.date[0];
      this.info.medicalOrder.endDate = this.date[1];
      const _this = this;
      axios.post('http://localhost:8018/drug/insertMedicalOrder', this.info).then(function (resp) {
      });
    },
    ypadd(index) {
      this.info.medicalOrder.formulaList[index].drugList.push({
        formulaId: '',
        name: '',
        route: '',
        dosageNum: '',
        dosageUnit: '',
        freqNum: '',
        freqUnit: '',
        amount: '',
        code: '',
      })
    },

    zladd(index) {
      this.projectList[index].project.push({
        moId: '',
        name: '',
        code: '',
        amount: '',
      })
    },

    ypaddTable() {
      this.info.medicalOrder.formulaList.push({
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
      });
    },

    zladdTable() {
      this.projectList.push({
        project: [{
          moId: '',
          name: '',
          code: '',
          amount: '',
        }]
      });
    },

    ypdel(index1, index2) {
      this.info.medicalOrder.formulaList[index1].drugList.splice(index2, 1);
    },

    zldel(index1, index2) {
      this.projectList[index1].project.splice(index2, 1);
    },

    ypdelTable(index) {
      this.info.medicalOrder.formulaList.splice(index, 1);
    },

    zldelTable(index) {
      this.projectList.splice(index, 1);
    },

    addDisease() {
      this.info.medicalOrder.diseaseList.push(this.disease);
      this.disease = "";
    },
    removeDisease(tag) {
      this.info.medicalOrder.diseaseList.splice(this.info.medicalOrder.diseaseList.indexOf(tag), 1);
    },
    addSymptom() {
      this.info.medicalOrder.symptomList.push(this.symptom);
      this.symptom = "";
    },
    removeSymptom(tag) {
      this.info.medicalOrder.symptomList.splice(this.info.medicalOrder.symptomList.indexOf(tag), 1);
    },

    jump() {
      //this.$router.push("/cart")
      //传递的参数用{{ $route.query.goodsId }}获取
      this.$router.push({path: '/results'})
      // this.$router.go(-2)
      //自动后退两步
    },

    onSubmit() {
      this.info.medicalOrder.projectList = this.projectList[0].project;
      this.info.medicalOrder.startDate = this.date[0];
      this.info.medicalOrder.endDate = this.date[1];
      let basicInfo = {};
      basicInfo["name"] = "姓名：" + this.info.person.name;
      basicInfo["age"] = "年龄：" + Math.floor(this.info.person.age / 365);
      basicInfo["gender"] = "性别：" + this.info.person.gender;
      basicInfo["cardId"] = "卡号：" + this.info.person.cardId;
      basicInfo["bsCondition"] = "病生状态描述：" + this.info.medicalOrder.bsCondition;
      let disease = "疾病：", symptom = "症状：", drugString = "药品处方：", projectString = "诊疗项目：";
      for (let i = 0; i < this.info.medicalOrder.diseaseList.length; i++) {
        disease += this.info.medicalOrder.diseaseList[i] + "  ";
      }
      for (let i = 0; i < this.info.medicalOrder.symptomList.length; i++) {
        symptom += this.info.medicalOrder.symptomList[i] + "  ";
      }
      for (let i = 0; i < this.info.medicalOrder.formulaList.length; i++) {
        for (let j = 0; j < this.info.medicalOrder.formulaList[i].drugList.length; j++) {
          let drug = this.info.medicalOrder.formulaList[i].drugList[j];
          drugString += "【" + drug.name + "】" + "  " + drug.route + "  " + drug.dosageNum + drug.dosageUnit + "  " + drug.freqNum + drug.freqUnit + "  " + drug.amount + "  ";
        }
      }
      for (let i = 0; i < this.info.medicalOrder.projectList.length; i++) {
        let project = this.info.medicalOrder.projectList[i];
        projectString += "【" + project.name + "】" + "  " + project.code + "  " + project.amount + "  ";
      }
      basicInfo["disease"] = disease;
      basicInfo["symptom"] = symptom;
      basicInfo["drug"] = drugString;
      basicInfo["project"] = projectString;
      this.basicInfo = basicInfo;

      const _this = this;
      axios.post('http://localhost:8018/drug/check', this.info).then(function (resp) {
        _this.result = resp.data;
        let routeData = _this.$router.resolve({
          path: '/check/results',
          query: {result: JSON.stringify(_this.result), basicInfo: JSON.stringify(_this.basicInfo)}
        });
        window.open(routeData.href, '_parent');
      });
      // let routeData = this.$router.resolve({ path: '/results', query: {result: JSON.stringify(_this.result)}});
      // window.open(routeData.href, '_blank');
    },

    save() {

    },

    reset() {
      this.result = [{
        type: "",
        decision: "",
        reason: "",
      }];
      this.date = [];
      this.info = {
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
      };

      this.personList = [{
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
      }];

      this.projectList = [{
        project: [{
          moId: '',
          name: '',
          code: '',
          amount: '',
        }]
      }];

      this.basicInfo = {
        name: "",
        gender: "",
        age: "",
        cardId: "",
        disease: "",
        symptom: "",
        bsCondition: "",
        drug: "",
        project: ""
      };
    },

  }
};
</script>
