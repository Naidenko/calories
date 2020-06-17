<template>
    <div v-show="isVisible" class="error-delete-popup">
        <p class="error__text">{{errorMessage}}</p>
        <p class="error__text">Please delete again</p>
        <button type="button" class="error__close button" @click="hidePopup()">Close</button>
    </div>

</template>

<script>
    export default {
        name: "DeleteErrorPopup",
        methods: {
            hidePopup() {
                this.$store.dispatch('hidePopup');
                return true;
            }
        },
        computed: {
            isVisible() {
                return this.$store.state.errorVisible && this.$store.state.errorAction === 'delete';
            },
            errorMessage() {
                return this.$store.state.error;
            }
        }
    }
</script>
