<template>
  <div>
    <div class="stepper-container d-flex justify-content-between" v-if="$mq !== 'sm'">
      <template v-for="(step, i) in steps">
        <span
          @click="setActiveStep(i + 1)"
          :class="`step ${activeStep === i ? 'active' : ''}`"
          :key="i"
          >{{ step.title }}</span
        >
        <span
          :key="i + 100"
          v-if="i + 1 < steps.length"
          class="material-icons next-item"
        >
          chevron_right
        </span>
      </template>
    </div>
    <div v-else class="text-center">
      <div class="stepper-container stepper-container--mobile" v-for="(step, i) in steps" :key="i">
        <span
          @click="setActiveStep(i + 1)"
          :class="`step ${activeStep === i ? 'active' : ''}`"
          :key="i"
          >{{ step.title }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { mapActions } from "vuex";

export default {
  name: "StepDescription",
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
    activeStep: {
      type: Number,
      default: 1,
    },
  },
  mounted() {
    // Change to last step used if has it on cache
    const lastActiveStep = parseFloat(Cookies.get("lastActiveStep"));
    if (lastActiveStep) {
      this.setActiveStep(lastActiveStep);
    } else {
      Cookies.set("lastActiveStep", 1);
    }
  },
  methods: {
    ...mapActions(["updateAllSteps"]),
    setActiveStep(number) {
      this.$emit("changeStep", number);
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
  &--mobile {
    padding: unset;
    text-align: center;
    margin: 0 10px 15px 0;
    max-width: max-content;
    display: inline-block;
  }
  .step {
    user-select: none;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    transition: 0.2s linear all;
    background-color: transparent;
    &:hover,
    &.active {
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
