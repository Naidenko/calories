<template>
  <div id="app" class="main">
    <table-component></table-component>
    <error-popup></error-popup>
    <delete-error-popup></delete-error-popup>
  </div>
</template>

<script>
import TableComponent from './components/Table'
import ErrorPopup from "./components/ErrorPopup";
import DeleteErrorPopup from "./components/DeleteErrorPopup";

export default {
  name: 'App',
  components: {
    DeleteErrorPopup,
    ErrorPopup,
    TableComponent
  },
  mounted() {
    this.$store.dispatch('load');
  }
}
</script>
