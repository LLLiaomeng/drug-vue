<template>
  <div>
    <el-card class="box-card">
      <el-card class="box-card">
        <el-row>
          <el-col :span="5">
            <div class="grid-content ">{{ basicInfo.name }}</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content ">{{ basicInfo.gender }}</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content ">{{ basicInfo.age }}</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content ">{{ basicInfo.cardId }}</div>
          </el-col>
          <!--            <el-col :span="4"><div class="grid-content ">-->
          <!--                <router-link to='/patientManage'>患者详情</router-link>-->
          <!--            </div></el-col>-->
          <el-col :span="24">
            <div class="grid-content ">{{ basicInfo.disease }}</div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content ">{{ basicInfo.symptom }}</div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content ">{{ basicInfo.bsCondition }}</div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content ">{{ basicInfo.drug }}</div>
          </el-col>
        </el-row>
      </el-card>
      <!--      <br>-->
      <!--      <el-card class="box-card">-->
      <!--        <el-row>-->
      <!--          &lt;!&ndash;            <el-col :span="24"><div class="grid-content "> 医嘱信息： </div></el-col>&ndash;&gt;-->
      <!--          <el-col :span="24">-->
      <!--            <div class="grid-content ">{{ basicInfo.drug }}</div>-->
      <!--          </el-col>-->
      <!--          &lt;!&ndash;          <el-col :span="24"><div class="grid-content ">{{ basicInfo.project }}</div></el-col>&ndash;&gt;-->
      <!--        </el-row>-->
      <!--      </el-card>-->
      <br>
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="合理用药审查" name="first">
          <el-col style="height: 10px"></el-col>
          <el-card class="box-card">
            <el-table ref="result" :data="result" empty-text='暂无数据' style="width: 100%">
              <el-table-column label="合理用药审查类型" prop="type"></el-table-column>
              <el-table-column label="审查结果" prop="decision"></el-table-column>
              <el-table-column label="原因" prop="reason"></el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>

        <!--        <el-tab-pane label="医保控费审查" name="second">-->
        <!--            <el-col style="height: 10px"></el-col>-->
        <!--            <el-card class="box-card">-->
        <!--                <el-table  ref="result" :data="result" empty-text='暂无数据' style="width: 100%">-->
        <!--                    <el-table-column label="医保控费审查类型" prop="type"></el-table-column>-->
        <!--                    <el-table-column label="审查结果" prop="decision"></el-table-column>-->
        <!--                    <el-table-column label="原因" prop="reason"></el-table-column>-->
        <!--                </el-table>-->
        <!--            </el-card>-->
        <!--        </el-tab-pane>-->
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: [],
      activeName2: 'first',
      basicInfo: {}
    };
  },
  created: function () {
    this.result = JSON.parse(this.$route.query.result);
    this.basicInfo = JSON.parse(this.$route.query.basicInfo);
  },
  watch: {
    $route(to) {
      this.result = JSON.parse(this.$route.query.result);
      this.basicInfo = JSON.parse(this.$route.query.basicInfo);
    },
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  }

}
</script>

<style>

.grid-content {
  border-radius: 4px;
  min-height: 50px;
}

</style>
