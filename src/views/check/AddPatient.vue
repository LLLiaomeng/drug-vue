<template>
  <div>
    <el-container>
      <el-main>
        <el-card class="box-card">

          <el-form ref="form" :model="person" label-width="100px">
            <el-row>
              <el-col :span="6">
                <el-form-item label="卡号">
                  <el-input v-model="person.cardId" placeholder="新增患者填-1">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="姓名">
                  <el-input v-model="person.name" placeholder="请输入姓名">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="性别">
                  <el-select v-model="person.gender" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="出生日期">
                  <el-date-picker
                    v-model="person.birthday"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="体重">
                  <el-input v-model="person.weight" placeholder="请输入体重（kg）">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="身高">
                  <el-input v-model="person.height" placeholder="请输入身高（cm）">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="人群类型">
                  <el-checkbox-group v-model="person.crowdList">
                    <el-checkbox label="成人" name="type"></el-checkbox>
                    <el-checkbox label="儿童" name="type"></el-checkbox>
                    <el-checkbox label="老人" name="type"></el-checkbox>
                    <el-checkbox label="孕妇" name="type"></el-checkbox>
                    <el-checkbox label="哺乳期" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="特殊人群类型">
              <el-tag v-for="d in person.specialCrowdList" closable @close="removeSpecialCrowd(d)">{{ d }}</el-tag>
              <span @keyup.enter="addSpecialCrowd"><el-input v-model="specialCrowd"></el-input></span>
              <el-button type="primary" size="small" icon="el-icon-plus" @click="addSpecialCrowd">添加特殊人群类型</el-button>
            </el-form-item>
            <el-form-item label="过敏原">
              <el-tag v-for="d in person.allergyList" closable @close="removeAllergy(d)">{{ d }}</el-tag>
              <span @keyup.enter="addAllergy"><el-input v-model="allergy"></el-input></span>
              <el-button type="primary" size="small" icon="el-icon-plus" @click="addAllergy">添加过敏原</el-button>
            </el-form-item>
          </el-form>

          <el-form ref="formName" :model="person">

            <el-form-item style="height: 10px"></el-form-item>

            <el-form-item style="text-align: center">
              <el-button type="primary" @click="insertPerson">保存</el-button>
              <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-col style="height: 20px"></el-col>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  data() {
    return {
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

      specialCrowd: "",
      allergy: "",

    };
  },
  methods: {

    addAllergy() {
      this.person.allergyList.push(this.allergy);
      this.allergy = "";
    },
    removeAllergy(tag) {
      this.person.allergyList.splice(this.person.allergyList.indexOf(tag), 1);
    },
    addSpecialCrowd() {
      this.person.specialCrowdList.push(this.specialCrowd);
      this.specialCrowd = "";
    },
    removeSpecialCrowd(tag) {
      this.person.specialCrowdList.splice(this.person.specialCrowdList.indexOf(tag), 1);
    },
    insertPerson() {
      const _this = this;
      axios.post('http://localhost:8018/drug/insertPerson', this.person).then(function (resp) {
        // _this.result = resp.data;
      });
      console.log(this.person);
      console.log('submit!');
    },
    reset() {
      this.person = {
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
      };
      this.specialCrowd = "";
      this.allergy = ""
    }
  }
};
</script>
