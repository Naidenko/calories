<template>
    <div v-show="isVisible" class="confirm-popup">
        <p class="confirm__text">Are you sure you want to <span class="confirm__text--bold">delete item?</span></p>
        <button type="button" class="confirm__close button" @click="hidePopup()">Cancel</button>
        <button type="button" class="confirm__retry button" @click="confirm()">Confirm</button>
    </div>
</template>

<script>
    export default {
        name: "DeleteConfirmPopup",
        data() {
            return {
                isVisible: false,
            }
        },
        methods: {
            hidePopup() {
                this.isVisible = false;
            },
            showPopup() {
                this.isVisible = true;
            },
            confirm() {
                this.$emit('confirm')
            }
        }
    }
</script>

<style scoped>

</style>
