<template>
  <div>
    name : {{ name }} <br />
    tele : {{ tele }} <br />
    emaile : {{ email }}
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      tele: "",
      email: "",
    };
  },
  mounted() {
    axios
      .get("/api/contacts/1")
      .then( (response) =>{
          let data = response.data
          this.name=data.name
          this.tele=data.tel
          this.email=data.email

      })
      .catch( (response)=> {
          console.log(response);

      });
  },
};
</script>

<style>
</style>