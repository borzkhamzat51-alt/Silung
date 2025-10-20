<template>
  <div class="auth-container">
    <div class="container">
      <!-- Lamp Section -->
      <div class="lamp-section">
        <div class="lamp" @click="toggleLamp">
          <div class="lamp-base"></div>
          <div class="lamp-post"></div>
          <div class="lamp-shade" :class="{ on: lampOn }">
            <div class="lamp-light" v-if="lampOn"></div>
          </div>
          <div class="lamp-cord" @mousedown="startPull" @touchstart="startPull">
            <div class="cord" :style="cordStyle"></div>
            <div class="cord-handle"></div>
          </div>
          <div class="lamp-face">
            <div class="lamp-eyes">
              <div class="eye left" :class="{ on: lampOn }"></div>
              <div class="eye right" :class="{ on: lampOn }"></div>
            </div>
            <div class="lamp-mouth" :class="{ on: lampOn }"></div>
          </div>
          <div class="coffee-steam" v-if="lampOn">
            <div class="steam steam-1"></div>
            <div class="steam steam-2"></div>
            <div class="steam steam-3"></div>
          </div>
        </div>
        <div class="pull-instruction">Pull the cord for coffee!</div>
      </div>

      <!-- Sign Up Form -->
      <div class="login-form" :class="{ active: showSignUp }">
        <div class="auth-header">
          <h1 class="auth-title">Silung Coffee</h1>
          <p class="auth-subtitle">Under the shade of comfort</p>
        </div>

        <div v-if="!isLogin" class="auth-form">
          <h2>Create Account</h2>
          <form @submit.prevent="handleRegister">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input 
                v-model="registerForm.firstName" 
                type="text" 
                id="firstName" 
                required
                :disabled="loading"
              >
            </div>
            
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input 
                v-model="registerForm.lastName" 
                type="text" 
                id="lastName" 
                required
                :disabled="loading"
              >
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                v-model="registerForm.email" 
                type="email" 
                id="email" 
                required
                :disabled="loading"
              >
            </div>
            
            <div class="form-group">
              <label for="username">Username</label>
              <input 
                v-model="registerForm.username" 
                type="text" 
                id="username" 
                required
                :disabled="loading"
              >
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <input 
                v-model="registerForm.password" 
                type="password" 
                id="password" 
                required
                :disabled="loading"
              >
            </div>
            
            <button type="submit" class="login-btn" :disabled="loading">
              <span v-if="loading" class="spinner"></span>
              {{ loading ? 'Brewing Account...' : 'Create Account' }}
            </button>
          </form>
        </div>

        <div v-else class="auth-form">
          <h2>Welcome Back</h2>
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="loginUsername">Username or Email</label>
              <input 
                v-model="loginForm.username" 
                type="text" 
                id="loginUsername" 
                required
                :disabled="loading"
              >
            </div>
            
            <div class="form-group">
              <label for="loginPassword">Password</label>
              <input 
                v-model="loginForm.password" 
                type="password" 
                id="loginPassword" 
                required
                :disabled="loading"
              >
            </div>
            
            <button type="submit" class="login-btn" :disabled="loading">
              <span v-if="loading" class="spinner"></span>
              {{ loading ? 'Brewing Login...' : 'Sign In' }}
            </button>
          </form>
        </div>

        <div v-if="message" class="alert" :class="message.type">
          {{ message.text }}
        </div>

        <div class="form-footer">
          <p v-if="!isLogin">
            Already have an account? 
            <a href="#" @click.prevent="isLogin = true" class="forgot-link">Sign In</a>
          </p>
          <p v-else>
            Don't have an account? 
            <a href="#" @click.prevent="isLogin = false" class="forgot-link">Create Account</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Auth',
  data() {
    return {
      showSignUp: false,
      lampOn: false,
      isLogin: false,
      loading: false,
      message: null,
      isPulling: false,
      pullDistance: 0,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        gender: 'Other',
        address: '',
        contactNumber: '',
        dateOfBirth: ''
      }
    }
  },
  computed: {
    cordStyle() {
      return {
        height: `${40 + this.pullDistance}px`
      }
    }
  },
  methods: {
    ...mapActions('auth', ['login', 'register']),
    
    toggleLamp() {
      this.lampOn = !this.lampOn
      if (this.lampOn) {
        this.showSignUp = true
      }
    },
    
    startPull(event) {
      this.isPulling = true
      const startY = event.type.includes('touch') ? event.touches[0].clientY : event.clientY
      
      const handleMove = (moveEvent) => {
        if (!this.isPulling) return
        const currentY = moveEvent.type.includes('touch') ? moveEvent.touches[0].clientY : moveEvent.clientY
        this.pullDistance = Math.min(Math.max(currentY - startY, 0), 100)
        
        if (this.pullDistance > 50 && !this.lampOn) {
          this.lampOn = true
          this.showSignUp = true
          this.playCoffeeSound()
        }
      }
      
      const handleEnd = () => {
        this.isPulling = false
        this.pullDistance = 0
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('touchmove', handleMove)
        document.removeEventListener('mouseup', handleEnd)
        document.removeEventListener('touchend', handleEnd)
      }
      
      document.addEventListener('mousemove', handleMove)
      document.addEventListener('touchmove', handleMove)
      document.addEventListener('mouseup', handleEnd)
      document.addEventListener('touchend', handleEnd)
    },
    
    playCoffeeSound() {
      // Gentle coffee brewing sound simulation
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = 400
      gainNode.gain.value = 0.05
      
      oscillator.start()
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3)
      oscillator.stop(audioContext.currentTime + 0.3)
    },
    
    async handleLogin() {
      this.loading = true
      this.message = null
      
      try {
        const result = await this.login(this.loginForm)
        if (result.success) {
          this.$router.push('/home')
        } else {
          this.message = { type: 'alert-error', text: result.message }
        }
      } catch (error) {
        this.message = { type: 'alert-error', text: 'Login failed. Please try again.' }
      } finally {
        this.loading = false
      }
    },
    
    async handleRegister() {
      this.loading = true
      this.message = null
      
      try {
        const result = await this.register(this.registerForm)
        if (result.success) {
          this.message = { type: 'alert-success', text: 'Account created successfully! Please sign in.' }
          this.isLogin = true
          this.registerForm = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            gender: 'Other',
            address: '',
            contactNumber: '',
            dateOfBirth: ''
          }
        } else {
          this.message = { type: 'alert-error', text: result.message }
        }
      } catch (error) {
        this.message = { type: 'alert-error', text: 'Registration failed. Please try again.' }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #000000;
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8vmin;
  flex-wrap: wrap;
  padding: 2rem;
}

/* Lamp Styles */
.lamp-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.lamp {
  position: relative;
  width: 120px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lamp-base {
  width: 80px;
  height: 20px;
  background: linear-gradient(135deg, #8B4513, #5D4037);
  border-radius: 10px;
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.lamp-post {
  width: 15px;
  height: 120px;
  background: linear-gradient(to right, #5D4037, #3E2723);
  z-index: 2;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.3);
}

.lamp-shade {
  width: 140px;
  height: 80px;
  background: linear-gradient(135deg, #5D4037, #3E2723);
  border-radius: 50% 50% 10px 10px;
  position: relative;
  transform-origin: bottom;
  transition: all 0.3s ease;
  z-index: 1;
  margin-top: -10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  border: 2px solid #8B4513;
}

.lamp-shade.on {
  background: linear-gradient(135deg, #6D4C41, #4E342E);
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.3),
              0 0 80px rgba(139, 69, 19, 0.4);
  border-color: #A1887F;
}

.lamp-light {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 60px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent);
  clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
  z-index: 0;
  filter: blur(8px);
}

.lamp-cord {
  position: absolute;
  top: 80px;
  right: 50%;
  cursor: pointer;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cord {
  width: 4px;
  height: 40px;
  background: #5D4037;
  border-radius: 2px;
  transition: height 0.1s ease;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.cord-handle {
  width: 12px;
  height: 12px;
  background: #3E2723;
  border-radius: 50%;
  border: 2px solid #000000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.lamp-face {
  position: absolute;
  top: 50px;
  width: 80px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

.lamp-eyes {
  display: flex;
  gap: 20px;
  margin-bottom: 8px;
}

.eye {
  width: 8px;
  height: 8px;
  background: #000000;
  border-radius: 50%;
  transition: all 0.3s ease;
  border: 1px solid #8B4513;
}

.eye.on {
  background: #FFFFFF;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.9);
  animation: blink 2s infinite;
}

.lamp-mouth {
  width: 20px;
  height: 8px;
  background: #000000;
  border-radius: 0 0 10px 10px;
  transition: all 0.3s ease;
  border: 1px solid #8B4513;
}

.lamp-mouth.on {
  background: #FFFFFF;
  height: 12px;
  animation: smile 2s infinite;
}

/* Coffee Steam Animation */
.coffee-steam {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.steam {
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  animation: steam-rise 3s infinite;
}

.steam-1 {
  width: 8px;
  height: 8px;
  left: -20px;
  animation-delay: 0s;
}

.steam-2 {
  width: 6px;
  height: 6px;
  left: 0px;
  animation-delay: 0.5s;
}

.steam-3 {
  width: 7px;
  height: 7px;
  left: 20px;
  animation-delay: 1s;
}

@keyframes steam-rise {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.8;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-40px) scale(1.5);
    opacity: 0;
  }
}

@keyframes blink {
  0%, 90%, 100% {
    transform: scaleY(1);
  }
  95% {
    transform: scaleY(0.1);
  }
}

@keyframes smile {
  0%, 100% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(1.2);
  }
}

.pull-instruction {
  color: #FFFFFF;
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

/* Form Styles */
.login-form {
  background: rgba(0, 0, 0, 0.9);
  padding: 3rem 2.5rem;
  border-radius: 20px;
  min-width: 320px;
  opacity: 0;
  transform: scale(0.8) translateY(20px);
  pointer-events: none;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 2px solid transparent;
  box-shadow: 0 0 0px rgba(255, 255, 255, 0);
  backdrop-filter: blur(10px);
}

.login-form.active {
  opacity: 1;
  transform: scale(1) translateY(0);
  pointer-events: all;
  border-color: #8B4513;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1),
    0 0 40px #8B4513,
    inset 0 0 20px rgba(255, 255, 255, 0.05);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-title {
  color: #FFFFFF;
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  font-weight: 700;
  letter-spacing: 1px;
}

.auth-subtitle {
  color: #A1887F;
  font-size: 1.1rem;
  margin: 0;
  font-style: italic;
  text-shadow: 0 0 10px rgba(161, 136, 127, 0.5);
}

.auth-form h2 {
  color: #FFFFFF;
  font-size: 2rem;
  margin: 0 0 2rem 0;
  text-align: center;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: #A1887F;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 8px rgba(161, 136, 127, 0.5);
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(62, 39, 35, 0.3);
  border: 2px solid rgba(139, 69, 19, 0.5);
  border-radius: 10px;
  color: #FFFFFF;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #FFFFFF;
  box-shadow: 0 0 15px #FFFFFF;
  background: rgba(62, 39, 35, 0.5);
}

.form-group input::placeholder {
  color: #8D6E63;
}

.form-group input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-btn {
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, #5D4037, #3E2723);
  border: none;
  border-radius: 10px;
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.5px;
  border: 1px solid #8B4513;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.6), 
              0 0 25px #8B4513;
  background: linear-gradient(135deg, #6D4C41, #4E342E);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

.form-footer {
  margin-top: 1.5rem;
  text-align: center;
}

.form-footer p {
  color: #8D6E63;
  font-size: 0.9rem;
  margin: 0;
}

.forgot-link {
  color: #A1887F;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.forgot-link:hover {
  color: #FFFFFF;
  text-shadow: 0 0 12px #FFFFFF;
  text-decoration: underline;
}

.alert {
  padding: 12px 15px;
  border-radius: 10px;
  margin: 20px 0;
  text-align: center;
  font-weight: 500;
  border: 1px solid;
}

.alert-success {
  background: rgba(76, 175, 80, 0.2);
  color: #A5D6A7;
  border-color: #4CAF50;
}

.alert-error {
  background: rgba(244, 67, 54, 0.2);
  color: #EF9A9A;
  border-color: #F44336;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid #FFFFFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 4vmin;
  }
  
  .lamp {
    transform: scale(0.8);
  }
  
  .login-form {
    padding: 2rem 1.5rem;
  }
}
</style>