<template>
  <div class="gallery-page">
    <Header />

    <!-- 🎬 VIDEO GALLERY -->
    <section id="video-gallery" class="section video-gallery">
      <div class="container">
        <h2 class="section-title">Our Featured Videos</h2>
        <p class="section-subtitle">Experience our stories and craft through motion.</p>
        <div class="gallery-grid videos">
          <div 
            class="video-item" 
            v-for="(video, index) in videos" 
            :key="index"
          >
            <video 
              class="gallery-video" 
              controls 
              muted 
              playsinline 
              preload="metadata"
            >
              <source :src="video.src" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p class="caption">{{ video.caption }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 📸 IMAGE GALLERY -->
    <section id="image-gallery" class="section image-gallery">
      <div class="container">
        <h2 class="section-title">Image Gallery</h2>
        <p class="section-subtitle">A glimpse into our cozy corners, signature blends, and freshly baked pastries.</p>
        <div class="gallery-grid images">
          <div 
            class="gallery-item" 
            v-for="(image, index) in images" 
            :key="index"
          >
            <img 
              :src="image.src" 
              :alt="image.alt" 
              loading="lazy" 
              class="gallery-img"
            />
            <div class="overlay">
              <span class="overlay-text">{{ image.alt }}</span>
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

export default {
  name: 'Gallery',
  components: { Header, Footer },
  data() {
    return {
      videos: [
        { src: '/vids/feature_miming.mp4', caption: 'Miming Feature' },
        { src: '/vids/feature.mp4', caption: 'Silung Feature' },
        { src: '/vids/feature1.mp4', caption: 'Stickers Feature' }
      ],
      images: [
        { src: '/images/crinkels.jpg', alt: 'Crinkles Pastry' },
        { src: '/images/kilub.jpg', alt: 'Cozy Café Interior' },
        { src: '/images/customer.jpg', alt: 'Happy Customers' },
        { src: '/images/order2.jpg', alt: 'Freshly Brewed Order' },
        { src: '/images/front.jpg', alt: 'Coffee Shop Exterior' },
        { src: '/images/silung_kilwal.jpg', alt: 'Coffee Beans Display' },
        { src: '/images/ham&cheese_kwasant.jpg', alt: 'Ham & Cheese Croissant' },
        { src: '/images/almond_kwasant.jpg', alt: 'Almond Croissant' },
        { src: '/images/choco_almond.jpg', alt: 'Choco Almond Pastry' },
        { src: '/images/cinnamon_danish.jpg', alt: 'Cinnamon Danish' },
        { src: '/images/pistachio_kwasant.jpg', alt: 'Pistachio Croissant' },
        { src: '/images/ube_danish.jpg', alt: 'Ube Danish' }
      ]
    }
  }
}
</script>

<style scoped>
.gallery-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f5f2;
  color: #3b2f2f;
  font-family: 'Poppins', sans-serif;
}

/* Section */
.section {
  padding: 80px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Titles */
.section-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  color: #4b2e05;
  margin-bottom: 10px;
}

.section-subtitle {
  text-align: center;
  color: #7a6a5b;
  font-size: 1.1rem;
  margin-bottom: 50px;
}

/* 🎞️ Video Gallery */
.gallery-grid.videos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.video-item {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.video-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.gallery-video {
  width: 100%;
  height: 380px; /* 👈 consistent height for all videos */
  object-fit: cover;
  border-bottom: 2px solid #eee;
}

.caption {
  text-align: center;
  font-weight: 600;
  padding: 14px 0;
  color: #4b2e05;
  background-color: #fff;
  border-top: 1px solid #f0e6da;
}

/* 🖼️ Image Gallery */
.gallery-grid.images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.gallery-item:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.2);
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Overlay */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(45, 33, 21, 0.6);
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .overlay {
  opacity: 1;
}

.overlay-text {
  color: #fff8f2;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  padding: 10px 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 1.8rem;
  }

  .gallery-video {
    height: 250px;
  }

  .caption {
    font-size: 0.95rem;
  }
}
</style>
