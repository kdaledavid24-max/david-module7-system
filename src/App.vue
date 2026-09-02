<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import RecordForm from './components/RecordForm.vue'
import RecordList from './components/RecordList.vue'
import AppFooter from './components/AppFooter.vue'
import LoginPage from './components/LoginPage.vue'
import { getAssetUrl } from './utils/assetHelper.js'

const records = ref([])
const searchTerm = ref('')
const selectedStatus = ref('All')
const selectedCategory = ref('All')
const editingRecord = ref(null)
const isModalOpen = ref(false)
const feedbackMessage = ref('')

// Theme & Authentication State
const isDarkMode = ref(true)
const currentUser = ref(null)

// Safe localStorage Evolution: Normalizes older records to preserve backward compatibility
const normalizeRecords = (storedData) => {
  if (!Array.isArray(storedData)) return []
  return storedData.map(record => ({
    id: record.id || Date.now().toString(),
    customerName: record.customerName || 'Anonymous',
    foodName: record.foodName || 'Food Item',
    category: record.category || 'General',
    price: Number(record.price) >= 0 ? Number(record.price) : 0,
    status: record.status || 'Pending', // Safe default for older saved records lacking status
    image: record.image ? getAssetUrl(record.image) : null,
    ...record,
    image: record.image ? getAssetUrl(record.image) : null
  }))
}

onMounted(() => {
  // Load Theme Preference
  const savedTheme = localStorage.getItem('foodflow_theme')
  if (savedTheme) {
    isDarkMode.value = savedTheme === 'dark'
  }

  // Load User Session
  const savedUser = localStorage.getItem('foodflow_user')
  if (savedUser) {
    try {
      currentUser.value = JSON.parse(savedUser)
    } catch {
      currentUser.value = null
    }
  }

  // Load Food Records
  const saved = localStorage.getItem('module7-records')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      records.value = normalizeRecords(parsed)
    } catch {
      records.value = []
    }
  } else {
    // Seed initial sample data
    records.value = [
      { id: '1786605903038', customerName: 'Juan Dela Cruz',    foodName: 'Classic Burger',       category: 'Main Course', price: 150.00, status: 'Delivered',  image: getAssetUrl('/images/burger.jpg') },
      { id: '1786605903039', customerName: 'Maria Santos',      foodName: 'Iced Matcha Latte',    category: 'Drinks',      price: 120.00, status: 'Available',  image: getAssetUrl('/images/matcha.jpg') },
      { id: '1786605903040', customerName: 'Carlos Reyes',      foodName: 'Pepperoni Pizza',      category: 'Main Course', price: 250.00, status: 'Preparing',  image: getAssetUrl('/images/pizza.jpg') },
      { id: '1786605903041', customerName: 'Ana Garcia',        foodName: 'Crispy Fries',         category: 'Sides',       price:  80.00, status: 'Pending',    image: getAssetUrl('/images/fries.jpg') },
      { id: '1786605903042', customerName: 'Rico Mendoza',      foodName: 'Classic Burger',       category: 'Main Course', price: 150.00, status: 'Cancelled',  image: getAssetUrl('/images/burger.jpg') },
      { id: '1786605903043', customerName: 'Lovely Aquino',     foodName: 'Pepperoni Pizza',      category: 'Main Course', price: 250.00, status: 'Delivered',  image: getAssetUrl('/images/pizza.jpg') },
      { id: '1786605903044', customerName: 'Bong Villanueva',   foodName: 'Iced Matcha Latte',    category: 'Drinks',      price: 120.00, status: 'Pending',    image: getAssetUrl('/images/matcha.jpg') },
      { id: '1786605903045', customerName: 'Trisha Lim',        foodName: 'Crispy Fries',         category: 'Sides',       price:  80.00, status: 'Preparing', image: getAssetUrl('/images/fries.jpg') },
      { id: '1786605903046', customerName: 'Andrei Castillo',   foodName: 'Classic Burger',       category: 'Main Course', price: 150.00, status: 'Ready',      image: getAssetUrl('/images/burger.jpg') },
      { id: '1786605903047', customerName: 'Jenny Pascual',     foodName: 'Iced Matcha Latte',    category: 'Drinks',      price: 120.00, status: 'Cancelled',  image: getAssetUrl('/images/matcha.jpg') }
    ]
    saveRecords()
  }
})

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('foodflow_theme', isDarkMode.value ? 'dark' : 'light')
}

const handleLoginSuccess = (user) => {
  currentUser.value = user
  localStorage.setItem('foodflow_user', JSON.stringify(user))
  showFeedback(`Welcome back, ${user.name}!`)
}

const handleLogout = () => {
  currentUser.value = null
  localStorage.removeItem('foodflow_user')
  showFeedback('You have signed out.')
}

const saveRecords = () => {
  localStorage.setItem('module7-records', JSON.stringify(records.value))
}

const showFeedback = (message) => {
  feedbackMessage.value = message
  setTimeout(() => {
    feedbackMessage.value = ''
  }, 3000)
}

const openAddModal = () => {
  editingRecord.value = null
  isModalOpen.value = true
}

const handleEditRecord = (record) => {
  editingRecord.value = { ...record }
  isModalOpen.value = true
}

const handleCloseModal = () => {
  isModalOpen.value = false
  editingRecord.value = null
}

const handleSaveRecord = (recordData) => {
  if (editingRecord.value) {
    const index = records.value.findIndex(r => r.id === editingRecord.value.id)
    if (index !== -1) {
      records.value[index] = { ...recordData, id: editingRecord.value.id }
      showFeedback('Item updated successfully.')
    }
  } else {
    records.value.push({
      id: Date.now().toString(),
      ...recordData
    })
    showFeedback('Item added successfully.')
  }
  saveRecords()
  handleCloseModal()
}

const handleDeleteRecord = (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this item?')
  if (!confirmed) return
  
  records.value = records.value.filter(record => record.id !== id)
  saveRecords()
  showFeedback('Item deleted.')
}

const handleClearFilters = () => {
  searchTerm.value = ''
  selectedStatus.value = 'All'
  selectedCategory.value = 'All'
}

// Available categories computed dynamically from existing records
const categories = computed(() => {
  const cats = new Set(records.value.map(r => r.category).filter(Boolean))
  return ['All', ...Array.from(cats)]
})

// Evolved multi-facet filtering (Search keyword + Status + Category)
const filteredRecords = computed(() => {
  const keyword = searchTerm.value.toLowerCase().trim()
  
  return records.value.filter(record => {
    const matchesKeyword = !keyword || (
      record.foodName?.toLowerCase().includes(keyword) ||
      record.category?.toLowerCase().includes(keyword) ||
      (record.customerName && record.customerName.toLowerCase().includes(keyword))
    )

    const matchesStatus = selectedStatus.value === 'All' || 
      (selectedStatus.value === 'Ready' && (record.status === 'Ready' || record.status === 'Available')) ||
      (selectedStatus.value === 'Cancelled' && (record.status === 'Cancelled' || record.status === 'Unavailable')) ||
      record.status === selectedStatus.value

    const matchesCategory = selectedCategory.value === 'All' || record.category === selectedCategory.value

    return matchesKeyword && matchesStatus && matchesCategory
  })
})

// Summary stats
const totalOrders = computed(() => records.value.length)
const availableCount = computed(() => records.value.filter(r => r.status === 'Available' || r.status === 'Ready').length)
const pendingCount = computed(() => records.value.filter(r => r.status === 'Pending').length)
const preparingCount = computed(() => records.value.filter(r => r.status === 'Preparing').length)
const deliveredCount = computed(() => records.value.filter(r => r.status === 'Delivered').length)
const cancelledCount = computed(() => records.value.filter(r => r.status === 'Cancelled' || r.status === 'Unavailable').length)
</script>

<template>
  <!-- If not logged in, render the aesthetic login page -->
  <LoginPage 
    v-if="!currentUser"
    :is-dark-mode="isDarkMode"
    @login-success="handleLoginSuccess"
    @toggle-theme="toggleTheme"
  />

  <!-- Main System View (When authenticated) -->
  <div 
    v-else
    class="min-h-screen flex flex-col font-sans antialiased transition-colors duration-300"
    :class="isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#faf7f2] text-gray-900'"
  >
    <AppHeader 
      :current-user="currentUser"
      :is-dark-mode="isDarkMode"
      @toggle-theme="toggleTheme"
      @logout="handleLogout"
    />
    
    <main class="flex-grow container mx-auto px-6 py-10 max-w-6xl">
      
      <!-- Feedback Toast -->
      <div 
        v-if="feedbackMessage" 
        class="fixed top-20 right-6 px-6 py-3 rounded-xl shadow-2xl font-bold z-50 border flex items-center space-x-2 animate-bounce"
        :class="isDarkMode 
          ? 'bg-[#ffcc00] text-black border-yellow-400' 
          : 'bg-amber-500 text-white border-amber-600 shadow-amber-900/20'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        <span>{{ feedbackMessage }}</span>
      </div>

      <!-- Hero Banner -->
      <div 
        class="rounded-3xl p-8 md:p-12 mb-10 relative overflow-hidden transition-colors duration-300 border shadow-xl"
        :class="isDarkMode 
          ? 'border-[#222] bg-gradient-to-br from-[#141414] via-[#0f0f0f] to-[#0a0a0a]' 
          : 'border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50/50 shadow-amber-900/5'"
      >
        <div class="relative z-10 max-w-2xl">
          <div class="flex items-center space-x-2 mb-3">
            <span 
              class="font-black tracking-[0.2em] text-[11px] uppercase px-3 py-1 rounded-full border"
              :class="isDarkMode 
                ? 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#ffcc00]' 
                : 'bg-amber-100 border-amber-300 text-amber-900'"
            >
              FoodFlow Menu Management
            </span>
          </div>
          <h1 
            class="text-4xl md:text-6xl font-black mb-4 leading-tight transition-colors"
            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
          >
            Manage your <span class="text-[#ffcc00] dark:text-[#ffcc00] bg-clip-text">food menu</span> with ease.
          </h1>
          <p 
            class="leading-relaxed text-sm transition-colors"
            :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
          >
            Welcome back, <span class="font-bold text-amber-500">{{ currentUser?.name || 'Chef' }}</span>! Browse our handcrafted menu, filter live kitchen statuses, and keep operations running smoothly with dark & light theme flexibility.
          </p>
        </div>
        
        <!-- Abstract Decoration -->
        <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-[#ffcc00] opacity-10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <!-- Summary Dashboard (Interactive Status Filters) -->
      <div class="mb-4 flex items-center justify-between">
        <h2 
          class="text-xs uppercase tracking-widest font-bold"
          :class="isDarkMode ? 'text-gray-400' : 'text-gray-600'"
        >
          Quick Status Overview <span class="opacity-60 font-normal">(Click card to filter)</span>
        </h2>
        <button 
          v-if="selectedStatus !== 'All' || selectedCategory !== 'All' || searchTerm" 
          @click="handleClearFilters"
          class="text-xs text-amber-500 hover:underline font-bold cursor-pointer"
        >
          Reset All Filters
        </button>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        <!-- Total Orders -->
        <button 
          @click="selectedStatus = 'All'"
          type="button"
          class="border rounded-2xl p-5 text-center transition cursor-pointer text-left w-full relative shadow-sm"
          :class="[
            selectedStatus === 'All' 
              ? (isDarkMode ? 'border-[#ffcc00] ring-2 ring-[#ffcc00]/30 bg-[#161616]' : 'border-amber-500 ring-2 ring-amber-500/30 bg-amber-50')
              : (isDarkMode ? 'border-[#222] bg-[#111] hover:border-[#ffcc00]/40' : 'border-gray-200 bg-white hover:border-amber-300')
          ]"
        >
          <p class="text-3xl font-black text-[#ffcc00] dark:text-[#ffcc00]">{{ totalOrders }}</p>
          <p class="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-bold">Total Orders</p>
          <span v-if="selectedStatus === 'All'" class="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ffcc00]"></span>
        </button>

        <!-- Available / Ready -->
        <button 
          @click="selectedStatus = 'Available'"
          type="button"
          class="border rounded-2xl p-5 text-center transition cursor-pointer text-left w-full relative shadow-sm"
          :class="[
            selectedStatus === 'Available' 
              ? (isDarkMode ? 'border-green-500 ring-2 ring-green-500/30 bg-[#141b16]' : 'border-green-500 ring-2 ring-green-500/30 bg-green-50')
              : (isDarkMode ? 'border-[#222] bg-[#111] hover:border-green-800/60' : 'border-gray-200 bg-white hover:border-green-300')
          ]"
        >
          <p class="text-3xl font-black text-green-500">{{ availableCount }}</p>
          <p class="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-bold">Available</p>
          <span v-if="selectedStatus === 'Available'" class="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-400"></span>
        </button>

        <!-- Pending -->
        <button 
          @click="selectedStatus = 'Pending'"
          type="button"
          class="border rounded-2xl p-5 text-center transition cursor-pointer text-left w-full relative shadow-sm"
          :class="[
            selectedStatus === 'Pending' 
              ? (isDarkMode ? 'border-yellow-500 ring-2 ring-yellow-500/30 bg-[#1b1912]' : 'border-yellow-500 ring-2 ring-yellow-500/30 bg-yellow-50')
              : (isDarkMode ? 'border-[#222] bg-[#111] hover:border-yellow-800/60' : 'border-gray-200 bg-white hover:border-yellow-300')
          ]"
        >
          <p class="text-3xl font-black text-yellow-500">{{ pendingCount }}</p>
          <p class="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-bold">Pending</p>
          <span v-if="selectedStatus === 'Pending'" class="absolute top-2 right-2 w-2 h-2 rounded-full bg-yellow-400"></span>
        </button>

        <!-- Preparing -->
        <button 
          @click="selectedStatus = 'Preparing'"
          type="button"
          class="border rounded-2xl p-5 text-center transition cursor-pointer text-left w-full relative shadow-sm"
          :class="[
            selectedStatus === 'Preparing' 
              ? (isDarkMode ? 'border-blue-500 ring-2 ring-blue-500/30 bg-[#121820]' : 'border-blue-500 ring-2 ring-blue-500/30 bg-blue-50')
              : (isDarkMode ? 'border-[#222] bg-[#111] hover:border-blue-800/60' : 'border-gray-200 bg-white hover:border-blue-300')
          ]"
        >
          <p class="text-3xl font-black text-blue-500">{{ preparingCount }}</p>
          <p class="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-bold">Preparing</p>
          <span v-if="selectedStatus === 'Preparing'" class="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-400"></span>
        </button>

        <!-- Delivered -->
        <button 
          @click="selectedStatus = 'Delivered'"
          type="button"
          class="border rounded-2xl p-5 text-center transition cursor-pointer text-left w-full relative shadow-sm"
          :class="[
            selectedStatus === 'Delivered' 
              ? (isDarkMode ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-[#121c18]' : 'border-emerald-500 ring-2 ring-emerald-500/30 bg-emerald-50')
              : (isDarkMode ? 'border-[#222] bg-[#111] hover:border-emerald-800/60' : 'border-gray-200 bg-white hover:border-emerald-300')
          ]"
        >
          <p class="text-3xl font-black text-emerald-500">{{ deliveredCount }}</p>
          <p class="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-bold">Delivered</p>
          <span v-if="selectedStatus === 'Delivered'" class="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400"></span>
        </button>

        <!-- Cancelled -->
        <button 
          @click="selectedStatus = 'Cancelled'"
          type="button"
          class="border rounded-2xl p-5 text-center transition cursor-pointer text-left w-full relative shadow-sm"
          :class="[
            selectedStatus === 'Cancelled' 
              ? (isDarkMode ? 'border-red-500 ring-2 ring-red-500/30 bg-[#1e1313]' : 'border-red-500 ring-2 ring-red-500/30 bg-red-50')
              : (isDarkMode ? 'border-[#222] bg-[#111] hover:border-red-800/60' : 'border-gray-200 bg-white hover:border-red-300')
          ]"
        >
          <p class="text-3xl font-black text-red-500">{{ cancelledCount }}</p>
          <p class="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-bold">Cancelled</p>
          <span v-if="selectedStatus === 'Cancelled'" class="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-400"></span>
        </button>
      </div>

      <!-- Main Content Area -->
      <div class="w-full">
        <RecordList 
          :records="filteredRecords"
          :all-records-count="records.length"
          :search-term="searchTerm"
          :selected-status="selectedStatus"
          :selected-category="selectedCategory"
          :categories="categories"
          :is-dark-mode="isDarkMode"
          @update:searchTerm="searchTerm = $event"
          @update:selectedStatus="selectedStatus = $event"
          @update:selectedCategory="selectedCategory = $event"
          @clear-filters="handleClearFilters"
          @add="openAddModal"
          @edit="handleEditRecord"
          @delete="handleDeleteRecord"
        />
      </div>

      <!-- Modal Form -->
      <RecordForm 
        :is-open="isModalOpen"
        :editing-record="editingRecord"
        :is-dark-mode="isDarkMode"
        @save="handleSaveRecord"
        @cancel="handleCloseModal"
      />
      
    </main>
    
    <AppFooter :is-dark-mode="isDarkMode" />
  </div>
</template>

