const state = {
  items: [],
  total: 0
};

const mutations = {
  SET_CART_ITEMS(state, items) {
    state.items = items;
    state.total = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  ADD_TO_CART(state, item) {
    const existingItem = state.items.find(i => 
      i.id === item.id && i.specialInstructions === item.specialInstructions
    );
    
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      state.items.push({ ...item });
    }
    
    state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    localStorage.setItem('cartItems', JSON.stringify(state.items));
  },
  
  REMOVE_FROM_CART(state, itemId) {
    state.items = state.items.filter(item => item.id !== itemId);
    state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    localStorage.setItem('cartItems', JSON.stringify(state.items));
  },
  
  UPDATE_QUANTITY(state, { itemId, quantity }) {
    const item = state.items.find(item => item.id === itemId);
    if (item) {
      item.quantity = quantity;
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    }
  },
  
  CLEAR_CART(state) {
    state.items = [];
    state.total = 0;
    localStorage.removeItem('cartItems');
  }
};

const actions = {
  addToCart({ commit }, item) {
    commit('ADD_TO_CART', item);
  },
  
  removeFromCart({ commit }, itemId) {
    commit('REMOVE_FROM_CART', itemId);
  },
  
  updateQuantity({ commit }, payload) {
    commit('UPDATE_QUANTITY', payload);
  },
  
  clearCart({ commit }) {
    commit('CLEAR_CART');
  },
  
  loadCart({ commit }) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    commit('SET_CART_ITEMS', cartItems);
  }
};

const getters = {
  cartItems: state => state.items,
  cartTotal: state => state.total,
  cartItemCount: state => state.items.reduce((count, item) => count + item.quantity, 0)
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
