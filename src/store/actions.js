import {getProducts, deleteProducts} from '../vendor/request'
export default {
    delete(context, id) {
        deleteProducts().then(()=> {
            context.commit('deleteById', {id: id})
        }).catch((error)=> {
            context.commit('setError', {error: error.error, errorAction: 'delete'})
            context.commit('setErrorVisible', true)
        })
    },
    load(context) {
        getProducts().then((products)=> {
            context.commit('setData', {data: products})
        }).catch((error)=> {
            context.commit('setError', {error: error.error, errorAction: 'load'})
            context.commit('setErrorVisible', {errorVisible: true})
        })
    },
    hidePopup(context) {
        context.commit('setErrorVisible', {errorVisible: false})
    }
}
