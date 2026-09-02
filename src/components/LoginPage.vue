<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getAssetUrl } from '../utils/assetHelper.js'

const props = defineProps({
  isDarkMode: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['login-success', 'toggle-theme'])

const isSignUp = ref(true)
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const rememberMe = ref(true)
const errorMessage = ref('')
const isLoading = ref(false)

// Showcase Carousel Slides (Left Side Food Animation)
const currentSlide = ref(0)
const slides = [
  {
    image: getAssetUrl('/images/pizza.jpg'),
    tagline: 'Need some Pizza, yo?',
    description: "C'mon and order from nearby Pizza delivery and pickup restaurants",
  },
  {
    image: getAssetUrl('/images/burger.jpg'),
    tagline: 'Craving a Gourmet Burger?',
    description: 'Freshly grilled beef patties with melted cheddar and signature house sauce',
  },
  {
    image: getAssetUrl('/images/matcha.jpg'),
    tagline: 'Thirsty for Artisan Drinks?',
    description: 'Handcrafted iced matcha latte and refreshing cafe drinks prepared daily',
  },
  {
    image: getAssetUrl('/images/fries.jpg'),
    tagline: 'Crispy Golden Sides',
    description: 'Perfect crunchy companion seasoned to perfection with gourmet dips',
  }
]

let slideInterval = null

onMounted(() => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 4500)
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})

const setSlide = (index) => {
  currentSlide.value = index
}

const handleImageError = (e, index) => {
  const currentSrc = e.target.src
  if (currentSrc.includes('/david-module7-system/images/')) {
    e.target.src = currentSrc.replace('/david-module7-system/images/', '/images/')
  } else if (!currentSrc.includes('/david-module7-system/images/')) {
    e.target.src = '/david-module7-system/images/' + slides[index].image.split('/').pop()
  }
}

const handleAuthSubmit = () => {
  if (isSignUp.value && !name.value.trim()) {
    errorMessage.value = 'Please enter your name'
    return
  }
  if (!email.value.trim()) {
    errorMessage.value = 'Please enter your email'
    return
  }
  if (!password.value) {
    errorMessage.value = 'Please enter your password'
    return
  }
  if (isSignUp.value && password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }
  if (isSignUp.value && !agreeTerms.value) {
    errorMessage.value = 'Please agree to the terms & conditions'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  setTimeout(() => {
    isLoading.value = false
    const user = {
      name: isSignUp.value ? name.value.trim() : (name.value.trim() || 'Kristian Dale David'),
      email: email.value.trim(),
      role: 'Staff / Manager',
      avatar: getAssetUrl('/images/pizza.jpg'),
      loginTime: new Date().toLocaleTimeString()
    }
    emit('login-success', user)
  }, 500)
}
</script>

<template>
  <div 
    class="min-h-screen w-full flex items-center justify-center p-4 md:p-8 transition-colors duration-500 relative overflow-hidden font-sans select-none"
    :class="isDarkMode 
      ? 'bg-[#0a0a0c] text-white' 
      : 'bg-[#e7e2d8] text-gray-900'"
  >
    <!-- Top Right Theme Switcher -->
    <div class="absolute top-6 right-6 z-30">
      <button 
        @click="$emit('toggle-theme')"
        class="flex items-center space-x-2 px-4 py-2 rounded-full border text-xs font-bold shadow-md transition-all transform hover:scale-105 cursor-pointer active:scale-95"
        :class="isDarkMode 
          ? 'bg-[#151518] border-[#2b2b30] text-amber-400 hover:border-amber-400/50' 
          : 'bg-[#f4f0e8] border-[#d8d2c5] text-gray-800 hover:bg-white shadow-stone-900/5'"
      >
        <span>{{ isDarkMode ? '🌙' : '☀️' }}</span>
        <span>{{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}</span>
      </button>
    </div>

    <!-- Main Container Card (Split: Showcase Left + Clean Auth Form Right) -->
    <div 
      class="relative z-20 w-full max-w-4xl flex flex-col md:flex-row items-stretch justify-center rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 border"
      :class="isDarkMode 
        ? 'bg-[#111114] border-[#222228] shadow-black/80' 
        : 'bg-[#ded8cc] border-[#d3ccbf] shadow-2xl shadow-stone-900/15'"
    >
      
      <!-- LEFT SIDE: Animated Food Showcase / Image Card -->
      <div class="md:w-1/2 relative min-h-[400px] md:min-h-[540px] overflow-hidden group bg-gradient-to-br from-[#1e1510] via-[#120e0c] to-[#0a0a0c] flex flex-col justify-between p-8">
        
        <!-- Animated Background Slides -->
        <div 
          v-for="(slide, index) in slides" 
          :key="index"
          class="absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none"
          :style="{ 
            opacity: currentSlide === index ? 1 : 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }"
        >
          <img 
            :src="slide.image" 
            :alt="slide.tagline"
            class="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 group-hover:scale-110"
            loading="eager"
            @error="handleImageError($event, index)"
          />
        </div>

        <!-- High-Contrast Dark Gradient Overlay (Maintains Food Image Visibility & Text Contrast) -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 pointer-events-none z-10"></div>

        <!-- Top Floating Tag -->
        <div class="relative z-20 flex items-center justify-between">
          <span class="bg-black/60 backdrop-blur-md border border-white/15 text-[#ffcc00] font-black tracking-wider text-[10px] uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5 animate-float-slow">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>FoodFlow Menu</span>
          </span>
          
          <span class="text-white/80 text-xs font-mono font-bold bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
            0{{ currentSlide + 1 }} / 0{{ slides.length }}
          </span>
        </div>

        <!-- Bottom Showcase Content (Headline & Description) -->
        <div class="relative z-20 mt-auto">
          <div>
            <h2 class="text-2xl md:text-3xl font-black text-white leading-tight mb-2 tracking-tight drop-shadow-lg">
              {{ slides[currentSlide].tagline }}
            </h2>
            <p class="text-gray-200 text-xs md:text-sm font-medium leading-relaxed max-w-sm drop-shadow-md">
              {{ slides[currentSlide].description }}
            </p>
          </div>

          <!-- Carousel Indicators -->
          <div class="flex items-center space-x-2 mt-6">
            <button
              v-for="(_, index) in slides"
              :key="index"
              @click="setSlide(index)"
              type="button"
              class="h-2 rounded-full transition-all duration-300 cursor-pointer"
              :class="currentSlide === index ? 'w-8 bg-[#ffcc00]' : 'w-2 bg-white/40 hover:bg-white/70'"
              :aria-label="`Slide ${index + 1}`"
            ></button>
          </div>
        </div>
      </div>

      <!-- RIGHT SIDE: Exact Register / Sign In Form from Screenshot -->
      <div 
        class="md:w-1/2 p-8 md:p-11 flex flex-col justify-center transition-colors duration-300"
        :class="isDarkMode ? 'bg-[#131316]' : 'bg-[#e7e2d8]'"
      >
        <!-- Title (Clean Centered Heading matching Screenshot) -->
        <div class="mb-6 text-center">
          <h3 
            class="text-2xl md:text-3xl font-extrabold tracking-tight"
            :class="isDarkMode ? 'text-white' : 'text-[#232323]'"
          >
            {{ isSignUp ? 'Create account' : 'Sign in' }}
          </h3>
        </div>

        <!-- Error Alert -->
        <div 
          v-if="errorMessage" 
          class="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-semibold text-center"
        >
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleAuthSubmit" class="space-y-3.5">
          
          <!-- Name Input (Only on Sign Up / Register) -->
          <div v-if="isSignUp">
            <input 
              v-model="name" 
              type="text" 
              placeholder="Name" 
              class="w-full px-5 py-3.5 rounded-xl text-sm transition outline-none font-medium"
              :class="isDarkMode 
                ? 'bg-[#1c1c22] text-white placeholder-gray-500 border border-[#2b2b35] focus:border-[#ffcc00]' 
                : 'bg-[#ded8cc] text-gray-900 placeholder-gray-500 border-none focus:ring-2 focus:ring-orange-500/30'"
            />
          </div>

          <!-- E-mail Input -->
          <div>
            <input 
              v-model="email" 
              type="email" 
              placeholder="E-mail" 
              class="w-full px-5 py-3.5 rounded-xl text-sm transition outline-none font-medium"
              :class="isDarkMode 
                ? 'bg-[#1c1c22] text-white placeholder-gray-500 border border-[#2b2b35] focus:border-[#ffcc00]' 
                : 'bg-[#ded8cc] text-gray-900 placeholder-gray-500 border-none focus:ring-2 focus:ring-orange-500/30'"
            />
          </div>

          <!-- Password Input -->
          <div>
            <input 
              v-model="password" 
              type="password" 
              placeholder="Password" 
              class="w-full px-5 py-3.5 rounded-xl text-sm transition outline-none font-medium"
              :class="isDarkMode 
                ? 'bg-[#1c1c22] text-white placeholder-gray-500 border border-[#2b2b35] focus:border-[#ffcc00]' 
                : 'bg-[#ded8cc] text-gray-900 placeholder-gray-500 border-none focus:ring-2 focus:ring-orange-500/30'"
            />
          </div>

          <!-- Confirm Password (Only on Sign Up / Register) -->
          <div v-if="isSignUp">
            <input 
              v-model="confirmPassword" 
              type="password" 
              placeholder="Confirm password" 
              class="w-full px-5 py-3.5 rounded-xl text-sm transition outline-none font-medium"
              :class="isDarkMode 
                ? 'bg-[#1c1c22] text-white placeholder-gray-500 border border-[#2b2b35] focus:border-[#ffcc00]' 
                : 'bg-[#ded8cc] text-gray-900 placeholder-gray-500 border-none focus:ring-2 focus:ring-orange-500/30'"
            />
          </div>

          <!-- Checkbox Card Container (Exact Match to Screenshot) -->
          <div 
            v-if="isSignUp"
            class="px-5 py-3.5 rounded-xl flex items-center space-x-3 transition shadow-sm"
            :class="isDarkMode ? 'bg-[#1c1c22] border border-[#2b2b35]' : 'bg-[#f4f0e8]'"
          >
            <input 
              v-model="agreeTerms" 
              type="checkbox" 
              id="terms"
              class="w-4 h-4 rounded border-gray-400 text-[#ff5722] focus:ring-[#ff5722] cursor-pointer"
            />
            <label for="terms" class="text-xs font-medium cursor-pointer" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">
              I agree terms & conditions
            </label>
          </div>

          <!-- Sign In: Remember me checkbox card -->
          <div 
            v-else
            class="px-5 py-3.5 rounded-xl flex items-center space-x-3 transition shadow-sm"
            :class="isDarkMode ? 'bg-[#1c1c22] border border-[#2b2b35]' : 'bg-[#f4f0e8]'"
          >
            <input 
              v-model="rememberMe" 
              type="checkbox" 
              id="remember"
              class="w-4 h-4 rounded border-gray-400 text-[#ff5722] focus:ring-[#ff5722] cursor-pointer"
            />
            <label for="remember" class="text-xs font-medium cursor-pointer" :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">
              Remember me
            </label>
          </div>

          <!-- Sign Up / Sign In CTA Button (Solid Vibrant Orange from Screenshot) -->
          <div class="pt-2">
            <button 
              type="submit" 
              :disabled="isLoading"
              class="w-full py-4 px-6 rounded-xl font-bold text-base text-white transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 cursor-pointer active:scale-98 bg-[#ff5200] hover:bg-[#e04800] shadow-orange-600/30"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>{{ isLoading ? 'Please wait...' : (isSignUp ? 'Sign up' : 'Sign in') }}</span>
            </button>
          </div>

          <!-- Switch Link (Exact Match to Screenshot) -->
          <div class="text-center pt-3">
            <p class="text-xs font-medium" :class="isDarkMode ? 'text-gray-400' : 'text-gray-700'">
              <span v-if="isSignUp">Already have an account? </span>
              <span v-else>Don't have an account? </span>
              <button 
                @click="isSignUp = !isSignUp" 
                type="button"
                class="font-bold text-[#ff5200] hover:underline cursor-pointer"
              >
                {{ isSignUp ? 'Sign in Here' : 'Sign up Here' }}
              </button>
            </p>
          </div>

        </form>

      </div>

    </div>

    <!-- Footer Note -->
    <div class="absolute bottom-3 text-center w-full z-10">
      <p class="text-[11px] font-medium" :class="isDarkMode ? 'text-gray-600' : 'text-stone-600/70'">
        FoodFlow • Kristian Dale David • BSCS 3A
      </p>
    </div>

  </div>
</template>
