<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-content">
        <router-link to="/home" class="navbar-brand">
          Silung Coffee
        </router-link>
        
        <ul class="navbar-nav">
          <li>
            <router-link to="/home" class="navbar-link" active-class="active">
              Home
            </router-link>
          </li>
          <li>
            <router-link to="/about" class="navbar-link" active-class="active">
              About
            </router-link>
          </li>
          <li>
            <router-link to="/menu" class="navbar-link" active-class="active">
              Menu
            </router-link>
          </li>
          <li>
            <router-link to="/gallery" class="navbar-link" active-class="active">
              Gallery
            </router-link>
          </li>
          <li>
            <router-link to="/contact" class="navbar-link" active-class="active">
              Contact
            </router-link>
          </li>
          <li v-if="$store.getters['auth/isAuthenticated']">
            <router-link to="/customers" class="navbar-link" active-class="active">
              Customers
            </router-link>
          </li>
          <li v-if="$store.getters['auth/isAuthenticated']">
            <router-link to="/messages" class="navbar-link" active-class="active">
              Messages
            </router-link>
          </li>
          <li v-if="$store.getters['auth/isAuthenticated']">
            <button @click="handleLogout" class="btn btn-secondary btn-sm">
              Logout
            </button>
          </li>
          <li v-else>
            <router-link to="/auth" class="btn btn-primary btn-sm">
              Sign In
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/auth')
    }
  }
}
</script>