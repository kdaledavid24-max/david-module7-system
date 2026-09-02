<script setup>
defineProps({
  isDarkMode: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <footer 
    class="border-t text-center py-6 mt-auto transition-colors duration-300"
    :class="isDarkMode ? 'border-[#222] bg-[#0c0c0c] text-gray-500' : 'border-amber-200 bg-white text-gray-600'"
  >
    <div class="container mx-auto px-6">
      <p class="text-sm tracking-wide font-medium">&copy; {{ new Date().getFullYear() }} FoodFlow Menu Management System</p>
      <p class="text-xs mt-1.5 opacity-80">Student: Kristian Dale D. David | Section: BSCS 3A | Subject: Software Engineering 1</p>
    </div>
  </footer>
</template>

