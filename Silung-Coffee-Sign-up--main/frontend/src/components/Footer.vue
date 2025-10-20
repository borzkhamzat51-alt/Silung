<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- About Section -->
        <div class="footer-section">
          <h3>Silung Coffee</h3>
          <p>
            A sanctuary for coffee lovers where comfort meets exceptional taste.
            Experience the warmth of authentic Kapampangan hospitality.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/menu">Menu</router-link></li>
            <li><router-link to="/gallery">Gallery</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="footer-section">
          <h3>Contact Info</h3>
          <ul>
            <li>MacArthur Hwy, Mabalacat City, Pampanga</li>
            <li><a href="tel:+639564303524">Phone: 0956 430 3524</a></li>
            <li><a href="mailto:silungcoffee@gmail.com">Email: silungcoffee@gmail.com</a></li>
          </ul>
        </div>

        <!-- Socials -->
        <div class="footer-section">
          <h3>Follow Us</h3>
          <div class="social-links">
            <a href="https://www.facebook.com/profile.php?id=61557150353381" target="_blank" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/silungcoffee" target="_blank" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 <strong>Silung Coffee</strong>. All rights reserved. | Pipowe Laplana - WD-303</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
/* Add these CSS variables if not already defined in your project */
:root {
  --gray-900: #1a1a1a;
  --gray-800: #2d2d2d;
  --gray-500: #6b7280;
  --gray-400: #9ca3af;
  --secondary: #d1d5db;
  --accent: #f59e0b;
  --transition: all 0.3s ease;
}

.footer {
  background: var(--gray-900);
  color: var(--gray-400);
  padding: 4rem 0 2rem;
  border-top: 1px solid var(--gray-800);
  font-family: 'Inter', sans-serif;
  margin-top: auto; /* This pushes the footer to the bottom */
  width: 100%;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  color: var(--secondary);
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  position: relative;
}

.footer-section h3::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -0.5rem;
  width: 30px;
  height: 2px;
  background: var(--accent);
  border-radius: 1px;
}

.footer-section p,
.footer-section a,
.footer-section li {
  color: var(--gray-400);
  font-size: 0.95rem;
  line-height: 1.7;
  transition: var(--transition);
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section a {
  text-decoration: none;
}

.footer-section a:hover {
  color: var(--secondary);
}

.social-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.social-links a {
  color: var(--gray-400);
  font-size: 1.25rem;
  transition: var(--transition);
}

.social-links a:hover {
  color: var(--accent);
  transform: translateY(-2px);
}

.footer-bottom {
  text-align: center;
  font-size: 0.875rem;
  color: var(--gray-500);
  border-top: 1px solid var(--gray-800);
  padding-top: 1.5rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .footer {
    padding: 3rem 0 1.5rem;
  }

  .footer-content {
    text-align: center;
  }

  .footer-section h3::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .social-links {
    justify-content: center;
  }
}
.customer-messages-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* fills full screen */
}

.section {
  flex: 1; /* pushes footer down */
}
</style>