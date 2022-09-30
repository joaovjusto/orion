<template>
  <div>
    <div class="header">
      {{ title }}
    </div>
    <div class="form-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "FormContainer",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .header {
        text-align: center;
        padding: 10px 15px;
        background-color: #424242;
        color: #fff;
        border-radius: 4px 4px 0 0;
    }
    .form-body {
        border-radius: 0 0 4px 4px;
        padding: 10px 15px;
        background-color: #f3f3f3;
    }
</style>
