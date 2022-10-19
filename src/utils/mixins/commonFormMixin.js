import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false /* doesn't work with directive */,
      },
    };
  },
  mounted() {
    const isThisStepAlreadyRenderedBefore = this.getStepsRendered.findIndex(
      (step) => step.name === this.$options.name
    );
    let count = 0;
    let updatedArray = this.getStepsRendered;
    if (isThisStepAlreadyRenderedBefore >= 0) {
      count = this.getStepsRendered.find((step) => this.$options.name === step.name).count + 1;
      updatedArray = this.getStepsRendered.slice(0, isThisStepAlreadyRenderedBefore).concat(this.getStepsRendered.slice(-isThisStepAlreadyRenderedBefore));
      this.updateStepsRendered([...updatedArray, { name: this.$options.name, count }]);

      // After user on the page update the render time parameter 1s
      setTimeout(() => {
        count = this.getStepsRendered.find((step) => this.$options.name === step.name).count + 1;
        updatedArray = this.getStepsRendered.slice(0, isThisStepAlreadyRenderedBefore).concat(this.getStepsRendered.slice(-isThisStepAlreadyRenderedBefore));
      }, 1000);
    }else {
      this.updateStepsRendered([...this.getStepsRendered, { name: this.$options.name, count: 0 }]); 
    }
  },
  methods: {
    ...mapActions(["updateStepsRendered"]),
  },
  computed: {
    ...mapGetters(["getStepsRendered"]),
  },
};
