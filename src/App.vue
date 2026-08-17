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
    // Seed initial data if empty
    records.value = [
      { id: '1786605903038', foodName: 'Classic Burger', category: 'Main Course', price: 150.00, status: 'Available', image: '/images/burger.jpg' },
      { id: '1786605903039', foodName: 'Iced Matcha Latte', category: 'Drinks', price: 120.00, status: 'Available', image: '/images/matcha.jpg' }
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
    record.category.toLowerCase().includes(keyword)
  )
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#0a0a0a] text-white font-sans antialiased">
    <AppHeader />
    
    <main class="flex-grow container mx-auto px-6 py-10 max-w-6xl">
      
      <!-- Feedback Toast -->
      <div 
        v-if="feedbackMessage" 
        class="fixed top-20 right-6 bg-[#ffcc00] text-black px-6 py-3 rounded shadow-lg font-bold z-50 transition-opacity"
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
            FoodFlow is a frontend prototype for managing food menu records. Add, search, update, and delete food items while keeping records saved in your browser.
          </p>
        </div>
        
        <!-- Abstract Decoration -->
        <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-[#ffcc00] opacity-5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <!-- Main Content Area -->
      <div class="w-full">
        <!-- The RecordList now takes full width as per the new layout since Add form is a modal -->
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
