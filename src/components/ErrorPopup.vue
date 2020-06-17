<template>
    <div v-show="isVisible" class="error-popup">
        <p class="error__text">{{errorMessage}}</p>
        <p class="error__text">Please try again</p>
        <button type="button" class="error__retry button" v-show="$store.state.errorAction === 'load'" @click="hidePopup() && reload()">Reload</button>
        <button type="button" class="error__close button" @click="hidePopup()">Close</button>
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
