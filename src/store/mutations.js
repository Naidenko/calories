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
    deleteByIds(state, payload) {
        for (let i = 0; i < payload.ids.length; i++) {
            for (let j = 0; j < state.data.length; j++) {
                if(state.data[j].id === payload.ids[i]) {
                    state.data.splice(j, 1);
                    break;
                }
            }
        }

    }
}
