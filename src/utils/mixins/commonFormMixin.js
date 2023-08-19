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
    const selectedStep = this.getStepsRendered.find(
      (step) => step.name === this.$options.name
    );
    let count = 0;

    if (selectedStep) {
      const newArr = this.getStepsRendered.map((item) => {
        if (item.name !== this.$options.name) {
          return item
        } else {
          return { name: this.$options.name, count: count + 1 }
        }
      });
      this.updateStepsRendered(newArr)
    }else {
      this.updateStepsRendered([...this.getStepsRendered, { name: this.$options.name, count: count}])
    }

     // After user on the page update the render time parameter 1s
      setTimeout(() => {
        const newArr = this.getStepsRendered.map((item) => {
          if (item.name !== this.$options.name) {
            return item
          } else {
            return { name: this.$options.name, count: count + 1 }
          }
        });
        this.updateStepsRendered(newArr)
      }, 1000);
  },
  methods: {
    ...mapActions(["updateStepsRendered"]),
  },
  computed: {
    ...mapGetters(["getStepsRendered"]),
  },
};
