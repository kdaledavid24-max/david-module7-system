<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from './components/AppHeader.vue'
import RecordForm from './components/RecordForm.vue'
import RecordList from './components/RecordList.vue'
import AppFooter from './components/AppFooter.vue'

const records = ref([])
const searchTerm = ref('')
const editingRecord = ref(null)
const feedbackMessage = ref('')
const feedbackType = ref('success')

onMounted(() => {
  const saved = localStorage.getItem('module7-records')
  records.value = saved ? JSON.parse(saved) : []
})

const saveRecords = () => {
  localStorage.setItem('module7-records', JSON.stringify(records.value))
}

const showFeedback = (message, type = 'success') => {
  feedbackMessage.value = message
  feedbackType.value = type
  setTimeout(() => {
    feedbackMessage.value = ''
  }, 3000)
}

const handleSaveRecord = (recordData) => {
  if (editingRecord.value) {
    const index = records.value.findIndex(r => r.id === editingRecord.value.id)
    if (index !== -1) {
      records.value[index] = { ...recordData, id: editingRecord.value.id, updatedAt: new Date().toISOString(), createdAt: editingRecord.value.createdAt }
      showFeedback('Order updated successfully')
    }
    editingRecord.value = null
  } else {
    records.value.push({
      id: Date.now().toString(),
      ...recordData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    showFeedback('Order added successfully')
  }
  saveRecords()
}

const handleEditRecord = (record) => {
  editingRecord.value = { ...record }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleDeleteRecord = (id) => {
  const confirmed = window.confirm('Are you sure you want to delete this order?')
  if (!confirmed) return
  
  records.value = records.value.filter(record => record.id !== id)
  saveRecords()
  showFeedback('Order deleted successfully', 'error')
}

const handleCancelEdit = () => {
  editingRecord.value = null
}

const filteredRecords = computed(() => {
  const keyword = searchTerm.value.toLowerCase().trim()
  if (!keyword) return records.value
  
  return records.value.filter(record => 
    record.customerName.toLowerCase().includes(keyword) ||
    record.foodItems.toLowerCase().includes(keyword) ||
    record.status.toLowerCase().includes(keyword)
  )
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100 font-sans">
    <AppHeader />
    
    <main class="flex-grow container mx-auto px-4 py-8">
      <!-- Feedback Message -->
      <div 
        v-if="feedbackMessage" 
        class="mb-6 p-4 rounded-md shadow-sm transition-all"
        :class="{
          'bg-green-100 text-green-800 border-l-4 border-green-500': feedbackType === 'success',
          'bg-red-100 text-red-800 border-l-4 border-red-500': feedbackType === 'error'
        }"
      >
        {{ feedbackMessage }}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Sidebar: Form -->
        <div class="lg:col-span-1">
          <RecordForm 
            :editing-record="editingRecord"
            @save="handleSaveRecord"
            @cancel="handleCancelEdit"
          />
        </div>
        
        <!-- Main Area: List -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-800">Order History</h2>
            <div class="relative w-64">
              <input 
                v-model="searchTerm" 
                type="text" 
                placeholder="Search orders..." 
                class="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
              <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>
          
          <RecordList 
            :records="filteredRecords"
            @edit="handleEditRecord"
            @delete="handleDeleteRecord"
          />
        </div>
      </div>
    </main>
    
    <AppFooter />
  </div>
</template>
