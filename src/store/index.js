import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    descriptionData: "<p>Tesla Model 3 Performance, 2023/2023, com full auto-pilot, interior alpine white e preto, com 5 bancos, carregador rápido extra e também uma capa personalizada para ser usada em ambientes fechados.&nbsp;</p><ul><li>Motor V8 4.0 Biturbo + 3 Motores Elétricos&nbsp;</li><li>1.000 cv de Potência Combinada&nbsp;</li><li>81,5 Kgfm de Torque&nbsp;</li><li>Câmbio Automatizado de Dupla Embreagem de 8 Velocidades&nbsp;</li><li>Tração Integral&nbsp;</li><li>Aceleração de 0 a 100 km/k em 2,5 s&nbsp;</li><li>Aceleração de 0 a 200 km/h em 6,7 s&nbsp;</li><li>Velocidade Máxima de 340 km/h</li></ul>",
    videoData: {},
    loading: false,
    stepsRendered: [],
    vehicleData: {},
    clientData: {},
    costData: {},
    tributeData: {},
    importData: {},
    // finalStep: {},
    resumeData: {},
    currency: {},
    imagesCarTemplate: [],
    user: {},
    proposal: null
  },
  actions,
  mutations,
  getters,
});
