import { createStore } from 'vuex'
import auth from './modules/auth'
import menu from './modules/menu'
import cart from './modules/cart' // Add this import

export default createStore({
  modules: {
    auth,
    menu,
    cart // Add this
  }
})