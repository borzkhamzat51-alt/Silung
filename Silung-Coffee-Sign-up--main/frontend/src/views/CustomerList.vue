<template>
  <div class="customer-list-page">
    <!-- Header -->
    <Navbar />

    <!-- Main Section -->
    <section class="section">
      <div class="container">
        <div class="text-center mb-8">
          <h1 class="page-title">Customer List</h1>
          <p class="page-subtitle">Manage and view customer information</p>
        </div>

        <!-- Search Bar -->
        <div class="mb-6">
          <div class="max-w-md mx-auto">
            <input
              v-model="searchQuery"
              type="text"
              class="form-input search-bar"
              placeholder="Search customers by name, email, or username..."
            />
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading text-center py-16">
          <span class="spinner"></span>
          <p class="mt-4 text-gray-600">Loading customers...</p>
        </div>

        <!-- Customer Table -->
        <div v-else class="card">
          <div class="card-body">
            <div class="overflow-x-auto">
              <table class="customer-table w-full border-collapse">
                <thead>
                  <tr class="border-b bg-gray-100">
                    <th class="text-left p-4">Name</th>
                    <th class="text-left p-4">Email</th>
                    <th class="text-left p-4">Username</th>
                    <th class="text-left p-4">Phone</th>
                    <th class="text-left p-4">Gender</th>
                    <th class="text-left p-4">Date Joined</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="customer in filteredCustomers"
                    :key="customer._id"
                    class="border-b hover:bg-gray-50 transition duration-150"
                  >
                    <td class="p-4 font-medium text-gray-800">
                      {{ customer.firstName }} {{ customer.lastName }}
                    </td>
                    <td class="p-4 text-gray-700">{{ customer.email }}</td>
                    <td class="p-4 text-gray-700">{{ customer.username }}</td>
                    <td class="p-4 text-gray-700">{{ customer.contactNumber }}</td>
                    <td class="p-4 text-gray-700">{{ customer.gender }}</td>
                    <td class="p-4 text-gray-700">{{ formatDate(customer.createdAt) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="filteredCustomers.length === 0" class="text-center py-10">
              <p class="text-gray-500">No customers found.</p>
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
  name: 'CustomerList',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      customers: [],
      loading: true,
      searchQuery: ''
    }
  },
  computed: {
    filteredCustomers() {
      const query = this.searchQuery.trim().toLowerCase()
      if (!query) return this.customers

      return this.customers.filter(customer =>
        [customer.firstName, customer.lastName, customer.email, customer.username]
          .some(field => field?.toLowerCase().includes(query))
      )
    }
  },
  async mounted() {
    await this.fetchCustomers()
  },
  methods: {
    async fetchCustomers() {
      try {
        this.loading = true
        const response = await axios.get('/api/auth/customers')
        this.customers = response.data
      } catch (error) {
        console.error('Error fetching customers:', error)

        // Demo fallback data
        this.customers = [
          {
            _id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@email.com',
            username: 'johndoe',
            contactNumber: '09123456789',
            gender: 'Male',
            createdAt: new Date()
          },
          {
            _id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@email.com',
            username: 'janesmith',
            contactNumber: '09876543210',
            gender: 'Female',
            createdAt: new Date()
          }
        ]
      } finally {
        this.loading = false
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
/* General Layout */
.section {
  padding: 5rem 1.5rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Titles */
.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #3a2e2e;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #7a6a6a;
}

/* Search Bar */
.search-bar {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  transition: border 0.3s ease;
}
.search-bar:focus {
  border-color: #9b6b43;
  outline: none;
}

/* Card */
.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  overflow: hidden;
}

.card-body {
  padding: 2rem;
}

/* Table */
.customer-table th {
  font-weight: 700;
  color: #3a2e2e;
}

.customer-table td {
  color: #4b4b4b;
  font-size: 0.95rem;
}

/* Loading Spinner */
.spinner {
  display: inline-block;
  width: 2.2rem;
  height: 2.2rem;
  border: 3px solid #e0e0e0;
  border-top: 3px solid #9b6b43;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  .card-body {
    padding: 1.5rem;
  }
}

.customer-list-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* ensures it fills full screen */
}

.section {
  flex: 1; /* pushes footer down when content is short */
}
</style>
