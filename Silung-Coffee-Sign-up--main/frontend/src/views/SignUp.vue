<template>
  <div class="signup-page">
    <Header />
    
    <section class="form-section">
      <div class="container">
        <h2>Customer Information</h2>
        <div class="form-wrapper">
          <div class="form-box">
            <h3>Fill in your details</h3>
            <form @submit.prevent="submitForm">
              <label for="firstName">First Name</label>
              <input 
                v-model="form.firstName" 
                type="text" 
                id="firstName" 
                name="firstName" 
                required
                :disabled="submitting"
              >

              <label for="lastName">Last Name</label>
              <input 
                v-model="form.lastName" 
                type="text" 
                id="lastName" 
                name="lastName" 
                required
                :disabled="submitting"
              >

              <label>Gender</label>
              <div class="radio-group">
                <label><input v-model="form.gender" type="radio" name="gender" value="Male" required :disabled="submitting"> Male</label>
                <label><input v-model="form.gender" type="radio" name="gender" value="Female" :disabled="submitting"> Female</label>
                <label><input v-model="form.gender" type="radio" name="gender" value="Other" :disabled="submitting"> Other</label>
              </div>

              <label for="address">Address</label>
              <textarea 
                v-model="form.address" 
                id="address" 
                name="address" 
                rows="3" 
                required
                :disabled="submitting"
              ></textarea>

              <label for="contactNumber">Contact Number</label>
              <input 
                v-model="form.contactNumber" 
                type="text" 
                id="contactNumber" 
                name="contactNumber" 
                required
                :disabled="submitting"
              >

              <label for="email">Email Address</label>
              <input 
                v-model="form.email" 
                type="email" 
                id="email" 
                name="email" 
                required
                :disabled="submitting"
              >

              <label for="dob">Date of Birth</label>
              <input 
                v-model="form.dateOfBirth" 
                type="date" 
                id="dob" 
                name="dateOfBirth" 
                required
                :disabled="submitting"
              >

              <label for="username">Username</label>
              <input 
                v-model="form.username" 
                type="text" 
                id="username" 
                name="username" 
                required
                :disabled="submitting"
              >

              <label for="password">Password</label>
              <input 
                v-model="form.password" 
                type="password" 
                id="password" 
                name="password" 
                required
                :disabled="submitting"
              >

              <div class="btn-group">
                <button type="submit" class="btn" :disabled="submitting">
                  {{ submitting ? 'Submitting...' : 'Submit' }}
                </button>
                <button type="button" class="btn" @click="resetForm" :disabled="submitting">
                  Reset
                </button>
              </div>
            </form>
          </div>

          <div class="output-box">
            <h3>Submitted Info</h3>
            <div v-if="submittedData">
              <p><strong>First Name:</strong> {{ submittedData.firstName }}</p>
              <p><strong>Last Name:</strong> {{ submittedData.lastName }}</p>
              <p><strong>Gender:</strong> {{ submittedData.gender }}</p>
              <p><strong>Address:</strong> {{ submittedData.address }}</p>
              <p><strong>Contact Number:</strong> {{ submittedData.contactNumber }}</p>
              <p><strong>Email:</strong> {{ submittedData.email }}</p>
              <p><strong>Date of Birth:</strong> {{ formatDate(submittedData.dateOfBirth) }}</p>
              <p><strong>Username:</strong> {{ submittedData.username }}</p>
            </div>
            <div v-else>
              <p>No data submitted yet.</p>
            </div>
            <div v-if="message" class="message" :class="message.type">
              {{ message.text }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { mapActions } from 'vuex'

export default {
  name: 'SignUp',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        gender: '',
        address: '',
        contactNumber: '',
        email: '',
        dateOfBirth: '',
        username: '',
        password: ''
      },
      submittedData: null,
      submitting: false,
      message: null
    }
  },
  methods: {
    ...mapActions('auth', ['register']),
    async submitForm() {
      this.submitting = true
      this.message = null
      
      try {
        const result = await this.register(this.form)
        
        if (result.success) {
          this.submittedData = { ...this.form }
          this.message = {
            type: 'success',
            text: result.message
          }
          this.resetForm()
        } else {
          this.message = {
            type: 'error',
            text: result.message
          }
        }
      } catch (error) {
        this.message = {
          type: 'error',
          text: 'An unexpected error occurred. Please try again.'
        }
      } finally {
        this.submitting = false
      }
    },
    resetForm() {
      this.form = {
        firstName: '',
        lastName: '',
        gender: '',
        address: '',
        contactNumber: '',
        email: '',
        dateOfBirth: '',
        username: '',
        password: ''
      }
      this.submittedData = null
      this.message = null
    },
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString()
    }
  }
}
</script>

<style scoped>
.radio-group {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.radio-group label {
  display: flex;
  align-items: center;
  margin-bottom: 0;
}

.radio-group input[type="radio"] {
  width: auto;
  margin-right: 8px;
}

.message {
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
