<template>
  <div class="checkout-page">
    <Navbar />
    
    <section class="section">
      <div class="container">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <router-link to="/menu" class="breadcrumb-link">Menu</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Checkout</span>
        </div>

        <div class="checkout-header">
          <h1 class="heading">Checkout</h1>
          <p class="subheading">Complete your order</p>
        </div>

        <div v-if="cartItems.length === 0" class="empty-cart">
          <div class="empty-cart-content">
            <div class="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some delicious items from our menu before checking out!</p>
            <router-link to="/menu" class="btn btn-primary">
              Back to Menu
            </router-link>
          </div>
        </div>

        <div v-else class="checkout-content">
          <div class="checkout-layout">
            <!-- Left Column - Order Details & Customer Info -->
            <div class="checkout-left">
              <!-- Order Summary -->
              <div class="checkout-section">
                <h3 class="section-title">Order Summary</h3>
                <div class="order-items">
                  <div
                    v-for="item in cartItems"
                    :key="item.id"
                    class="order-item"
                  >
                    <img
                      :src="item.image || '/images/placeholder-food.jpg'"
                      :alt="item.name"
                      class="order-item-image"
                    />
                    <div class="order-item-details">
                      <h4>{{ item.name }}</h4>
                      <p class="item-price">₱{{ item.price }} × {{ item.quantity }}</p>
                      <p v-if="item.specialInstructions" class="special-instructions">
                        Note: {{ item.specialInstructions }}
                      </p>
                    </div>
                    <div class="order-item-total">
                      ₱{{ (item.price * item.quantity).toFixed(2) }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Customer Information -->
              <div class="checkout-section">
                <h3 class="section-title">Customer Information</h3>
                <form @submit.prevent="submitOrder" class="customer-form">
                  <div class="form-row">
                    <div class="form-group">
                      <label for="name">Full Name *</label>
                      <input
                        id="name"
                        v-model="customerInfo.name"
                        type="text"
                        required
                        class="form-input"
                        placeholder="Enter your full name"
                      >
                    </div>
                    <div class="form-group">
                      <label for="phone">Phone Number *</label>
                      <input
                        id="phone"
                        v-model="customerInfo.phone"
                        type="tel"
                        required
                        class="form-input"
                        placeholder="Enter your phone number"
                      >
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input
                      id="email"
                      v-model="customerInfo.email"
                      type="email"
                      required
                      class="form-input"
                      placeholder="Enter your email address"
                    >
                  </div>

                  <div class="form-group">
                    <label for="address">Delivery Address *</label>
                    <textarea
                      id="address"
                      v-model="customerInfo.address"
                      required
                      class="form-input"
                      rows="3"
                      placeholder="Enter your complete delivery address"
                    ></textarea>
                  </div>

                  <div class="form-group">
                    <label for="notes">Additional Notes (Optional)</label>
                    <textarea
                      id="notes"
                      v-model="customerInfo.notes"
                      class="form-input"
                      rows="2"
                      placeholder="Any special delivery instructions?"
                    ></textarea>
                  </div>
                </form>
              </div>

              <!-- Payment Method -->
              <div class="checkout-section">
                <h3 class="section-title">Payment Method</h3>
                <div class="payment-methods">
                  <label
                    v-for="method in paymentMethods"
                    :key="method.id"
                    class="payment-method"
                    :class="{ 'payment-method-active': paymentMethod === method.id }"
                  >
                    <input
                      v-model="paymentMethod"
                      type="radio"
                      :value="method.id"
                      class="payment-radio"
                    >
                    <div class="payment-method-content">
                      <span class="payment-icon">{{ method.icon }}</span>
                      <span class="payment-name">{{ method.name }}</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Right Column - Order Total & Actions -->
            <div class="checkout-right">
              <div class="order-summary-card">
                <h3 class="card-title">Order Total</h3>
                
                <div class="summary-line">
                  <span>Subtotal:</span>
                  <span>₱{{ cartTotal.toFixed(2) }}</span>
                </div>
                
                <div class="summary-line">
                  <span>Delivery Fee:</span>
                  <span>₱{{ deliveryFee.toFixed(2) }}</span>
                </div>
                
                <div class="summary-line total">
                  <span>Total:</span>
                  <span>₱{{ orderTotal.toFixed(2) }}</span>
                </div>

                <div class="estimated-delivery">
                  <span class="delivery-icon">⏱️</span>
                  <span>Estimated delivery: 30-45 minutes</span>
                </div>

                <button
                  @click="submitOrder"
                  :disabled="processingOrder"
                  class="btn btn-primary place-order-btn"
                >
                  <span v-if="processingOrder" class="btn-loading">
                    <span class="spinner"></span>
                    Processing...
                  </span>
                  <span v-else>Place Order</span>
                </button>

                <router-link to="/menu" class="btn btn-secondary modify-order-btn">
                  Modify Order
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Order Confirmation Modal -->
    <div v-if="showConfirmation" class="modal-overlay" @click="closeConfirmation">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Order Confirmed! 🎉</h3>
        </div>
        
        <div class="modal-body">
          <div class="confirmation-content">
            <div class="confirmation-icon">✅</div>
            <h4>Thank you for your order, {{ customerInfo.name }}!</h4>
            <p>Your order has been received and is being prepared.</p>
            
            <div class="order-details">
              <div class="detail-item">
                <span class="detail-label">Order Number:</span>
                <span class="detail-value">{{ orderNumber }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Estimated Delivery:</span>
                <span class="detail-value">30-45 minutes</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Total Amount:</span>
                <span class="detail-value">₱{{ orderTotal.toFixed(2) }}</span>
              </div>
            </div>
            
            <p class="confirmation-note">
              We'll send order updates to {{ customerInfo.phone }} and {{ customerInfo.email }}
            </p>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn btn-primary" @click="goToHome">
            Back to Home
          </button>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Checkout',
  components: { Navbar, Footer },
  data() {
    return {
      processingOrder: false,
      showConfirmation: false,
      orderNumber: '',
      customerInfo: {
        name: '',
        phone: '',
        email: '',
        address: '',
        notes: ''
      },
      paymentMethod: 'cash',
      paymentMethods: [
        { id: 'cash', name: 'Cash on Delivery', icon: '💵' },
        { id: 'gcash', name: 'GCash', icon: '📱' },
        { id: 'card', name: 'Credit/Debit Card', icon: '💳' }
      ],
      deliveryFee: 50
    }
  },
  computed: {
    cartItems() {
      // Get cart items from Vuex store or local storage
      return this.$store?.state?.cart?.items || JSON.parse(localStorage.getItem('cartItems')) || []
    },
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    },
    orderTotal() {
      return this.cartTotal + this.deliveryFee
    }
  },
  methods: {
    generateOrderNumber() {
      return 'ORD-' + Date.now().toString().slice(-6)
    },
    async submitOrder() {
      // Validate form
      if (!this.customerInfo.name || !this.customerInfo.phone || 
          !this.customerInfo.email || !this.customerInfo.address) {
        alert('Please fill in all required fields')
        return
      }

      this.processingOrder = true

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Generate order number
        this.orderNumber = this.generateOrderNumber()
        
        // Create order object
        const order = {
          orderNumber: this.orderNumber,
          customerInfo: this.customerInfo,
          items: this.cartItems,
          paymentMethod: this.paymentMethod,
          subtotal: this.cartTotal,
          deliveryFee: this.deliveryFee,
          total: this.orderTotal,
          status: 'confirmed',
          timestamp: new Date().toISOString()
        }

        // Save order to localStorage or send to backend
        this.saveOrder(order)
        
        // Clear cart
        this.clearCart()
        
        // Show confirmation
        this.showConfirmation = true
        
      } catch (error) {
        console.error('Order submission error:', error)
        alert('There was an error processing your order. Please try again.')
      } finally {
        this.processingOrder = false
      }
    },
    saveOrder(order) {
      // Save to localStorage
      const orders = JSON.parse(localStorage.getItem('customerOrders') || '[]')
      orders.push(order)
      localStorage.setItem('customerOrders', JSON.stringify(orders))
      
      // If using Vuex, you can also commit to store
      if (this.$store) {
        this.$store.commit('ADD_ORDER', order)
      }
    },
    clearCart() {
      // Clear cart from localStorage
      localStorage.removeItem('cartItems')
      
      // If using Vuex, clear cart
      if (this.$store) {
        this.$store.commit('CLEAR_CART')
      }
    },
    closeConfirmation() {
      this.showConfirmation = false
    },
    goToHome() {
      this.showConfirmation = false
      this.$router.push('/')
    }
  },
  mounted() {
    // Load cart items if not available in computed
    if (this.cartItems.length === 0) {
      const storedCart = JSON.parse(localStorage.getItem('cartItems') || '[]')
      if (storedCart.length > 0 && this.$store) {
        this.$store.commit('SET_CART_ITEMS', storedCart)
      }
    }
  }
}
</script>

<style scoped>
.checkout-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.section {
  flex: 1;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.breadcrumb-link {
  color: #8B4513;
  text-decoration: none;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-separator {
  color: #bdc3c7;
}

.breadcrumb-current {
  color: #2c3e50;
  font-weight: 600;
}

/* Header */
.checkout-header {
  text-align: center;
  margin-bottom: 3rem;
}

.heading {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subheading {
  font-size: 1.1rem;
  color: #7f8c8d;
  margin: 0;
}

/* Empty Cart */
.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-cart-content {
  max-width: 400px;
  margin: 0 auto;
}

.empty-cart-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-cart h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.empty-cart p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

/* Checkout Layout */
.checkout-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: start;
}

@media (max-width: 768px) {
  .checkout-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

/* Checkout Sections */
.checkout-section {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.section-title {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 0.5rem;
}

/* Order Items */
.order-items {
  space-y: 1rem;
}

.order-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #ecf0f1;
}

.order-item:last-child {
  border-bottom: none;
}

.order-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.order-item-details {
  flex: 1;
}

.order-item-details h4 {
  margin: 0 0 0.25rem 0;
  color: #2c3e50;
  font-size: 1rem;
}

.item-price {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin: 0 0 0.25rem 0;
}

.special-instructions {
  font-style: italic;
  color: #e67e22 !important;
  font-size: 0.8rem !important;
  margin: 0 !important;
}

.order-item-total {
  font-weight: 600;
  color: #8B4513;
  font-size: 1rem;
  flex-shrink: 0;
}

/* Forms */
.customer-form {
  space-y: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #bdc3c7;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #8B4513;
}

.form-input::placeholder {
  color: #95a5a6;
}

/* Payment Methods */
.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.payment-method {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid #ecf0f1;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.payment-method:hover {
  border-color: #bdc3c7;
}

.payment-method-active {
  border-color: #8B4513;
  background-color: #fef6f0;
}

.payment-radio {
  margin-right: 1rem;
}

.payment-method-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.payment-icon {
  font-size: 1.2rem;
}

.payment-name {
  font-weight: 600;
  color: #2c3e50;
}

/* Order Summary Card */
.order-summary-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 2rem;
}

.card-title {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  text-align: center;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 0.5rem;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #ecf0f1;
}

.summary-line.total {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  border-bottom: none;
  border-top: 2px solid #ecf0f1;
  margin-top: 0.5rem;
  padding-top: 1rem;
}

.estimated-delivery {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.place-order-btn, .modify-order-btn {
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  text-decoration: none;
  display: block;
}

.place-order-btn {
  background: #8B4513;
  color: white;
}

.place-order-btn:hover:not(:disabled) {
  background: #654321;
  transform: translateY(-2px);
}

.place-order-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.modify-order-btn {
  background: #95a5a6;
  color: white;
}

.modify-order-btn:hover {
  background: #7f8c8d;
  transform: translateY(-2px);
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
}

.btn-primary {
  background: #8B4513;
  color: white;
}

.btn-primary:hover {
  background: #654321;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
  transform: translateY(-2px);
}

/* Loading State */
.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: white;
  border-radius: 15px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #ecf0f1;
  text-align: center;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.modal-body {
  padding: 2rem;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #ecf0f1;
  text-align: center;
}

/* Confirmation Content */
.confirmation-content {
  text-align: center;
}

.confirmation-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.confirmation-content h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.confirmation-content p {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.order-details {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.detail-label {
  font-weight: 600;
  color: #2c3e50;
}

.detail-value {
  color: #8B4513;
  font-weight: 600;
}

.confirmation-note {
  font-size: 0.9rem;
  font-style: italic;
  color: #95a5a6;
}
</style>