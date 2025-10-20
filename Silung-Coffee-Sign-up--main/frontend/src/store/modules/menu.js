import axios from 'axios'

const state = {
  menuItems: [],
  loading: false
}

const mutations = {
  SET_MENU_ITEMS(state, items) {
    state.menuItems = items
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

const actions = {
  async fetchMenuItems({ commit }) {
    commit('SET_LOADING', true)
    try {
      const response = await axios.get('/api/menu')
      commit('SET_MENU_ITEMS', response.data)
    } catch (error) {
      console.error('Error fetching menu items:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

const getters = {
  menuItems: state => state.menuItems,
  menuByCategory: state => {
    const categories = {}
    state.menuItems.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = []
      }
      categories[item.category].push(item)
    })
    return categories
  },
  loading: state => state.loading
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
