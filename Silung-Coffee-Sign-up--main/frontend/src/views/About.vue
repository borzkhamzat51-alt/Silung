<template>
  <div class="about-page">
    <Navbar />

    <!-- 🎥 ENHANCED HERO SECTION -->
    <section class="hero">
      <video autoplay muted loop playsinline class="hero-video">
        <source src="/vids/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <!-- Animated Background Elements -->
      <div class="hero-particles">
        <div class="particle" v-for="particle in 15" :key="particle" :style="getParticleStyle(particle)"></div>
      </div>
      
      <!-- Floating Coffee Elements -->
      <div class="floating-elements">
        <div class="coffee-element" v-for="element in 6" :key="element" :style="getCoffeeElementStyle(element)">
          {{ getCoffeeIcon(element) }}
        </div>
      </div>
      
      <div class="hero-overlay">
        <div class="hero-content">
          <!-- Animated Main Title -->
          <div class="title-container">
            <h1 class="hero-title">
              <span class="title-word" v-for="(word, index) in titleWords" :key="word" 
                    :style="{ animationDelay: `${index * 0.2}s` }">
                {{ word }}
              </span>
            </h1>
          </div>
          
          <!-- Enhanced Subtitle -->
          <p class="hero-subtitle">
            <span class="subtitle-text">Discover the passion and tradition behind Silung Coffee</span>
          </p>
          
          <!-- Animated Scroll Indicator -->
          <div class="scroll-indicator">
            <div class="scroll-arrow"></div>
            <span class="scroll-text">Explore Our Story</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ☕ ENHANCED BEGINNING SECTION -->
    <section class="section beginning-section">
      <div class="container">
        <!-- Animated Section Header -->
        <div class="section-header">
          <h2 class="section-title animated-title">
            <span class="title-text">The Beginning</span>
            <div class="title-underline"></div>
          </h2>
        </div>
        
        <div class="grid grid-2 align-center">
          <div class="text-content">
            <!-- Animated Text Blocks -->
            <div class="text-block animated-text" style="animation-delay: 0.2s">
              <p>
                Silung Coffee started with the idea of establishing a place that would be a haven for coffee lovers. 
                Silung, a Kapampangan word that means "shelter," reflects our goal to create a homey space where customers 
                can rest, reflect, and reconnect.
              </p>
            </div>
            
            <div class="text-block animated-text" style="animation-delay: 0.4s">
              <p>
                Our journey began with a simple vision — to create a space where people could find comfort, connection, 
                and exceptional coffee in equal measure. Every bean tells a story, and every cup creates a memory.
              </p>
            </div>
            
            <!-- Enhanced Button -->
            <div class="button-container animated-text" style="animation-delay: 0.6s">
              <router-link to="/menu" class="btn btn-elegant">
                <span class="btn-icon">☕</span>
                <span class="btn-text">Explore Our Menu</span>
                <div class="btn-shine"></div>
              </router-link>
            </div>
          </div>
          
          <div class="image-container">
            <!-- Enhanced Image with Hover Effect -->
            <div class="image-wrapper animated-image">
              <img src="/images/kilub_silung.jpg" alt="Silung Coffee Interior" class="enhanced-image" />
              <div class="image-overlay">
                <div class="overlay-content">
                  <span class="overlay-icon">🏠</span>
                  <span class="overlay-text">Our Home</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 🌿 ENHANCED PHILOSOPHY SECTION -->
    <section class="section philosophy-section">
      <div class="container">
        <!-- Animated Section Header -->
        <div class="section-header">
          <h2 class="section-title animated-title">
            <span class="title-text">Our Philosophy</span>
            <div class="title-underline"></div>
          </h2>
          <p class="section-desc animated-text">More than just coffee, we're building a community.</p>
        </div>

        <!-- Enhanced Cards with Staggered Animation -->
        <div class="philosophy-grid">
          <div class="philosophy-card animated-card" v-for="(card, index) in philosophyCards" :key="card.title"
               :style="{ animationDelay: `${index * 0.2}s` }">
            <div class="card-icon-wrapper">
              <div class="card-icon">{{ card.icon }}</div>
              <div class="icon-glow"></div>
            </div>
            <h3 class="card-title">{{ card.title }}</h3>
            <p class="card-description">{{ card.description }}</p>
            <div class="card-decoration"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 🤝 ENHANCED JOIN OUR FAMILY SECTION -->
    <section class="section join-section">
      <div class="container">
        <div class="grid grid-2 align-center">
          <div class="image-container">
            <!-- Enhanced Image with Parallax Effect -->
            <div class="parallax-wrapper">
              <img src="/images/customer.jpg" alt="Happy Customers" class="parallax-image" />
              <div class="parallax-overlay"></div>
            </div>
          </div>
          
          <div class="text-content">
            <!-- Animated Content -->
            <h2 class="section-title animated-title">
              <span class="title-text">Join Our Family</span>
              <div class="title-underline"></div>
            </h2>
            
            <div class="text-block animated-text" style="animation-delay: 0.2s">
              <p>
                We would like to extend the invitation to stay longer, have a rest, and enjoy your time under our roof. 
                Experience the warmth of authentic Kapampangan hospitality.
              </p>
            </div>
            
            <div class="text-block animated-text" style="animation-delay: 0.4s">
              <p>
                Whether you're a coffee connoisseur or simply looking for a comfortable place to unwind, 
                Silung Coffee welcomes you with open arms.
              </p>
            </div>
            
            <!-- Enhanced Button Group -->
            <div class="button-group animated-text" style="animation-delay: 0.6s">
              <router-link to="/menu" class="btn btn-primary-elegant">
                <span class="btn-icon">📖</span>
                <span class="btn-text">View Menu</span>
              </router-link>
              <router-link to="/contact" class="btn btn-outline-elegant">
                <span class="btn-icon">💬</span>
                <span class="btn-text">Contact Us</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ✨ MISSION STATEMENT SECTION -->
    <section class="section mission-section">
      <div class="container">
        <div class="mission-statement">
          <div class="mission-icon">✨</div>
          <h3 class="mission-title">Our Promise</h3>
          <p class="mission-text">
            To serve not just coffee, but comfort in every cup. To build not just a business, 
            but a community where every guest becomes family.
          </p>
          <div class="mission-decoration"></div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'About',
  components: { Navbar, Footer },
  data() {
    return {
      titleWords: ['Our', 'Story'],
      philosophyCards: [
        {
          icon: '⭐',
          title: 'Quality',
          description: 'We source the finest beans and prepare each cup with care, ensuring every sip delivers exceptional flavor and aroma that tells our story.'
        },
        {
          icon: '👥',
          title: 'Community',
          description: 'Silung is more than a coffee shop — it\'s a community where conversations flow as smoothly as our espresso and friendships brew naturally.'
        },
        {
          icon: '🛋️',
          title: 'Comfort',
          description: 'We invite you to stay longer, rest, and enjoy your time under our roof — a true sanctuary where every moment feels like home.'
        }
      ]
    }
  },
  methods: {
    getParticleStyle(index) {
      const sizes = [4, 6, 8, 10];
      const opacities = [0.3, 0.5, 0.7, 0.9];
      const delays = [0, 1, 2, 3, 4];
      return {
        width: `${sizes[index % sizes.length]}px`,
        height: `${sizes[index % sizes.length]}px`,
        opacity: opacities[index % opacities.length],
        animationDelay: `${delays[index % delays.length]}s`,
        left: `${(index * 7)}%`
      };
    },
    getCoffeeElementStyle(index) {
      const sizes = [24, 28, 32, 36];
      const delays = [0, 2, 4, 1, 3, 5];
      return {
        fontSize: `${sizes[index % sizes.length]}px`,
        animationDelay: `${delays[index % delays.length]}s`,
        top: `${20 + (index * 12)}%`,
        left: `${10 + (index * 15)}%`
      };
    },
    getCoffeeIcon(index) {
      const icons = ['☕', '🌱', '✨', '🔥', '💫', '🌟'];
      return icons[index % icons.length];
    }
  }
}
</script>

<style scoped>
/* 🎥 ENHANCED HERO SECTION */
.hero {
  position: relative;
  height: 80vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-video {
  position: absolute;
  top: 0; 
  left: 0;
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
  animation: float-element 10s ease-in-out infinite;
  filter: brightness(1.2);
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
    transform: translateY(-50px) rotate(180deg);
    opacity: 1;
  }
}

.hero-overlay {
  position: relative;
  z-index: 2;
  width: 100%; 
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(0, 0, 0, 0.7) 0%, 
    rgba(139, 69, 19, 0.4) 50%, 
    rgba(0, 0, 0, 0.7) 100%);
  display: flex; 
  align-items: center; 
  justify-content: center;
  text-align: center;
  color: #fff;
}

.hero-content {
  max-width: 800px;
  padding: 0 2rem;
}

/* Enhanced Title with Word-by-Word Animation */
.title-container {
  margin-bottom: 2rem;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
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
    0 0 20px rgba(255, 255, 255, 0.8),
    0 0 40px rgba(255, 255, 255, 0.6),
    0 0 60px rgba(255, 255, 255, 0.4);
  animation: 
    wordSlideIn 1s ease both,
    titleGlow 3s ease-in-out infinite alternate;
  position: relative;
  padding: 0 1rem;
}

@keyframes wordSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px) rotateX(90deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
}

@keyframes titleGlow {
  0% {
    text-shadow: 
      0 0 20px rgba(255, 255, 255, 0.8),
      0 0 40px rgba(255, 255, 255, 0.6),
      0 0 60px rgba(255, 255, 255, 0.4);
  }
  100% {
    text-shadow: 
      0 0 30px rgba(255, 255, 255, 0.9),
      0 0 60px rgba(255, 255, 255, 0.7),
      0 0 90px rgba(255, 255, 255, 0.5);
  }
}

/* Enhanced Subtitle */
.hero-subtitle {
  font-size: 1.4rem;
  color: #ffffff;
  opacity: 0.95;
  animation: fadeInUp 1s ease 0.6s both;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-weight: 300;
  letter-spacing: 1px;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.subtitle-text {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Enhanced Scroll Indicator */
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: fadeIn 1s ease 1s both;
}

.scroll-arrow {
  width: 30px;
  height: 30px;
  border-right: 2px solid rgba(255, 255, 255, 0.8);
  border-bottom: 2px solid rgba(255, 255, 255, 0.8);
  transform: rotate(45deg);
  animation: bounce 2s infinite;
}

.scroll-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 2px;
  text-transform: uppercase;
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

/* 🧱 ENHANCED GENERAL LAYOUT */
.section {
  padding: 6rem 0;
  position: relative;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.grid {
  display: grid;
  gap: 4rem;
}

.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}

.align-center {
  align-items: center;
}

/* Section Backgrounds */
.beginning-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.philosophy-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%);
}

.join-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.mission-section {
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
  color: white;
  text-align: center;
}

/* Enhanced Section Headers */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.animated-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  animation: slideInUp 0.8s ease both;
}

.title-text {
  display: inline-block;
  position: relative;
}

.title-underline {
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #8B4513, #D2691E, #8B4513);
  margin: 1rem auto 0;
  border-radius: 2px;
  animation: expandWidth 1s ease 0.5s both;
}

.section-desc {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Enhanced Text Content */
.text-content {
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

/* Enhanced Image Styles */
.image-container {
  position: relative;
}

.image-wrapper {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
}

.enhanced-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
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
  gap: 0.5rem;
  color: white;
}

.overlay-icon {
  font-size: 1.5rem;
}

.overlay-text {
  font-size: 1.1rem;
  font-weight: 600;
}

/* Enhanced Philosophy Cards */
.philosophy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.philosophy-card {
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

.philosophy-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(139, 69, 19, 0.15);
}

.card-icon-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(139, 69, 19, 0.1);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d1f16;
  margin-bottom: 1rem;
}

.card-description {
  color: #666;
  line-height: 1.6;
}

.card-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #8B4513, #D2691E);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.philosophy-card:hover .card-decoration {
  transform: scaleX(1);
}

/* Enhanced Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
}

.btn-elegant {
  background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
  color: white;
  box-shadow: 0 5px 15px rgba(139, 69, 19, 0.3);
}

.btn-elegant:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(139, 69, 19, 0.4);
}

.btn-primary-elegant {
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
  color: white;
  box-shadow: 0 5px 15px rgba(139, 69, 19, 0.3);
}

.btn-primary-elegant:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(139, 69, 19, 0.4);
}

.btn-outline-elegant {
  background: transparent;
  color: #8B4513;
  border: 2px solid #8B4513;
}

.btn-outline-elegant:hover {
  background: #8B4513;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(139, 69, 19, 0.3);
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

.btn:hover .btn-shine {
  left: 100%;
}

.button-container {
  margin-top: 2rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

/* Mission Section */
.mission-statement {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

.mission-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

.mission-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: white;
}

.mission-text {
  font-size: 1.3rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
}

.mission-decoration {
  width: 100px;
  height: 2px;
  background: rgba(255, 255, 255, 0.5);
  margin: 0 auto;
  border-radius: 1px;
}

/* Parallax Effect */
.parallax-wrapper {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.parallax-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.parallax-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.2) 0%, transparent 100%);
}

/* Animation Classes */
.animated-text {
  animation: slideInLeft 0.8s ease both;
}

.animated-image {
  animation: slideInRight 0.8s ease both;
}

.animated-card {
  animation: slideInUp 0.8s ease both;
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

@keyframes expandWidth {
  from { width: 0; }
  to { width: 80px; }
}

@keyframes pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.1); }
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

/* 🧍‍♂️ RESPONSIVE DESIGN */
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
  
  .animated-title {
    font-size: 2.2rem;
  }
  
  .philosophy-grid {
    grid-template-columns: 1fr;
  }
  
  .button-group {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
  
  /* Reduce animations on mobile */
  .hero-particles,
  .floating-elements {
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
  
  .animated-title {
    font-size: 1.8rem;
  }
  
  .mission-title {
    font-size: 2rem;
  }
  
  .mission-text {
    font-size: 1.1rem;
  }
}

/* Utility Classes */
.text-center { text-align: center; }
.mb-10 { margin-bottom: 2.5rem; }
.mt-4 { margin-top: 1rem; }
</style>