<template>
  <div class="home">
    <Navbar />

    <!-- 🎥 ENHANCED HERO SECTION -->
    <section class="hero">
      <video autoplay muted loop playsinline class="hero-video">
        <source src="/vids/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <!-- Animated Background Elements -->
      <div class="hero-particles">
        <div class="particle" v-for="particle in 20" :key="particle" :style="getParticleStyle(particle)"></div>
      </div>
      
      <!-- Floating Coffee Elements -->
      <div class="floating-elements">
        <div class="coffee-element" v-for="element in 8" :key="element" :style="getCoffeeElementStyle(element)">
          {{ getCoffeeIcon(element) }}
        </div>
      </div>
      
      <!-- Animated Gradient Orbs -->
      <div class="gradient-orbs">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>
      
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <!-- Enhanced Title with Sequential Animation -->
        <div class="title-container">
          <h1 class="hero-title">
            <span class="title-word" v-for="(word, index) in titleWords" :key="word" 
                  :style="{ animationDelay: `${index * 0.3}s` }">
              {{ word }}
            </span>
          </h1>
        </div>
        
        <!-- Enhanced Subtitle -->
        <p class="hero-subtitle">
          <span class="subtitle-text">
            Under the shade of comfort, Silung Coffee offers a sanctuary for coffee lovers —
            where warmth meets exceptional taste.
          </span>
        </p>
        
        <!-- Enhanced Buttons -->
        <div class="hero-buttons">
          <router-link to="/menu" class="btn btn-elegant-primary">
            <span class="btn-icon">📖</span>
            <span class="btn-text">Explore Menu</span>
            <div class="btn-shine"></div>
          </router-link>
          <router-link to="/about" class="btn btn-elegant-outline">
            <span class="btn-icon">✨</span>
            <span class="btn-text">Our Story</span>
          </router-link>
        </div>
        
        <!-- Animated Scroll Indicator -->
        <div class="scroll-indicator">
          <div class="scroll-arrow"></div>
          <span class="scroll-text">Discover More</span>
        </div>
      </div>
    </section>

    <!-- ☕ ENHANCED OUR STORY SECTION -->
    <section class="section story-section">
      <div class="container">
        <!-- Animated Section Header -->
        <div class="section-header">
          <h2 class="section-title animated-title">
            <span class="title-text">Our Story</span>
            <div class="title-underline"></div>
          </h2>
          <p class="section-desc animated-text">
            Silung Coffee began with a simple dream — to build a haven for coffee lovers. 
            "Silung," a Kapampangan word meaning "shelter," embodies our vision: a warm, welcoming space 
            where every guest can rest, reflect, and reconnect.
          </p>
        </div>

        <div class="grid grid-2 align-center">
          <div class="story-content">
            <!-- Animated Text Blocks -->
            <div class="text-block animated-text" style="animation-delay: 0.2s">
              <p>
                More than just a café, Silung Coffee is a community where conversations flow 
                as smoothly as our espresso. We invite you to stay, unwind, and feel at home under our roof.
              </p>
            </div>
            
            <!-- Enhanced Stats -->
            <div class="stats-grid animated-text" style="animation-delay: 0.4s">
              <div class="stat-item">
                <div class="stat-number">100+</div>
                <div class="stat-label">Happy Customers Daily</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">Coffee Varieties</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">5★</div>
                <div class="stat-label">Customer Rating</div>
              </div>
            </div>
            
            <!-- Enhanced Button -->
            <div class="button-container animated-text" style="animation-delay: 0.6s">
              <router-link to="/about" class="btn btn-elegant-secondary">
                <span class="btn-icon">📚</span>
                <span class="btn-text">Learn Our Story</span>
              </router-link>
            </div>
          </div>
          
          <div class="image-container">
            <!-- Enhanced Image with Parallax Effect -->
            <div class="image-wrapper animated-image">
              <img src="/images/kilub_silung.jpg" alt="Silung Coffee Interior" class="enhanced-image" />
              <div class="image-overlay">
                <div class="overlay-content">
                  <span class="overlay-icon">🏠</span>
                  <span class="overlay-text">Our Sanctuary</span>
                </div>
              </div>
              <div class="image-frame"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 🌟 FEATURED HIGHLIGHTS -->
    <section class="section highlights-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title animated-title">
            <span class="title-text">Why Choose Silung</span>
            <div class="title-underline"></div>
          </h2>
        </div>

        <div class="highlights-grid">
          <div class="highlight-card animated-card" v-for="(highlight, index) in highlights" :key="highlight.title"
               :style="{ animationDelay: `${index * 0.2}s` }">
            <div class="highlight-icon">
              <div class="icon-wrapper">
                {{ highlight.icon }}
              </div>
            </div>
            <h3 class="highlight-title">{{ highlight.title }}</h3>
            <p class="highlight-description">{{ highlight.description }}</p>
            <div class="highlight-decoration"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 📍 ENHANCED VISIT US SECTION -->
    <section class="section visit-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title animated-title">
            <span class="title-text">Visit Us</span>
            <div class="title-underline"></div>
          </h2>
          <p class="section-desc animated-text">
            Come experience the warmth of authentic Kapampangan hospitality.
          </p>
        </div>

        <div class="grid grid-2 visit-grid">
          <div class="visit-info">
            <!-- Enhanced Info Cards -->
            <div class="info-card animated-card" style="animation-delay: 0.1s">
              <div class="card-icon">🕒</div>
              <div class="card-content">
                <h3>Hours</h3>
                <div class="time-slots">
                  <p>Mon–Fri: 10:00 AM – 11:30 PM</p>
                  <p>Sat–Sun: 9:00 AM – 12:00 AM</p>
                </div>
              </div>
            </div>

            <div class="info-card animated-card" style="animation-delay: 0.2s">
              <div class="card-icon">📍</div>
              <div class="card-content">
                <h3>Location</h3>
                <p>Tabnuan: Mabalacat Cultural Center</p>
                <p>MacArthur Hwy, Mabalacat City, Pampanga</p>
              </div>
            </div>

            <div class="info-card animated-card" style="animation-delay: 0.3s">
              <div class="card-icon">📞</div>
              <div class="card-content">
                <h3>Contact</h3>
                <p>Phone: 0956 430 3524</p>
                <p>Email: silungcoffee@gmail.com</p>
              </div>
            </div>
          </div>

          <div class="contact-form-wrapper">
            <!-- Enhanced Contact Form -->
            <div class="elegant-form-card animated-card" style="animation-delay: 0.4s">
              <div class="form-header">
                <h3>Send Us a Message</h3>
                <div class="form-underline"></div>
              </div>
              
              <form @submit.prevent="submitContactForm" class="contact-form">
                <div class="form-group animated-form-group" style="animation-delay: 0.5s">
                  <label class="form-label">
                    <span class="label-icon">👤</span>
                    Your Name
                  </label>
                  <input 
                    v-model="contactForm.name" 
                    type="text" 
                    class="form-input elegant-input" 
                    placeholder="Enter your full name"
                    required
                  />
                  <div class="input-underline"></div>
                </div>

                <div class="form-group animated-form-group" style="animation-delay: 0.6s">
                  <label class="form-label">
                    <span class="label-icon">📧</span>
                    Email Address
                  </label>
                  <input 
                    v-model="contactForm.email" 
                    type="email" 
                    class="form-input elegant-input" 
                    placeholder="Enter your email"
                    required
                  />
                  <div class="input-underline"></div>
                </div>

                <div class="form-group animated-form-group" style="animation-delay: 0.7s">
                  <label class="form-label">
                    <span class="label-icon">💬</span>
                    Your Message
                  </label>
                  <textarea 
                    v-model="contactForm.message" 
                    class="form-input elegant-textarea" 
                    rows="5"
                    placeholder="Tell us how we can make your experience better..."
                    required
                  ></textarea>
                  <div class="input-underline"></div>
                </div>

                <button type="submit" :disabled="submitting" class="btn btn-elegant-form w-full">
                  <span class="btn-content">
                    <span class="btn-icon">{{ submitting ? '⏳' : '✉️' }}</span>
                    <span class="btn-text">{{ submitting ? 'Sending...' : 'Send Message' }}</span>
                  </span>
                  <div class="btn-shine"></div>
                </button>
              </form>

              <div v-if="contactMessage" class="alert elegant-alert mt-4" :class="contactMessage.type">
                <span class="alert-icon">{{ contactMessage.type === 'alert-success' ? '✅' : '⚠️' }}</span>
                {{ contactMessage.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ✨ CALL TO ACTION -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Experience Silung?</h2>
          <p class="cta-description">
            Join our community of coffee lovers and discover why we're more than just a coffee shop.
          </p>
          <div class="cta-buttons">
            <router-link to="/menu" class="btn btn-cta-primary">
              <span class="btn-icon">☕</span>
              <span class="btn-text">Order Now</span>
            </router-link>
            <router-link to="/gallery" class="btn btn-cta-outline">
              <span class="btn-icon">📸</span>
              <span class="btn-text">View Gallery</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue"
import Footer from "../components/Footer.vue"
import axios from "axios"

export default {
  name: "Home",
  components: { Navbar, Footer },
  data() {
    return {
      titleWords: ['Experience', 'Authentic', 'Coffee'],
      contactForm: { name: "", email: "", message: "" },
      submitting: false,
      contactMessage: null,
      highlights: [
        {
          icon: '⭐',
          title: 'Premium Quality',
          description: 'Hand-selected beans from the finest regions, roasted to perfection for exceptional flavor.'
        },
        {
          icon: '🏠',
          title: 'Cozy Ambiance',
          description: 'A warm, welcoming space designed for comfort, conversation, and relaxation.'
        },
        {
          icon: '👥',
          title: 'Community Focus',
          description: 'More than a café, we\'re a gathering place where connections are made and stories are shared.'
        },
        {
          icon: '🌱',
          title: 'Sustainable Sourcing',
          description: 'Ethically sourced beans supporting local farmers and sustainable practices.'
        }
      ]
    }
  },
  methods: {
    async submitContactForm() {
      this.submitting = true
      this.contactMessage = null
      try {
        const res = await axios.post("/api/contact/submit", this.contactForm)
        this.contactMessage = { type: "alert-success", text: res.data.message }
        this.contactForm = { name: "", email: "", message: "" }
      } catch (err) {
        this.contactMessage = {
          type: "alert-error",
          text: err.response?.data?.message || "Failed to send message. Please try again."
        }
      } finally {
        this.submitting = false
      }
    },
    getParticleStyle(index) {
      const sizes = [3, 4, 5, 6];
      const opacities = [0.4, 0.6, 0.8, 1];
      const delays = [0, 1, 2, 3, 4];
      return {
        width: `${sizes[index % sizes.length]}px`,
        height: `${sizes[index % sizes.length]}px`,
        opacity: opacities[index % opacities.length],
        animationDelay: `${delays[index % delays.length]}s`,
        left: `${(index * 5)}%`
      };
    },
    getCoffeeElementStyle(index) {
      const sizes = [20, 24, 28, 32];
      const delays = [0, 2, 4, 1, 3, 5, 2, 4];
      return {
        fontSize: `${sizes[index % sizes.length]}px`,
        animationDelay: `${delays[index % delays.length]}s`,
        top: `${15 + (index * 10)}%`,
        left: `${5 + (index * 12)}%`
      };
    },
    getCoffeeIcon(index) {
      const icons = ['☕', '🌱', '✨', '🔥', '💫', '🌟', '🫘', '🍃'];
      return icons[index % icons.length];
    }
  }
}
</script>

<style scoped>
/* === ENHANCED GENERAL LAYOUT === */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section {
  padding: 6rem 0;
  position: relative;
}

/* Section Backgrounds */
.story-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.highlights-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%);
}

.visit-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.cta-section {
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
  color: white;
  text-align: center;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #2a1f17;
}

.section-desc {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
  color: #666;
}

/* === ENHANCED HERO SECTION === */
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #f9f9f9;
  text-align: center;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

/* Animated Particles */
.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: float-particle 8s ease-in-out infinite;
}

@keyframes float-particle {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: translateY(-100px) rotate(180deg);
    opacity: 1;
  }
}

/* Floating Coffee Elements */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.coffee-element {
  position: absolute;
  opacity: 0;
  animation: float-element 12s ease-in-out infinite;
  filter: brightness(1.3);
}

@keyframes float-element {
  0%, 100% {
    transform: translateY(100px) rotate(0deg);
    opacity: 0;
  }
  30%, 70% {
    opacity: 0.8;
  }
  50% {
    transform: translateY(-80px) rotate(180deg);
    opacity: 1;
  }
}

/* Gradient Orbs */
.gradient-orbs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  animation: float-orb 20s ease-in-out infinite;
}

.orb-1 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(139, 69, 19, 0.3) 0%, transparent 70%);
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  top: 60%;
  right: 10%;
  animation-delay: 5s;
}

.orb-3 {
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(210, 105, 30, 0.25) 0%, transparent 70%);
  bottom: 20%;
  left: 20%;
  animation-delay: 10s;
}

@keyframes float-orb {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    rgba(20, 15, 10, 0.8) 0%, 
    rgba(139, 69, 19, 0.4) 50%, 
    rgba(20, 15, 10, 0.8) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  padding: 0 2rem;
}

/* Enhanced Title with Sequential Animation */
.title-container {
  margin-bottom: 2rem;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.title-word {
  background: linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 25%, #FFFFFF 50%, #F0F0F0 75%, #FFFFFF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 
    0 0 30px rgba(255, 255, 255, 0.9),
    0 0 60px rgba(255, 255, 255, 0.7),
    0 0 90px rgba(255, 255, 255, 0.5);
  animation: 
    wordSlideIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both,
    titleGlow 4s ease-in-out infinite alternate;
  position: relative;
  padding: 0 1rem;
}

@keyframes wordSlideIn {
  from {
    opacity: 0;
    transform: translateY(50px) rotateX(90deg);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
    filter: blur(0);
  }
}

@keyframes titleGlow {
  0% {
    text-shadow: 
      0 0 30px rgba(255, 255, 255, 0.9),
      0 0 60px rgba(255, 255, 255, 0.7),
      0 0 90px rgba(255, 255, 255, 0.5);
  }
  100% {
    text-shadow: 
      0 0 40px rgba(255, 255, 255, 1),
      0 0 80px rgba(255, 255, 255, 0.8),
      0 0 120px rgba(255, 255, 255, 0.6);
  }
}

/* Enhanced Subtitle */
.hero-subtitle {
  font-size: 1.4rem;
  color: #ffffff;
  opacity: 0.95;
  animation: fadeInUp 1s ease 0.8s both;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: 300;
  letter-spacing: 1px;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.subtitle-text {
  display: inline-block;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Enhanced Hero Buttons */
.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

/* Enhanced Scroll Indicator */
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  animation: fadeIn 1s ease 1.2s both;
}

.scroll-arrow {
  width: 35px;
  height: 35px;
  border-right: 3px solid rgba(255, 255, 255, 0.9);
  border-bottom: 3px solid rgba(255, 255, 255, 0.9);
  transform: rotate(45deg);
  animation: bounce 2s infinite;
}

.scroll-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 500;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: rotate(45deg) translateY(0);
  }
  40% {
    transform: rotate(45deg) translateY(-15px);
  }
  60% {
    transform: rotate(45deg) translateY(-7px);
  }
}

/* === ENHANCED GRID LAYOUT === */
.grid {
  display: grid;
  gap: 4rem;
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
}

.align-center {
  align-items: center;
}

/* === ENHANCED BUTTONS === */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
}

.btn-elegant-primary {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 248, 248, 0.95) 100%);
  color: #2a1f17;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  box-shadow: 
    0 8px 32px rgba(255, 255, 255, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.btn-elegant-primary:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 
    0 15px 40px rgba(255, 255, 255, 0.4),
    0 0 30px rgba(255, 255, 255, 0.3);
  background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(248, 248, 248, 1) 100%);
}

.btn-elegant-outline {
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
}

.btn-elegant-outline:hover {
  background: rgba(255, 255, 255, 0.95);
  color: #2a1f17;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 1);
}

.btn-elegant-secondary {
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
  color: white;
  box-shadow: 0 5px 20px rgba(139, 69, 19, 0.3);
}

.btn-elegant-secondary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(139, 69, 19, 0.4);
  background: linear-gradient(135deg, #A0522D 0%, #8B4513 100%);
}

.btn-elegant-form {
  background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
  color: white;
  border: none;
}

.btn-elegant-form:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 69, 19, 0.4);
}

.btn-cta-primary {
  background: rgba(255, 255, 255, 0.95);
  color: #8B4513;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-cta-primary:hover {
  background: white;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
}

.btn-cta-outline {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.btn-cta-outline:hover {
  background: white;
  color: #8B4513;
  transform: translateY(-3px);
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transition: left 0.6s ease;
}

.btn:hover .btn-shine {
  left: 100%;
}

/* === ENHANCED CONTENT STYLES === */
.story-content {
  color: #333;
  line-height: 1.8;
}

.text-block {
  margin-bottom: 2rem;
  animation: slideInLeft 0.8s ease both;
}

.text-block p {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.8;
}

/* Enhanced Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(139, 69, 19, 0.1);
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: #8B4513;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

/* Enhanced Image Styles */
.image-container {
  position: relative;
}

.image-wrapper {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  transition: all 0.5s ease;
}

.enhanced-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.image-wrapper:hover .enhanced-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.8) 0%, transparent 100%);
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.image-wrapper:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
}

.overlay-icon {
  font-size: 1.5rem;
}

.overlay-text {
  font-size: 1.2rem;
  font-weight: 600;
}

.image-frame {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.image-wrapper:hover .image-frame {
  opacity: 1;
}

/* === HIGHLIGHTS SECTION === */
.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.highlight-card {
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(139, 69, 19, 0.1);
}

.highlight-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(139, 69, 19, 0.15);
}

.highlight-icon {
  margin-bottom: 1.5rem;
}

.icon-wrapper {
  font-size: 3.5rem;
  display: inline-block;
  animation: float 3s ease-in-out infinite;
}

.highlight-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d1f16;
  margin-bottom: 1rem;
}

.highlight-description {
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
}

.highlight-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #8B4513, #D2691E);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.highlight-card:hover .highlight-decoration {
  transform: scaleX(1);
}

/* === ENHANCED VISIT SECTION === */
.visit-grid {
  align-items: flex-start;
  gap: 3rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: all 0.3s ease;
  border-left: 4px solid #8B4513;
  margin-bottom: 1.5rem;
}

.info-card:hover {
  transform: translateX(10px);
  box-shadow: 0 10px 30px rgba(139, 69, 19, 0.15);
}

.card-icon {
  font-size: 1.8rem;
  flex-shrink: 0;
}

.card-content h3 {
  color: #2d1f16;
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
}

.card-content p {
  color: #666;
  margin: 0.25rem 0;
  font-size: 1rem;
}

.time-slots p {
  margin: 0.5rem 0;
}

/* Enhanced Contact Form */
.elegant-form-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid rgba(139, 69, 19, 0.1);
}

.form-header {
  background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
  padding: 2rem;
  text-align: center;
  color: white;
}

.form-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-underline {
  width: 50px;
  height: 2px;
  background: rgba(255, 255, 255, 0.7);
  margin: 0 auto;
  border-radius: 1px;
}

.contact-form {
  padding: 2.5rem;
}

.form-group {
  position: relative;
  margin-bottom: 2rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #2d1f16;
  font-size: 1rem;
}

.label-icon {
  font-size: 1.1rem;
}

.elegant-input, .elegant-textarea {
  width: 100%;
  border: none;
  border-bottom: 2px solid #e0e0e0;
  padding: 1rem 0;
  font-size: 1rem;
  background: transparent;
  transition: all 0.3s ease;
  outline: none;
  font-family: inherit;
}

.elegant-input:focus, .elegant-textarea:focus {
  border-bottom-color: #8B4513;
}

.elegant-textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.5;
}

.input-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #8B4513, #D2691E);
  transition: width 0.3s ease;
}

.elegant-input:focus ~ .input-underline,
.elegant-textarea:focus ~ .input-underline {
  width: 100%;
}

/* Enhanced Alert */
.elegant-alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
  animation: slideInUp 0.5s ease;
}

.alert-success {
  background: #f0f9f4;
  color: #0d6832;
  border: 1px solid #b8e6cb;
}

.alert-error {
  background: #fef0f0;
  color: #c53030;
  border: 1px solid #fed7d7;
}

.alert-icon {
  font-size: 1.3rem;
}

/* === CTA SECTION === */
.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
}

.cta-description {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* === ANIMATION CLASSES === */
.animated-title {
  animation: slideInUp 0.8s ease both;
}

.animated-text {
  animation: slideInLeft 0.8s ease both;
}

.animated-image {
  animation: slideInRight 0.8s ease both;
}

.animated-card {
  animation: slideInUp 0.8s ease both;
}

.animated-form-group {
  animation: slideInRight 0.8s ease both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

/* === RESPONSIVE DESIGN === */
@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
    flex-direction: column;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .section {
    padding: 4rem 1rem;
  }
  
  .grid-2 {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-buttons,
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  /* Reduce animations on mobile */
  .hero-particles,
  .floating-elements,
  .gradient-orbs {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .cta-title {
    font-size: 2.2rem;
  }
  
  .cta-description {
    font-size: 1.1rem;
  }
  
  .container {
    padding: 0 1rem;
  }
}

/* Utility Classes */
.w-full { width: 100%; }
.mt-4 { margin-top: 1rem; }
.mb-4 { margin-bottom: 1rem; }
.text-center { text-align: center; }
</style>