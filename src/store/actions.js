import {getProducts, deleteProducts} from '../vendor/request'
export default {
    delete(context, ids) {
        return new Promise((resolve, reject) => {
            deleteProducts().then(()=> {
                context.commit('deleteByIds', {ids: ids});
                resolve();
            }).catch((error)=> {
                context.commit('setError', {error: error.error, errorAction: 'delete'});
                context.commit('setErrorVisible', {errorVisible: true})
                reject();
            })
        });
    },
    load(context) {
        getProducts().then((products)=> {
            context.commit('setData', {data: products})
        }).catch((error)=> {
            context.commit('setError', {error: error.error, errorAction: 'load'});
            context.commit('setErrorVisible', {errorVisible: true})
        })
    },
    hidePopup(context) {
        context.commit('setErrorVisible', {errorVisible: false})
    }
}
