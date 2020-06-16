<template>
    <div v-show="isVisible">
        {{errorMessage}}
        <p>
            Please try again later.
        </p>
        <button type="button" v-show="$store.state.errorAction === 'load'" @click="hidePopup() && reload()">Reload</button>
        <button type="button" @click="hidePopup()">Close</button>
    </div>

</template>

<script>
    export default {
        name: "ErrorPopup",
        methods: {
            hidePopup() {
                this.$store.dispatch('hidePopup');
                return true;
            },
            reload() {
                this.$store.dispatch('load');
            }
        },
        computed: {
            isVisible() {
                return this.$store.state.errorVisible;
            },
            errorMessage() {
                return this.$store.state.error;
            }
        }
    }
</script>

<style scoped>

    div {
        position: fixed;
        top: 50%;
        left: 30%;
    }

</style>
