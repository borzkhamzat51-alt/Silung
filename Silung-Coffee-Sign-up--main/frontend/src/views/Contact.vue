<template>
  <div class="contact-page">
    <!-- Header -->
    <Navbar />

    <!-- Hero Section with Video -->
    <section class="hero">
      <video autoplay muted loop playsinline class="hero-video">
        <source src="@/../public/vids/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="hero-overlay"></div>
      
      <!-- Animated Coffee Beans -->
      <div class="floating-beans">
        <div class="coffee-bean" v-for="bean in 8" :key="bean" :style="getBeanStyle(bean)">☕</div>
      </div>
      
      <!-- Animated Circles -->
      <div class="floating-circles">
        <div class="circle" v-for="circle in 6" :key="circle" :style="getCircleStyle(circle)"></div>
      </div>
      
      <div class="hero-content">
        <h1 class="hero-title">Contact Us</h1>
        <p class="hero-subtitle">
          We'd love to hear from you. Get in touch with us today.
        </p>
        
        <!-- Animated Scroll Indicator -->
        <div class="scroll-indicator">
          <div class="scroll-arrow"></div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section">
      <div class="container">
        <!-- Animated Section Header -->
        <div class="section-header">
          <h2 class="section-title animated-title">Get in Touch</h2>
          <div class="title-underline"></div>
        </div>
        
        <div class="grid grid-2">
          <!-- Left Column -->
          <div class="contact-info">
            <p class="contact-intro">
              Have a question, suggestion, or just want to say hello? We'd love to hear from you. 
              Send us a message and we'll get back to you as soon as possible.
            </p>
            
            <div class="info-cards">
              <!-- Location Card -->
              <div class="info-card animated-card" style="animation-delay: 0.1s">
                <div class="card-icon">📍</div>
                <div class="card-content">
                  <h3>Location</h3>
                  <p>Tabnuan: Mabalacat Cultural Center</p>
                  <p>MacArthur Hwy, Mabalacat City, Pampanga</p>
                </div>
              </div>

              <!-- Hours Card -->
              <div class="info-card animated-card" style="animation-delay: 0.2s">
                <div class="card-icon">🕒</div>
                <div class="card-content">
                  <h3>Hours</h3>
                  <p>Monday - Friday: 10:00am - 11:30pm</p>
                  <p>Saturday - Sunday: 9:00am - 12:00am</p>
                </div>
              </div>

              <!-- Contact Card -->
              <div class="info-card animated-card" style="animation-delay: 0.3s">
                <div class="card-icon">📞</div>
                <div class="card-content">
                  <h3>Contact</h3>
                  <p>Phone: 0956 430 3524</p>
                  <p>Email: silungcoffee@gmail.com</p>
                </div>
              </div>
            </div>
            
            <!-- Map -->
            <div class="map-container animated-card" style="animation-delay: 0.4s">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3849.772495623623!2d120.5710485559553!3d15.22561164222061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396ed004be7b937%3A0xc35f27c9da38e589!2sSilung%20Coffee!5e0!3m2!1sen!2sph!4v1760897867679!5m2!1sen!2sph" 
                width="100%" 
                height="300" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                class="map-frame"
              ></iframe>
            </div>
          </div>

          <!-- Right Column (Form) -->
          <div class="form-container">
            <div class="card elegant-card">
              <div class="card-header">
                <h3 class="card-title">Send us a message</h3>
                <div class="card-underline"></div>
              </div>
              
              <div class="card-body">
                <form @submit.prevent="submitContactForm" class="contact-form">
                  <!-- Animated Form Fields -->
                  <div class="form-group animated-form-group" style="animation-delay: 0.1s">
                    <label class="form-label">
                      <span class="label-icon">👤</span>
                      Name
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

                  <div class="form-group animated-form-group" style="animation-delay: 0.2s">
                    <label class="form-label">
                      <span class="label-icon">📧</span>
                      Email
                    </label>
                    <input 
                      v-model="contactForm.email" 
                      type="email" 
                      class="form-input elegant-input" 
                      placeholder="Enter your email address"
                      required
                    />
                    <div class="input-underline"></div>
                  </div>

                  <div class="form-group animated-form-group" style="animation-delay: 0.3s">
                    <label class="form-label">
                      <span class="label-icon">💬</span>
                      Message
                    </label>
                    <textarea 
                      v-model="contactForm.message" 
                      class="form-input elegant-textarea" 
                      rows="5"
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                    <div class="input-underline"></div>
                  </div>

                  <button type="submit" class="btn elegant-btn w-full" :disabled="submitting">
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
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import axios from 'axios'

export default {
  name: 'Contact',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      contactForm: {
        name: '',
        email: '',
        message: ''
      },
      submitting: false,
      contactMessage: null
    }
  },
  methods: {
    async submitContactForm() {
      this.submitting = true
      this.contactMessage = null
      
      try {
        const response = await axios.post('/api/contact/submit', this.contactForm)
        this.contactMessage = {
          type: 'alert-success',
          text: response.data.message
        }
        this.contactForm = { name: '', email: '', message: '' }
      } catch (error) {
        this.contactMessage = {
          type: 'alert-error',
          text: error.response?.data?.message || 'Failed to send message. Please try again.'
        }
      } finally {
        this.submitting = false
      }
    },
    getBeanStyle(index) {
      const delay = index * 0.5;
      const left = 10 + (index * 10);
      return {
        'animation-delay': `${delay}s`,
        'left': `${left}%`
      };
    },
    getCircleStyle(index) {
      const sizes = [60, 80, 100, 120, 140, 160];
      const opacities = [0.1, 0.08, 0.06, 0.04, 0.03, 0.02];
      const delays = [0, 2, 4, 1, 3, 5];
      return {
        'width': `${sizes[index]}px`,
        'height': `${sizes[index]}px`,
        'opacity': opacities[index],
        'animation-delay': `${delays[index]}s`
      };
    }
  }
}
</script>

<style scoped>
/* Hero Section */
.hero {
  position: relative;
  height: 70vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(139, 69, 19, 0.3) 100%);
}

/* Floating Coffee Beans Animation */
.floating-beans {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.coffee-bean {
  position: absolute;
  font-size: 1.5rem;
  opacity: 0;
  animation: float-bean 8s ease-in-out infinite;
  filter: brightness(1.2);
}

@keyframes float-bean {
  0%, 100% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10%, 90% {
    opacity: 0.7;
  }
  50% {
    transform: translateY(-100px) rotate(180deg);
    opacity: 1;
  }
}

/* Floating Circles Animation */
.floating-circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.circle {
  position: absolute;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float-circle 15s ease-in-out infinite;
  top: 20%;
  left: 10%;
}

.circle:nth-child(even) {
  top: 60%;
  left: 80%;
  animation-direction: reverse;
}

@keyframes float-circle {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(30px, -30px) rotate(90deg);
  }
  50% {
    transform: translate(0, -60px) rotate(180deg);
  }
  75% {
    transform: translate(-30px, -30px) rotate(270deg);
  }
}

.hero-content {
  position: relative;
  color: #fff;
  z-index: 2;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}

.scroll-arrow {
  width: 30px;
  height: 30px;
  border-right: 2px solid rgba(255, 255, 255, 0.8);
  border-bottom: 2px solid rgba(255, 255, 255, 0.8);
  transform: rotate(45deg);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: rotate(45deg) translateY(0);
  }
  40% {
    transform: rotate(45deg) translateY(-10px);
  }
  60% {
    transform: rotate(45deg) translateY(-5px);
  }
}

/* 🎨 WHITE GLOWY "CONTACT US" */
.hero-title {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 25%, #FFFFFF 50%, #F0F0F0 75%, #FFFFFF 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 
    0 0 20px rgba(255, 255, 255, 0.8),
    0 0 40px rgba(255, 255, 255, 0.6),
    0 0 60px rgba(255, 255, 255, 0.4),
    0 0 80px rgba(255, 255, 255, 0.3);
  animation: 
    fadeInDown 1s ease,
    white-glow 3s ease-in-out infinite alternate;
  position: relative;
  display: inline-block;
  padding: 0 10px;
}

/* White glow animation */
@keyframes white-glow {
  0% {
    text-shadow: 
      0 0 20px rgba(255, 255, 255, 0.8),
      0 0 40px rgba(255, 255, 255, 0.6),
      0 0 60px rgba(255, 255, 255, 0.4),
      0 0 80px rgba(255, 255, 255, 0.3);
    transform: scale(1);
  }
  50% {
    text-shadow: 
      0 0 25px rgba(255, 255, 255, 0.9),
      0 0 50px rgba(255, 255, 255, 0.7),
      0 0 75px rgba(255, 255, 255, 0.5),
      0 0 100px rgba(255, 255, 255, 0.4);
    transform: scale(1.02);
  }
  100% {
    text-shadow: 
      0 0 30px rgba(255, 255, 255, 0.85),
      0 0 60px rgba(255, 255, 255, 0.65),
      0 0 90px rgba(255, 255, 255, 0.45),
      0 0 120px rgba(255, 255, 255, 0.35);
    transform: scale(1.01);
  }
}

/* Add subtle white underline */
.hero-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  height: 3px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.8), 
    rgba(255, 255, 255, 1), 
    rgba(255, 255, 255, 0.8), 
    transparent
  );
  border-radius: 2px;
  opacity: 0.8;
  animation: underline-pulse 3s ease-in-out infinite;
}

@keyframes underline-pulse {
  0%, 100% {
    opacity: 0.6;
    width: 50%;
  }
  50% {
    opacity: 1;
    width: 60%;
  }
}

/* 🎨 PLAIN WHITE SUBTITLE */
.hero-subtitle {
  font-size: 1.4rem;
  color: #ffffff;
  opacity: 0.95;
  animation: fadeInUp 1s ease 0.3s both;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  font-weight: 300;
  letter-spacing: 1px;
  margin-top: 1rem;
  max-width: 600px;
  margin: 1rem auto 0;
  line-height: 1.6;
}

/* Contact Section */
.section {
  padding: 6rem 1.5rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.animated-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d1f16;
  margin-bottom: 1rem;
  animation: slideInUp 0.8s ease both;
}

.title-underline {
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #8B4513, #D2691E, #8B4513);
  margin: 0 auto;
  border-radius: 2px;
  animation: expandWidth 1s ease 0.5s both;
}

@keyframes expandWidth {
  from { width: 0; }
  to { width: 80px; }
}

.grid {
  display: grid;
  gap: 3rem;
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

/* Contact Info Styles */
.contact-intro {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  text-align: center;
}

.info-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.info-card {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 25px rgba(0,0,0,0.08);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: all 0.3s ease;
  border-left: 4px solid #8B4513;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(139, 69, 19, 0.15);
}

.card-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.card-content h3 {
  color: #2d1f16;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.card-content p {
  color: #666;
  margin: 0.25rem 0;
  font-size: 0.95rem;
}

/* Map Container */
.map-container {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 25px rgba(0,0,0,0.08);
}

.map-frame {
  border-radius: 10px;
  box-shadow: 0 3px 15px rgba(0,0,0,0.1);
}

/* Elegant Card Styles */
.elegant-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  overflow: hidden;
  border: 1px solid rgba(139, 69, 19, 0.1);
}

.card-header {
  background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
  padding: 2rem;
  text-align: center;
  color: white;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.card-underline {
  width: 50px;
  height: 2px;
  background: rgba(255, 255, 255, 0.7);
  margin: 0 auto;
  border-radius: 1px;
}

.card-body {
  padding: 2.5rem;
}

/* Elegant Form Styles */
.contact-form {
  space-y: 1.5rem;
}

.form-group {
  position: relative;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2d1f16;
}

.label-icon {
  font-size: 1.1rem;
}

.elegant-input, .elegant-textarea {
  width: 100%;
  border: none;
  border-bottom: 2px solid #e0e0e0;
  padding: 0.8rem 0;
  font-size: 1rem;
  background: transparent;
  transition: all 0.3s ease;
  outline: none;
}

.elegant-input:focus, .elegant-textarea:focus {
  border-bottom-color: #8B4513;
}

.elegant-textarea {
  resize: vertical;
  min-height: 120px;
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

/* Elegant Button */
.elegant-btn {
  position: relative;
  background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

.elegant-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(139, 69, 19, 0.3);
}

.elegant-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s ease;
}

.elegant-btn:hover .btn-shine {
  left: 100%;
}

/* Elegant Alert */
.elegant-alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 500;
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
  font-size: 1.2rem;
}

/* Animation Classes */
.animated-card {
  animation: slideInLeft 0.8s ease both;
}

.animated-form-group {
  animation: slideInRight 0.8s ease both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Utility classes */
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mt-4 { margin-top: 1rem; }
.space-y-4 > * + * { margin-top: 1rem; }
.w-full { width: 100%; }

/* 🧍‍♂️ RESPONSIVE */
@media (max-width: 768px) {
  .hero-title { 
    font-size: 2.5rem; 
  }
  .hero-subtitle { 
    font-size: 1.1rem; 
  }
  .section { 
    padding: 3rem 1rem; 
  }
  .grid-2 {
    grid-template-columns: 1fr;
  }
  .animated-title {
    font-size: 2rem;
  }
  
  /* Adjust animations for mobile */
  .floating-beans,
  .floating-circles {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-title { 
    font-size: 2rem; 
  }
  .hero-subtitle { 
    font-size: 1rem; 
  }
  .card-body {
    padding: 1.5rem;
  }
}
</style>