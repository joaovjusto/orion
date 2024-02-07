<template>
  <div>
    <div class="header d-flex">
      <span class="pl-2">
        {{ title }}
      </span>
      <el-button type="primary" @click="consolidateValues()" class="mr-2">Consolidar</el-button>
    </div>
    <div ref="test" class="form-body">
      <slot />

      <el-row>
        <el-col :span="12">
          <el-button @click="handleCancel" class="mr-2">Cancelar</el-button>
        </el-col>
        <el-col :span="12">
          <div class="d-flex justify-content-end w-100">
            <el-button v-if="activeStep > 0" @click="changeStep(activeStep)" class="mr-2">Voltar</el-button>
            <el-button v-if="activeStep < steps.length - 1" @click="changeStep(activeStep + 2)"
              type="primary">Avançar</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FormContainer",
  props: {
    title: {
      type: String,
      default: "",
    },
    activeStep: {
      type: Number,
      default: 0,
    },
    steps: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapActions([
      "updateAllSteps",
      "setProposal"
    ]),
    consolidateValues() {
      for (let index = 0; index < 3; index++) {
        this.$slots.default[0].componentInstance.inputChanged()
      }
    },  
    changeStep(step) {
      this.$emit("changeStep", step);
    },
    handleCancel() {
      try {
        this.updateAllSteps();
        this.setProposal({})
        this.$router.push('/propostas')
      } catch (error) {
        this.$router.push('/propostas')
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  text-align: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #424242;
  color: #fff;
  border-radius: 4px 4px 0 0;
  span {
    margin-top: 8px;
  }
}

.form-body {
  border-radius: 0 0 4px 4px;
  padding: 10px 15px;
  background-color: #f3f3f3;
}
</style>
