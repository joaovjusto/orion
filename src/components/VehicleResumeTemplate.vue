<template>
  <div id="vehicle-resume">
    <div 
      id="vehicle-resume-template"
      class="body"
      ref="template"
    >
      <div class="text-center">
        <img
          height="80"
          src="../assets/vision-logo-temp.png"
          alt=""
        />
        <img
          width="550"
          src="../assets/vehicles.png"
          alt=""
          class="template-images"
        />
        <div class='align-left resume'>
          <div class="container">
            <img
              class="icon"
              height="30"
              src="../assets/currency.png"
              alt=""
            />
            <div>
              <p>Cotação | {{ new Date() | formatDate }}</p>
              <strong class="info">{{ getCurrencyText }} {{  vehicleData.currencyTax }}</strong>
            </div>
          </div>
          <div class="container">
            <img
              class="icon"
              height="30"
              src="../assets/car.png"
              alt=""
            />
            <div>
              <p>Veículo Cotado</p>
              <strong class="info">{{ vehicleData.product }}</strong>
            </div>
          </div>
          <div class="container">
            <img
              class="icon"
              height="30"
              src="../assets/price-tag.png"
              alt=""
            />
            <div>
              <p>Valor Estimado</p>
              <strong class="info">{{ getTotalValue }}</strong>
            </div> 
          </div>
        </div>
        <div class="url">
          www.visioncomex.com.br
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "VehicleResumeTemplate",
  data() {
    return { };
  },
  computed: {
    ...mapGetters({
      vehicleData: 'getVehicleDataFromCache',
      currency: 'getCurrency',
      resumeDataFromCache: 'getResumeDataFromCache',
    }),
    getCurrencyText() {
      switch(this.vehicleData.currency) {
        case 'USD': return 'Dólar'
        case 'EUR': return 'Euro'
        default: return ''
      }
    },
    getTotalValue() {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(0
        // this.resumeDataFromCache.totalCost
        );
    },
  },
}
</script>

<style lang="scss" scoped>
.body {
    width: 550px;
    height: 550px;
    background-color: white;
    padding: 10px 0px;
    border: 1px solid black;
    font-family: "Acumin letiable Concept", sans-serif;
    color: #7b7b7b;
    letter-spacing: 0.8px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}
.template-images {
  margin-top: -50px;
}
.resume {
  border-radius: 16px;
  background-color: #f3f3f3;
  padding: 0px 16px 16px;
  margin: 32px;
}
.align-left {
    display: flex;
    justify-content: left;
    flex-direction: column;
}
.icon {
  display: flex;
  align-self: center;
  padding-right: 10px;
}

.container {
  padding-top: 16px;
  display: flex;
  text-align: left
}

.url {
  margin-top: 32px;
  font-size: 20px;
  letter-spacing: 1.5px;
}

p {
  margin: 0;
  font-size: 16px;
}
strong {
  font-size: 24px;
  line-height: 20px;
  text-transform: capitalize;
}
</style>