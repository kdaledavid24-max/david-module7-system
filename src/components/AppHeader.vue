<script setup>
defineProps({
  currentUser: {
    type: Object,
    default: null
  },
  isDarkMode: {
    type: Boolean,
    default: true
  }
})

defineEmits(['toggle-theme', 'logout'])
</script>

<template>
  <header 
    class="w-full border-b transition-colors duration-300"
    :class="isDarkMode ? 'border-[#222] bg-[#0c0c0c]' : 'border-amber-200 bg-white shadow-sm'"
  >
    <div class="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
      
      <!-- Left side: Logo & Title -->
      <div class="flex items-center space-x-4">
        <!-- Logo Box -->
        <div class="bg-[#ffcc00] p-2 rounded-xl flex items-center justify-center shadow-md">
          <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </div>
        
        <div>
          <h1 
            class="text-2xl font-black tracking-widest uppercase transition-colors"
            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
          >
            FOODFLOW
          </h1>
          <p class="text-xs text-gray-500 mt-0.5">Food Ordering System • Menu Management</p>
        </div>
      </div>

      <!-- Right side: Theme Switcher & User Account -->
      <div class="flex items-center space-x-3">
        
        <!-- Theme Toggle Button -->
        <button 
          @click="$emit('toggle-theme')"
          type="button"
          class="p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center"
          :class="isDarkMode 
            ? 'bg-[#181818] border-[#333] text-amber-400 hover:border-amber-400/50' 
            : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'"
          :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <!-- Sun Icon (Light Mode Active) -->
          <svg v-if="!isDarkMode" class="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <!-- Moon Icon (Dark Mode Active) -->
          <svg v-else class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
        </button>

        <!-- User Profile Info -->
        <div 
          v-if="currentUser"
          class="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition"
          :class="isDarkMode ? 'bg-[#181818] border-[#333] text-white' : 'bg-gray-50 border-gray-200 text-gray-800'"
        >
          <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-red-500 flex items-center justify-center text-white font-black text-[10px]">
            {{ currentUser.name.charAt(0) }}
          </div>
          <span class="max-w-[120px] truncate">{{ currentUser.name }}</span>
        </div>

        <!-- Logout / Switch Account -->
        <button 
          v-if="currentUser"
          @click="$emit('logout')"
          class="px-3 py-2 rounded-xl text-xs font-bold transition border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
        >
          Sign Out
        </button>
      </div>
      
    </div>
  </header>
</template>
