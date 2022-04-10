import Vue from "vue";

import app from "@/app.vue";


let $vueawa = new Vue({
  render: function (h) {
    return h(app);
  },

 
});
$vueawa.$mount("#awa");