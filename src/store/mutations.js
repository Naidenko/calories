export default {
    setData(state, payload) {
        state.data = payload.data;
    },
    setError(state, payload) {
        state.error = payload.error;
        state.errorAction = payload.errorAction;
    },
    setErrorVisible(state, payload) {
        state.errorVisible = payload.errorVisible;
    },
    deleteById(state, payload) {
        for (let i = 0; i < state.data.length; i++) {
            if(state.data[i].id === payload.id) {
                state.data.splice(i, 1);
                break;
            }
        }
    }
}
