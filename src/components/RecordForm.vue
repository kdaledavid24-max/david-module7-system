<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  editingRecord: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const form = ref({
  foodName: '',
  category: '',
  price: '',
  status: 'Available'
})

const foodOptions = [
  { name: 'Classic Burger', category: 'Main Course', price: 150.00, image: '/images/burger.jpg' },
  { name: 'Pepperoni Pizza', category: 'Main Course', price: 250.00, image: '/images/pizza.jpg' },
  { name: 'Crispy Fries', category: 'Sides', price: 80.00, image: '/images/fries.jpg' },
  { name: 'Iced Matcha Latte', category: 'Drinks', price: 120.00, image: '/images/matcha.jpg' }
]

const errors = ref({})

const resetForm = () => {
  form.value = {
    foodName: '',
    category: '',
    price: '',
    status: 'Available'
  }
  errors.value = {}
}

watch(() => props.editingRecord, (newVal) => {
  if (newVal) {
    form.value = { ...newVal }
  } else {
    resetForm()
  }
}, { immediate: true })

const handleFoodSelection = () => {
  const selectedFood = foodOptions.find(f => f.name === form.value.foodName)
  if (selectedFood) {
    form.value.category = selectedFood.category
    form.value.price = selectedFood.price
  }
}

const validate = () => {
  errors.value = {}
  if (!form.value.foodName) errors.value.foodName = 'Food selection is required'
  if (!form.value.category.trim()) errors.value.category = 'Category is required'
  if (!form.value.price) errors.value.price = 'Price is required'
  else if (isNaN(form.value.price) || Number(form.value.price) < 0) errors.value.price = 'Valid price is required'
  
  return Object.keys(errors.value).length === 0
}

const submitForm = () => {
  if (validate()) {
    const selectedFood = foodOptions.find(f => f.name === form.value.foodName)
    const recordToSave = {
      ...form.value,
      image: selectedFood ? selectedFood.image : null
    }
    emit('save', recordToSave)
    if (!props.editingRecord) {
      resetForm()
    }
  }
}

const cancel = () => {
  resetForm()
  emit('cancel')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-all">
    <div class="bg-[#111] border border-[#333] rounded-xl w-full max-w-md shadow-2xl p-6 relative">
      
      <!-- Close Button -->
      <button @click="cancel" class="absolute top-4 right-4 text-gray-500 hover:text-white transition">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <!-- Header -->
      <div class="flex items-center space-x-3 mb-6 border-b border-[#222] pb-4">
        <div class="bg-[#ffcc00] p-1.5 rounded-md">
          <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        </div>
        <div>
          <h2 class="text-xl font-bold text-white">{{ editingRecord ? 'Edit Food Item' : 'Add Food Item' }}</h2>
          <p class="text-xs text-gray-400">Enter the information for the menu item.</p>
        </div>
      </div>
      
      <form @submit.prevent="submitForm" class="space-y-5">
        <div>
          <label class="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Food Name</label>
          <select 
            v-model="form.foodName"
            @change="handleFoodSelection"
            class="w-full px-4 py-3 bg-black border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#ffcc00] appearance-none"
            :class="{'border-red-500': errors.foodName}"
          >
            <option value="" disabled>Select a food item</option>
            <option v-for="item in foodOptions" :key="item.name" :value="item.name">{{ item.name }}</option>
          </select>
          <p v-if="errors.foodName" class="text-red-500 text-xs mt-1">{{ errors.foodName }}</p>
        </div>
        
        <div>
          <label class="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Category</label>
          <input 
            v-model="form.category" 
            type="text"
            class="w-full px-4 py-3 bg-black border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#ffcc00]"
            :class="{'border-red-500': errors.category}"
            placeholder="e.g. Main Course"
          />
          <p v-if="errors.category" class="text-red-500 text-xs mt-1">{{ errors.category }}</p>
        </div>

        <div>
          <label class="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Price (₱)</label>
          <input 
            v-model="form.price" 
            type="number" 
            step="0.01"
            class="w-full px-4 py-3 bg-black border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#ffcc00]"
            :class="{'border-red-500': errors.price}"
            placeholder="e.g. 150"
          />
          <p v-if="errors.price" class="text-red-500 text-xs mt-1">{{ errors.price }}</p>
        </div>
          
        <div>
          <label class="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Availability Status</label>
          <select 
            v-model="form.status"
            class="w-full px-4 py-3 bg-black border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#ffcc00] appearance-none"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        
        <div class="pt-4 border-t border-[#222]">
          <button 
            type="submit" 
            class="w-full py-3 bg-[#ffcc00] text-black rounded-lg hover:bg-yellow-500 transition font-bold text-sm tracking-wider uppercase"
          >
            {{ editingRecord ? 'Save Changes' : 'Add Item' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
