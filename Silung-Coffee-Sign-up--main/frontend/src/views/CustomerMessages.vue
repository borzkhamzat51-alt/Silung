<template>
  <div class="customer-messages-page">
    <Navbar />
    
    <section class="section">
      <div class="container">
        <div class="text-center mb-6">
          <h1>Customer Messages</h1>
          <p>View and manage customer inquiries and feedback</p>
        </div>

        <!-- Search Bar -->
        <div class="mb-6">
          <div class="max-w-md mx-auto">
            <input 
              v-model="searchQuery" 
              type="text" 
              class="form-input" 
              placeholder="Search messages by name, email, or content..."
            >
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading">
          <span class="spinner"></span>
          Loading messages...
        </div>

        <!-- Messages List -->
        <div v-else class="space-y-4">
          <div 
            v-for="message in filteredMessages" 
            :key="message._id"
            class="card"
          >
            <div class="card-body">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="font-semibold text-lg">{{ message.name }}</h3>
                  <p class="text-gray-600">{{ message.email }}</p>
                </div>
                <div class="text-right">
                  <span class="text-sm text-gray-500">{{ formatDate(message.createdAt) }}</span>
                  <span 
                    class="ml-2 px-2 py-1 rounded-full text-xs"
                    :class="getStatusClass(message.status)"
                  >
                    {{ message.status }}
                  </span>
                </div>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-gray-800">{{ message.message }}</p>
              </div>
              
              <div class="mt-4 flex gap-2">
                <button 
                  v-if="message.status === 'new'"
                  @click="updateStatus(message._id, 'read')"
                  class="btn btn-secondary btn-sm"
                >
                  Mark as Read
                </button>
                <button 
                  v-if="message.status === 'read'"
                  @click="updateStatus(message._id, 'replied')"
                  class="btn btn-primary btn-sm"
                >
                  Mark as Replied
                </button>
              </div>
            </div>
          </div>
          
          <div v-if="filteredMessages.length === 0" class="text-center py-8">
            <p class="text-gray-600">No messages found</p>
          </div>
        </div>
      </div>
    </section>

    <Footer/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import axios from 'axios'

export default {
  name: 'CustomerMessages',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      messages: [],
      loading: true,
      searchQuery: ''
    }
  },
  computed: {
    filteredMessages() {
      if (!this.searchQuery) {
        return this.messages
      }
      
      const query = this.searchQuery.toLowerCase()
      return this.messages.filter(message => 
        message.name.toLowerCase().includes(query) ||
        message.email.toLowerCase().includes(query) ||
        message.message.toLowerCase().includes(query)
      )
    }
  },
  async mounted() {
    await this.fetchMessages()
  },
  methods: {
    async fetchMessages() {
      try {
        this.loading = true
        const response = await axios.get('/api/contact/messages')
        this.messages = response.data
      } catch (error) {
        console.error('Error fetching messages:', error)
        // Demo data
        this.messages = [
          {
            _id: '1',
            name: 'John Doe',
            email: 'john.doe@email.com',
            message: 'I love your coffee! The Spanish Latte is amazing. Do you have any plans to open a branch in Makati?',
            status: 'new',
            createdAt: new Date()
          },
          {
            _id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@email.com',
            message: 'Hi! I was wondering if you offer catering services for office events. We would love to have Silung Coffee at our company meeting.',
            status: 'read',
            createdAt: new Date()
          }
        ]
      } finally {
        this.loading = false
      }
    },
    
    async updateStatus(messageId, status) {
      try {
        await axios.patch(`/api/contact/messages/${messageId}/status`, { status })
        const message = this.messages.find(m => m._id === messageId)
        if (message) {
          message.status = status
        }
      } catch (error) {
        console.error('Error updating message status:', error)
      }
    },
    
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    
    getStatusClass(status) {
      switch (status) {
        case 'new':
          return 'bg-blue-100 text-blue-800'
        case 'read':
          return 'bg-yellow-100 text-yellow-800'
        case 'replied':
          return 'bg-green-100 text-green-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }
  }
}
</script>

<style scoped>
.customer-messages-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* ensures full height for layout */
}

.section {
  flex: 1; /* pushes footer down */
}
</style>
