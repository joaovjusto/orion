<template>
  <div class="stepper-container d-flex justify-content-between">
    <template
      v-for="(step, i) in steps"
    >
      <span @click="setActiveStep(i+1)" :class="`step ${active === (i+1) ? 'active': ''}`" :key="i">{{ step }}</span>
      <span :key="i" v-if="i + 1 < steps.length" class="material-icons next-item">
        chevron_right
      </span>
    </template>
  </div>
</template>
``
<script>
export default {
  name: "StepDescription",
  data() {
    return {
      active: 1,
      steps: [
        "Veículo",
        "Despesas",
        "Tributos",
        "Aduaneira",
        "Finalização",
        "Revisão",
      ],
    };
  },
  methods: {
    setActiveStep(number) {
      this.active = number;
    },
  },
};
</script>

<style lang="scss" scoped>
.stepper-container {
  padding: 13px 8%;
  border-radius: 4px;
  background: #424242;
  align-items: center;
  align-content: center;
  .step {
    user-select: none;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    transition: .2s linear all;
    background-color: transparent;
    &:hover, &.active {
      background-color: #fff;
      color: #424242;
    }
  }
  .next-item {
    user-select: none;
    cursor: pointer;
    color: #fff;
  }
}
</style>
