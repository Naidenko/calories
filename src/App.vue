<template>
  <div id="app">
    <table-component></table-component>
    <error-popup></error-popup>
  </div>
</template>

<script>
import TableComponent from './components/Table'
import ErrorPopup from "./components/ErrorPopup";

export default {
  name: 'App',
  components: {
    ErrorPopup,
    TableComponent
  },
  mounted() {
    this.$store.dispatch('load');
  }
}
</script>
