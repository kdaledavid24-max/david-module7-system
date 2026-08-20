<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import RecordForm from './components/RecordForm.vue'
import RecordList from './components/RecordList.vue'
import AppFooter from './components/AppFooter.vue'

const records = ref([])
const searchTerm = ref('')
const editingRecord = ref(null)
const isModalOpen = ref(false)
const feedbackMessage = ref('')

onMounted(() => {
  const saved = localStorage.getItem('module7-records')
  if (saved) {
    records.value = JSON.parse(saved)
  } else {
    // Seed initial sample data
    records.value = [
      { id: '1786605903038', customerName: 'Juan Dela Cruz',    foodName: 'Classic Burger',       category: 'Main Course', price: 150.00, status: 'Delivered',  image: '/images/burger.jpg' },
      { id: '1786605903039', customerName: 'Maria Santos',      foodName: 'Iced Matcha Latte',    category: 'Drinks',      price: 120.00, status: 'Available',  image: '/images/matcha.jpg' },
      { id: '1786605903040', customerName: 'Carlos Reyes',      foodName: 'Pepperoni Pizza',      category: 'Main Course', price: 250.00, status: 'Preparing',  image: '/images/pizza.jpg' },
      { id: '1786605903041', customerName: 'Ana Garcia',        foodName: 'Crispy Fries',         category: 'Sides',       price:  80.00, status: 'Pending',    image: '/images/fries.jpg' },
      { id: '1786605903042', customerName: 'Rico Mendoza',      foodName: 'Classic Burger',       category: 'Main Course', price: 150.00, status: 'Cancelled',  image: '/images/burger.jpg' },
      { id: '1786605903043', customerName: 'Lovely Aquino',     foodName: 'Pepperoni Pizza',      category: 'Main Course', price: 250.00, status: 'Delivered',  image: '/images/pizza.jpg' },
      { id: '1786605903044', customerName: 'Bong Villanueva',   foodName: 'Iced Matcha Latte',    category: 'Drinks',      price: 120.00, status: 'Pending',    image: '/images/matcha.jpg' },
      { id: '1786605903045', customerName: 'Trisha Lim',        foodName: 'Crispy Fries',         category: 'Sides',       price:  80.00, status: 'Preparing', image: '/images/fries.jpg' },
      { id: '1786605903046', customerName: 'Andrei Castillo',   foodName: 'Classic Burger',       category: 'Main Course', price: 150.00, status: 'Ready',      image: '/images/burger.jpg' },
      { id: '1786605903047', customerName: 'Jenny Pascual',     foodName: 'Iced Matcha Latte',    category: 'Drinks',      price: 120.00, status: 'Cancelled',  image: '/images/matcha.jpg' }
    ]
    saveRecords()
  }
})

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

const filteredRecords = computed(() => {
  const keyword = searchTerm.value.toLowerCase().trim()
  if (!keyword) return records.value
  
  return records.value.filter(record => 
    record.foodName.toLowerCase().includes(keyword) ||
    record.category.toLowerCase().includes(keyword) ||
    (record.customerName && record.customerName.toLowerCase().includes(keyword))
  )
})

// Summary stats
const totalOrders = computed(() => records.value.length)
const availableCount = computed(() => records.value.filter(r => r.status === 'Available').length)
const pendingCount = computed(() => records.value.filter(r => r.status === 'Pending').length)
const preparingCount = computed(() => records.value.filter(r => r.status === 'Preparing').length)
const deliveredCount = computed(() => records.value.filter(r => r.status === 'Delivered').length)
const cancelledCount = computed(() => records.value.filter(r => r.status === 'Cancelled' || r.status === 'Unavailable').length)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#0a0a0a] text-white font-sans antialiased">
    <AppHeader />
    
    <main class="flex-grow container mx-auto px-6 py-10 max-w-6xl">
      
      <!-- Feedback Toast -->
      <div 
        v-if="feedbackMessage" 
        class="fixed top-20 right-6 bg-[#ffcc00] text-black px-6 py-3 rounded shadow-lg font-bold z-50 animate-pulse"
      >
        {{ feedbackMessage }}
      </div>

      <!-- Hero Banner -->
      <div class="border border-[#222] rounded-2xl p-8 md:p-12 mb-10 relative overflow-hidden bg-gradient-to-br from-[#111] to-[#0a0a0a]">
        <div class="relative z-10 max-w-2xl">
          <p class="text-[#ffcc00] font-black tracking-[0.2em] text-xs uppercase mb-4">Menu Management</p>
          <h1 class="text-4xl md:text-6xl font-black mb-4 leading-tight">
            Manage your <span class="text-[#ffcc00]">food menu</span> with ease.
          </h1>
          <p class="text-gray-400 leading-relaxed text-sm">
            Welcome to <span class="text-white font-semibold">FoodFlow Restaurant</span> — where every order tells a story. Browse our handcrafted menu, track live order statuses, and keep your kitchen running smoothly. Add new dishes, update orders on the fly, and manage your full menu from one delicious dashboard.
          </p>
        </div>
        
        <!-- Abstract Decoration -->
        <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-[#ffcc00] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <!-- Summary Dashboard -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        <!-- Total Orders -->
        <div class="border border-[#222] rounded-xl bg-[#111] p-5 text-center hover:border-[#ffcc00]/30 transition">
          <p class="text-3xl font-black text-[#ffcc00]">{{ totalOrders }}</p>
          <p class="text-[10px] uppercase tracking-widest text-gray-400 mt-2 font-bold">Total Orders</p>
        </div>
        <!-- Available -->
        <div class="border border-[#222] rounded-xl bg-[#111] p-5 text-center hover:border-green-800/50 transition">
          <p class="text-3xl font-black text-green-400">{{ availableCount }}</p>
          <p class="text-[10px] uppercase tracking-widest text-gray-400 mt-2 font-bold">Available</p>
        </div>
        <!-- Pending -->
        <div class="border border-[#222] rounded-xl bg-[#111] p-5 text-center hover:border-yellow-800/50 transition">
          <p class="text-3xl font-black text-yellow-400">{{ pendingCount }}</p>
          <p class="text-[10px] uppercase tracking-widest text-gray-400 mt-2 font-bold">Pending</p>
        </div>
        <!-- Preparing -->
        <div class="border border-[#222] rounded-xl bg-[#111] p-5 text-center hover:border-blue-800/50 transition">
          <p class="text-3xl font-black text-blue-400">{{ preparingCount }}</p>
          <p class="text-[10px] uppercase tracking-widest text-gray-400 mt-2 font-bold">Preparing</p>
        </div>
        <!-- Delivered -->
        <div class="border border-[#222] rounded-xl bg-[#111] p-5 text-center hover:border-green-800/50 transition">
          <p class="text-3xl font-black text-emerald-400">{{ deliveredCount }}</p>
          <p class="text-[10px] uppercase tracking-widest text-gray-400 mt-2 font-bold">Delivered</p>
        </div>
        <!-- Cancelled -->
        <div class="border border-[#222] rounded-xl bg-[#111] p-5 text-center hover:border-red-800/50 transition">
          <p class="text-3xl font-black text-red-400">{{ cancelledCount }}</p>
          <p class="text-[10px] uppercase tracking-widest text-gray-400 mt-2 font-bold">Cancelled</p>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="w-full">
        <RecordList 
          :records="filteredRecords"
          :searchTerm="searchTerm"
          @update:searchTerm="searchTerm = $event"
          @add="openAddModal"
          @edit="handleEditRecord"
          @delete="handleDeleteRecord"
        />
      </div>

      <!-- Modal -->
      <RecordForm 
        :is-open="isModalOpen"
        :editing-record="editingRecord"
        @save="handleSaveRecord"
        @cancel="handleCloseModal"
      />
      
    </main>
    
    <AppFooter />
  </div>
</template>
