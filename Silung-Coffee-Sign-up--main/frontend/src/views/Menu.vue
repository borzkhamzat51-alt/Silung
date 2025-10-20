<template>
  <div class="menu-page">
    <Navbar />

    <section class="section">
      <div class="container">
        <div class="text-center mb-10">
          <h1 class="heading">Our Menu</h1>
          <p class="subheading">
            Discover our carefully crafted selection of coffee, beverages, and pastries
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <span class="spinner"></span>
          <p>Loading menu...</p>
        </div>

        <div v-else>
          <!-- Category Filter -->
          <div class="category-filter">
            <div class="category-buttons">
              <button
                v-for="category in categories"
                :key="category"
                @click="selectedCategory = category"
                class="category-btn"
                :class="selectedCategory === category ? 'category-btn-active' : 'category-btn-inactive'"
              >
                {{ category }}
              </button>
            </div>
          </div>

          <!-- Menu Grid -->
          <div class="menu-grid">
            <div
              v-for="item in filteredMenuItems"
              :key="item.name"
              class="menu-item"
              @click="openOrderModal(item)"
            >
              <div class="image-container" @click.stop="openImageModal(item)">
                <img
                  :src="item.image || '/images/placeholder-food.jpg'"
                  :alt="item.name"
                  class="menu-item-image"
                />
                <div class="image-overlay">
                  <span class="view-text">🔍 Click to view</span>
                </div>
              </div>
              <div class="menu-item-content">
                <div class="menu-item-header">
                  <h3>{{ item.name }}</h3>
                  <span class="price">₱{{ item.price }}</span>
                </div>
                <p v-if="item.description" class="menu-item-description">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 🎉 Thank You Animation -->
    <div v-if="showThankYou" class="thank-you-overlay">
      <div class="thank-you-container">
        <div class="confetti">
          <div class="confetti-piece" v-for="n in 50" :key="n" :style="confettiStyle(n)"></div>
        </div>
        <div class="thank-you-content">
          <div class="thank-you-icon">🎉</div>
          <h2 class="thank-you-title">Thank You!</h2>
          <p class="thank-you-message">{{ thankYouMessage }}</p>
          <div class="thank-you-item">
            <img :src="lastAddedItem?.image || '/images/placeholder-food.jpg'" :alt="lastAddedItem?.name" />
            <div class="item-info">
              <h4>{{ lastAddedItem?.name }}</h4>
              <p>Quantity: {{ lastAddedQuantity }}</p>
            </div>
          </div>
          <div class="thank-you-buttons">
            <button class="btn btn-primary continue-shopping" @click="showThankYou = false">
              Continue Shopping
            </button>
            <button class="btn btn-secondary view-cart" @click="viewCartAfterThankYou">
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 🖼️ Fullscreen Image Modal -->
    <div v-if="showImageModal" class="image-modal-overlay" @click="closeImageModal">
      <div class="image-modal-content" @click.stop>
        <button class="image-modal-close" @click="closeImageModal">&times;</button>
        <img
          :src="selectedItem?.image || '/images/placeholder-food.jpg'"
          :alt="selectedItem?.name"
          class="fullscreen-image"
        />
        <div class="image-caption">
          <h3>{{ selectedItem?.name }}</h3>
          <p v-if="selectedItem?.description">{{ selectedItem.description }}</p>
          <button class="btn btn-primary order-from-image" @click="openOrderModalFromImage">
            Order This Item
          </button>
        </div>
      </div>
    </div>

    <!-- 🧾 Order Modal -->
    <div v-if="showOrderModal" class="modal-overlay" @click="closeOrderModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedItem?.name }}</h3>
          <button class="modal-close" @click="closeOrderModal">&times;</button>
        </div>

        <div class="modal-body">
          <img
            :src="selectedItem?.image || '/images/placeholder-food.jpg'"
            :alt="selectedItem?.name"
            class="modal-image"
          />

          <h4 class="modal-price">Price: ₱{{ selectedItem?.price }}</h4>
          <p v-if="selectedItem?.description" class="modal-description">
            {{ selectedItem.description }}
          </p>

          <div class="quantity-control">
            <label>Quantity:</label>
            <div class="quantity-buttons">
              <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
              <input v-model.number="quantity" type="number" min="1" />
              <button @click="increaseQuantity">+</button>
            </div>
          </div>

          <div class="form-group">
            <label>Special Instructions (Optional)</label>
            <textarea
              v-model="specialInstructions"
              class="form-input"
              placeholder="Any special requests?"
            ></textarea>
          </div>

          <div class="total-display">
            <span>Total:</span>
            <span class="total-amount">₱{{ totalPrice }}</span>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeOrderModal">Cancel</button>
          <button class="btn btn-primary" @click="addToCart">Add to Cart</button>
        </div>
      </div>
    </div>

    <!-- 🛒 Cart Sidebar -->
    <div v-if="showCart" class="cart-sidebar">
      <div class="cart-content">
        <div class="cart-header">
          <h2>Your Order</h2>
          <button class="modal-close" @click="showCart = false">&times;</button>
        </div>

        <div v-if="cartItems.length === 0" class="empty-cart">
          <p>Your cart is empty</p>
          <p class="empty-cart-subtext">Add some delicious items from our menu!</p>
        </div>

        <div v-else>
          <div class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <img
                :src="item.image || '/images/placeholder-food.jpg'"
                :alt="item.name"
                class="cart-item-image"
              />
              <div class="cart-item-details">
                <h4>{{ item.name }}</h4>
                <p class="item-price">₱{{ item.price }} each</p>
                <p v-if="item.specialInstructions" class="special-instructions">
                  Note: {{ item.specialInstructions }}
                </p>
              </div>
              <div class="cart-item-controls">
                <div class="quantity-controls">
                  <button @click="decreaseCartQuantity(item.id)" class="qty-btn">-</button>
                  <span class="quantity-display">{{ item.quantity }}</span>
                  <button @click="increaseCartQuantity(item.id)" class="qty-btn">+</button>
                </div>
                <button class="remove-btn" @click="removeFromCart(item.id)" title="Remove item">
                  ×
                </button>
              </div>
            </div>
          </div>

          <div class="cart-summary">
            <div class="cart-total">
              <span>Total:</span>
              <span>₱{{ cartTotal }}</span>
            </div>

            <div class="cart-actions">
              <button class="btn btn-primary checkout-btn" @click="proceedToCheckout">
                Proceed to Checkout
              </button>
              <button class="btn btn-secondary clear-btn" @click="clearCart">
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Cart Button - Always Visible -->
    <button
      class="cart-float-btn"
      :class="cartItems.length > 0 ? 'cart-float-btn-active' : 'cart-float-btn-inactive'"
      @click="showCart = true"
    >
      🛒 
      <span class="cart-count">{{ cartItems.length }}</span>
    </button>

    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Menu',
  components: { Navbar, Footer },
  data() {
    return {
      loading: false,
      selectedCategory: 'All',
      showOrderModal: false,
      showImageModal: false,
      showCart: false,
      showThankYou: false,
      selectedItem: null,
      quantity: 1,
      specialInstructions: '',
      cartItems: [],
      lastAddedItem: null,
      lastAddedQuantity: 1,
      thankYouMessages: [
        "Yay! Your order is added! 🎉",
        "Delicious choice! Your items are added! ☕",
        "Perfect pick! Get ready to enjoy! 🥐",
        "Awesome selection! Your cart is looking tasty! 😋",
        "Order confirmed! Can't wait to serve you! 🙌",
        "Great taste! Your items have been added! ✨",
        "Yum! Your order is brewing! ☕",
        "Excellent choice! Get ready for a treat! 🎯"
      ],
      menuItems: [
        // ☕ Signatures
        { 
          category: 'Signatures', 
          name: 'Silung Coffee', 
          description: 'Iced Americano with sweetened breve', 
          price: 130,
          image: '/images/silung-coffee.jpg'
        },
        { 
          category: 'Signatures', 
          name: 'Spanish Latte', 
          description: 'Espresso, condensed milk', 
          price: 130,
          image: '/images/spanish-latte.jpg'
        },
        { 
          category: 'Signatures', 
          name: 'Seasalt Latte', 
          description: 'Espresso, milk, sea salt foam', 
          price: 130,
          image: '/images/seasalt-latte.jpg'
        },
        { 
          category: 'Signatures', 
          name: 'Salted Caramel', 
          description: 'Espresso, milk, caramel, foam', 
          price: 130,
          image: '/images/salted-caramel.jpg'
        },
        { 
          category: 'Signatures', 
          name: 'Roasted Almond', 
          description: 'Espresso, milk, almond syrup, foam', 
          price: 130,
          image: '/images/roasted-almond.jpg'
        },
        { 
          category: 'Signatures', 
          name: 'Biscoff Latte', 
          description: 'Espresso, milk, biscoff spread, foam', 
          price: 140,
          image: '/images/biscoff-latte.jpg'
        },
        { 
          category: 'Signatures', 
          name: 'Toasted Mallows', 
          description: 'Espresso, milk, mallow syrup, foam', 
          price: 140,
          image: '/images/toasted-mallows.jpg'
        },
        { 
          category: 'Signatures', 
          name: 'Dark Choco Oats', 
          description: 'Dark chocolate, oat milk, oats', 
          price: 160,
          image: '/images/dark-choco-oats.jpg'
        },

        // ☕ Classics
        { 
          category: 'Classics', 
          name: 'Mocha', 
          description: 'Espresso, milk, dark chocolate', 
          price: 130,
          image: '/images/mocha.jpg'
        },
        { 
          category: 'Classics', 
          name: 'White Mocha', 
          description: 'Espresso, milk, white chocolate', 
          price: 130,
          image: '/images/white-mocha.jpg'
        },
        { 
          category: 'Classics', 
          name: 'Cappuccino', 
          description: 'Espresso, milk, foam', 
          price: 120,
          image: '/images/cappuccino.jpg'
        },
        { 
          category: 'Classics', 
          name: 'Cafe Latte', 
          description: 'Espresso, milk, foam', 
          price: 120,
          image: '/images/cafe-latte.jpg'
        },
        { 
          category: 'Classics', 
          name: 'Americano', 
          description: 'Espresso, water', 
          price: 120,
          image: '/images/americano.jpg'
        },

        // 🍵 Non-Espresso
        { 
          category: 'Non-Espresso', 
          name: 'Matcha', 
          description: 'Matcha, milk', 
          price: 130,
          image: '/images/matcha.jpg'
        },
        { 
          category: 'Non-Espresso', 
          name: 'Strawberry Latte', 
          description: 'Strawberry, milk', 
          price: 130,
          image: '/images/strawberry-latte.jpg'
        },
        { 
          category: 'Non-Espresso', 
          name: 'Horchata', 
          description: 'Horchata, milk, cinnamon topping', 
          price: 130,
          image: '/images/horchata.jpg'
        },
        { 
          category: 'Non-Espresso', 
          name: 'Dark Chocolate', 
          description: 'Dark chocolate, milk', 
          price: 130,
          image: '/images/dark-chocolate.jpg'
        },

        // 🍹 Refreshers
        { 
          category: 'Refreshers', 
          name: 'Peach Berry Fizz', 
          description: 'Strawberry, peach, carbonated water', 
          price: 130,
          image: '/images/peach-berry-fizz.jpg'
        },
        { 
          category: 'Refreshers', 
          name: 'Kiwi Passion', 
          description: 'Kiwi, passion fruit, carbonated water', 
          price: 130,
          image: '/images/kiwi-passion.jpg'
        },
        { 
          category: 'Refreshers', 
          name: 'Purple Lemonade', 
          description: 'Lemon, butterfly pea tea, carbonated water', 
          price: 130,
          image: '/images/purple-lemonade.jpg'
        },

        // ➕ Add-ons
        { 
          category: 'Add-ons', 
          name: 'Espresso Shot', 
          price: 30,
          image: '/images/espresso-shot.jpg'
        },
        { 
          category: 'Add-ons', 
          name: 'Cold Foam', 
          price: 30,
          image: '/images/cold-foam.jpg'
        },
        { 
          category: 'Add-ons', 
          name: 'Seasalt Foam', 
          price: 30,
          image: '/images/seasalt-foam.jpg'
        },
        { 
          category: 'Add-ons', 
          name: 'Flavor Syrup', 
          price: 30,
          image: '/images/flavor-syrup.jpg'
        },
        { 
          category: 'Add-ons', 
          name: 'Oatmilk', 
          price: 60,
          image: '/images/oatmilk.jpg'
        },

        // 🥐 Pastries - Croissants
        { 
          category: 'Croissants', 
          name: 'Butter Croissant', 
          price: 130,
          image: '/images/butter-croissant.jpg'
        },
        { 
          category: 'Croissants', 
          name: 'Pain Au Chocolat', 
          price: 140,
          image: '/images/pain-au-chocolat.jpg'
        },
        { 
          category: 'Croissants', 
          name: 'Almond Croissant', 
          price: 165,
          image: '/images/almond-croissant.jpg'
        },
        { 
          category: 'Croissants', 
          name: 'Matcha Croissant', 
          price: 180,
          image: '/images/matcha-croissant.jpg'
        },
        { 
          category: 'Croissants', 
          name: 'Golden Crunch', 
          price: 175,
          image: '/images/golden-crunch.jpg'
        },
        { 
          category: 'Croissants', 
          name: 'Cookie Croissant', 
          price: 180,
          image: '/images/cookie-croissant.jpg'
        },
        { 
          category: 'Croissants', 
          name: 'Ham & Cheese Croissant', 
          price: 150,
          image: '/images/ham-cheese-croissant.jpg'
        },

        // 🍕 Flat Bread
        { 
          category: 'Flat Bread', 
          name: 'Four Cheese', 
          price: 135,
          image: '/images/four-cheese.jpg'
        },
        { 
          category: 'Flat Bread', 
          name: "Meat Lover's", 
          price: 135,
          image: '/images/meat-lovers.jpg'
        },

        // 🍩 NY Rolls
        { 
          category: 'New York Rolls', 
          name: 'NYR Red Velvet', 
          price: 160,
          image: '/images/nyr-red-velvet.jpg'
        },
        { 
          category: 'New York Rolls', 
          name: 'NYR Cookies & Cream', 
          price: 160,
          image: '/images/nyr-cookies-cream.jpg'
        },
        { 
          category: 'New York Rolls', 
          name: 'NYR Choco Almond', 
          price: 160,
          image: '/images/nyr-choco-almond.jpg'
        },

        // 🥮 Danish
        { 
          category: 'Danish', 
          name: 'Cinnamon Danish', 
          price: 130,
          image: '/images/cinnamon-danish.jpg'
        }
      ]
    }
  },
  computed: {
    categories() {
      return ['All', ...new Set(this.menuItems.map(item => item.category))]
    },
    filteredMenuItems() {
      return this.selectedCategory === 'All'
        ? this.menuItems
        : this.menuItems.filter(item => item.category === this.selectedCategory)
    },
    totalPrice() {
      return (this.selectedItem?.price || 0) * this.quantity
    },
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    },
    thankYouMessage() {
      return this.thankYouMessages[Math.floor(Math.random() * this.thankYouMessages.length)]
    }
  },
  methods: {
    confettiStyle(index) {
      const colors = ['#8B4513', '#A0522D', '#D2691E', '#CD853F', '#F4A460', '#DEB887'];
      return {
        left: Math.random() * 100 + 'vw',
        animationDelay: Math.random() * 3 + 's',
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        transform: `rotate(${Math.random() * 360}deg)`
      }
    },
    openImageModal(item) {
      this.selectedItem = item
      this.showImageModal = true
    },
    closeImageModal() {
      this.showImageModal = false
      this.selectedItem = null
    },
    openOrderModalFromImage() {
      this.showImageModal = false
      this.openOrderModal(this.selectedItem)
    },
    openOrderModal(item) {
      this.selectedItem = item
      this.quantity = 1
      this.specialInstructions = ''
      this.showOrderModal = true
    },
    closeOrderModal() {
      this.showOrderModal = false
      this.selectedItem = null
    },
    increaseQuantity() {
      this.quantity++
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--
    },
    addToCart() {
      this.cartItems.push({
        id: `${this.selectedItem.name}-${Date.now()}`,
        name: this.selectedItem.name,
        price: this.selectedItem.price,
        quantity: this.quantity,
        image: this.selectedItem.image,
        specialInstructions: this.specialInstructions
      })
      
      // Store last added item for thank you message
      this.lastAddedItem = this.selectedItem
      this.lastAddedQuantity = this.quantity
      
      this.closeOrderModal()
      
      // Show thank you animation
      this.showThankYou = true
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        if (this.showThankYou) {
          this.showThankYou = false
        }
      }, 5000)
    },
    viewCartAfterThankYou() {
      this.showThankYou = false
      this.showCart = true
    },
    increaseCartQuantity(id) {
      const item = this.cartItems.find(i => i.id === id)
      if (item) item.quantity++
    },
    decreaseCartQuantity(id) {
      const item = this.cartItems.find(i => i.id === id)
      if (item.quantity > 1) item.quantity--
      else this.removeFromCart(id)
    },
    removeFromCart(id) {
      this.cartItems = this.cartItems.filter(i => i.id !== id)
    },
    clearCart() {
      this.cartItems = []
      this.showCart = false
    },
    proceedToCheckout() {
      if (this.cartItems.length === 0) {
        alert('Your cart is empty!')
        return
      }
      this.$router.push('/checkout')
    }
  }
}
</script>

<style scoped>
/* Category Filter Styles */
.category-filter {
  margin-bottom: 3rem;
}

.category-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem 0;
}

.category-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #8B4513;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  min-width: 120px;
}

.category-btn-active {
  background-color: #8B4513;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(139, 69, 19, 0.3);
}

.category-btn-inactive {
  background-color: transparent;
  color: #8B4513;
}

.category-btn-inactive:hover {
  background-color: #8B4513;
  color: white;
  transform: translateY(-2px);
}

/* Menu Grid */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.menu-item {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: relative;
  overflow: hidden;
}

.menu-item-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
  transition: all 0.3s ease;
}

.image-container:hover .menu-item-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

.view-text {
  color: white;
  font-weight: 600;
  font-size: 1rem;
}

.menu-item-content {
  padding: 1.5rem;
}

.menu-item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.menu-item-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2rem;
  flex: 1;
}

.price {
  font-weight: bold;
  color: #8B4513;
  font-size: 1.1rem;
  margin-left: 1rem;
}

.menu-item-description {
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

/* 🎉 Thank You Animation Styles */
.thank-you-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  padding: 2rem;
}

.thank-you-container {
  position: relative;
  max-width: 500px;
  width: 100%;
}

.confetti {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.confetti-piece {
  position: absolute;
  width: 10px;
  height: 20px;
  opacity: 0;
  animation: confetti-fall 3s ease-in-out infinite;
}

@keyframes confetti-fall {
  0% {
    opacity: 1;
    transform: translateY(-100px) rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: translateY(100vh) rotate(360deg);
  }
}

.thank-you-content {
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: thankYouPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes thankYouPop {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.thank-you-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 1s infinite alternate;
}

@keyframes bounce {
  0% {
    transform: translateY(0) scale(1);
  }
  100% {
    transform: translateY(-10px) scale(1.1);
  }
}

.thank-you-title {
  color: #8B4513;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.thank-you-message {
  color: #7f8c8d;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.thank-you-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: #f8f0e8;
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  animation: slideInUp 0.5s ease-out;
}

@keyframes slideInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.thank-you-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 10px;
}

.item-info h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.item-info p {
  margin: 0;
  color: #8B4513;
  font-weight: 600;
}

.thank-you-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.continue-shopping {
  background: linear-gradient(135deg, #8B4513, #A0522D);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.continue-shopping:hover {
  background: linear-gradient(135deg, #654321, #8B4513);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(139, 69, 19, 0.3);
}

.view-cart {
  background: #95a5a6;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-cart:hover {
  background: #7f8c8d;
  transform: translateY(-2px);
}

/* Fullscreen Image Modal */
.image-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 2rem;
}

.image-modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fullscreen-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.image-modal-close {
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2001;
}

.image-modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.image-caption {
  text-align: center;
  color: white;
  margin-top: 2rem;
  max-width: 500px;
}

.image-caption h3 {
  font-size: 2rem;
  margin: 0 0 1rem 0;
  color: white;
}

.image-caption p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.order-from-image {
  padding: 1rem 2rem;
  font-size: 1.1rem;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #ecf0f1;
}

.modal-header h3 {
  margin: 0;
  color: #2c3e50;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #e74c3c;
}

.modal-body {
  padding: 1.5rem;
}

.modal-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.modal-price {
  color: #8B4513;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.modal-description {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
}

.quantity-control {
  margin-bottom: 1.5rem;
}

.quantity-control label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.quantity-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-buttons button {
  width: 40px;
  height: 40px;
  border: 1px solid #bdc3c7;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.quantity-buttons button:hover:not(:disabled) {
  background: #ecf0f1;
}

.quantity-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-buttons input {
  width: 60px;
  height: 40px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  text-align: center;
  font-size: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  min-height: 80px;
}

.total-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
}

.total-amount {
  color: #8B4513;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #ecf0f1;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
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

/* Cart Sidebar - IMPROVED STYLING */
.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  transform: translateX(100%);
  animation: slideIn 0.3s ease forwards;
}

@keyframes slideIn {
  to {
    transform: translateX(0);
  }
}

.cart-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ecf0f1;
}

.cart-header h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.empty-cart {
  text-align: center;
  padding: 3rem 1rem;
  color: #7f8c8d;
}

.empty-cart-subtext {
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 2rem;
}

.cart-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid #ecf0f1;
}

.cart-item-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.cart-item-details {
  flex: 1;
  min-width: 0;
}

.cart-item-details h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1rem;
  line-height: 1.3;
}

.item-price {
  margin: 0 0 0.5rem 0;
  color: #8B4513;
  font-size: 0.9rem;
  font-weight: 600;
}

.special-instructions {
  font-style: italic;
  color: #e67e22 !important;
  font-size: 0.8rem !important;
  margin: 0.25rem 0 0 0 !important;
  line-height: 1.3;
}

/* IMPROVED CART CONTROLS */
.cart-item-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
  flex-shrink: 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f8f9fa;
  padding: 0.5rem;
  border-radius: 8px;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #bdc3c7;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease;
}

.qty-btn:hover {
  background: #ecf0f1;
  border-color: #95a5a6;
}

.quantity-display {
  width: 30px;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
}

.remove-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #e74c3c;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #e74c3c;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: #e74c3c;
  color: white;
}

.cart-summary {
  margin-top: auto;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-top: 2px solid #ecf0f1;
  font-size: 1.4rem;
  font-weight: bold;
  color: #2c3e50;
}

.cart-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.checkout-btn, .clear-btn {
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.checkout-btn {
  background: #8B4513;
  color: white;
}

.checkout-btn:hover {
  background: #654321;
  transform: translateY(-2px);
}

.clear-btn {
  background: #95a5a6;
  color: white;
}

.clear-btn:hover {
  background: #7f8c8d;
  transform: translateY(-2px);
}

/* Floating Cart Button - Always Visible */
.cart-float-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.cart-float-btn-active {
  background: #8B4513;
  color: white;
  transform: scale(1.1);
}

.cart-float-btn-inactive {
  background: #95a5a6;
  color: white;
}

.cart-float-btn:hover {
  transform: scale(1.15);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.cart-count {
  font-size: 0.8rem;
  font-weight: bold;
  background: white;
  color: #8B4513;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -5px;
  right: -5px;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
}

.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #8B4513;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .category-buttons {
    gap: 0.5rem;
  }
  
  .category-btn {
    min-width: 100px;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
  
  .menu-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .image-modal-content {
    max-width: 95vw;
    max-height: 95vh;
  }
  
  .fullscreen-image {
    max-height: 60vh;
  }
  
  .image-caption h3 {
    font-size: 1.5rem;
  }
  
  .thank-you-content {
    padding: 2rem 1.5rem;
  }
  
  .thank-you-title {
    font-size: 2rem;
  }
  
  .thank-you-message {
    font-size: 1.1rem;
  }
  
  .thank-you-item {
    flex-direction: column;
    text-align: center;
  }
  
  .thank-you-buttons {
    flex-direction: column;
  }
  
  .continue-shopping, .view-cart {
    width: 100%;
    margin-right: 0;
  }
  
  .modal {
    margin: 1rem;
  }
  
  .cart-sidebar {
    max-width: 100%;
  }
  
  .cart-item {
    padding: 1rem 0;
  }
  
  .cart-item-image {
    width: 60px;
    height: 60px;
  }
  
  .quantity-controls {
    gap: 0.5rem;
  }
  
  .qty-btn, .remove-btn {
    width: 28px;
    height: 28px;
    font-size: 0.9rem;
  }
  
  .cart-float-btn {
    bottom: 1rem;
    right: 1rem;
    width: 60px;
    height: 60px;
    font-size: 1.3rem;
  }
}

.menu-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.section {
  flex: 1;
}
</style>