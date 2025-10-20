import axios from 'axios'

const state = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token')
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_TOKEN(state, token) {
    state.token = token
    state.isAuthenticated = !!token
  },
  LOGOUT(state) {
    state.user = null
    state.token = null
    state.isAuthenticated = false
  }
}

const actions = {
  async register({ commit }, userData) {
    try {
      console.log('Attempting registration with:', userData)
      
      const response = await axios.post('/api/auth/SignUp', userData, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Registration response:', response.data)
      
      const { token, user } = response.data
      
      localStorage.setItem('token', token)
      commit('SET_TOKEN', token)
      commit('SET_USER', user)
      
      return { success: true, message: response.data.message }
    } catch (error) {
      console.error('Registration error:', error)
      
      let errorMessage = 'Registration failed'
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || 
                      error.response.data?.error || 
                      `Server error: ${error.response.status}`
        console.error('Server error details:', error.response.data)
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Check if backend is running.'
        console.error('No response received:', error.request)
      } else {
        // Something else happened
        errorMessage = error.message
      }
      
      return { 
        success: false, 
        message: errorMessage 
      }
    }
  },

  async login({ commit }, credentials) {
    try {
      const response = await axios.post('/api/auth/login', credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const { token, user } = response.data
      
      localStorage.setItem('token', token)
      commit('SET_TOKEN', token)
      commit('SET_USER', user)
      
      return { success: true, message: response.data.message }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      }
    }
  },

  logout({ commit }) {
    localStorage.removeItem('token')
    commit('LOGOUT')
  }
}

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  currentUser: state => state.user
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}