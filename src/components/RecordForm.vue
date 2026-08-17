<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  editingRecord: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const form = ref({
  customerName: '',
  foodItems: '',
  totalAmount: '',
  status: 'Pending'
})

const errors = ref({})

const resetForm = () => {
  form.value = {
    customerName: '',
    foodItems: '',
    totalAmount: '',
    status: 'Pending'
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

const validate = () => {
  errors.value = {}
  if (!form.value.customerName.trim()) errors.value.customerName = 'Customer name is required'
  if (!form.value.foodItems.trim()) errors.value.foodItems = 'Food items are required'
  if (!form.value.totalAmount) errors.value.totalAmount = 'Total amount is required'
  else if (isNaN(form.value.totalAmount) || Number(form.value.totalAmount) <= 0) errors.value.totalAmount = 'Valid total amount is required'
  
  return Object.keys(errors.value).length === 0
}

const submitForm = () => {
  if (validate()) {
    emit('save', { ...form.value })
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
  <div class="bg-white p-6 rounded-lg shadow-md mb-6">
    <h2 class="text-xl font-semibold mb-4">{{ editingRecord ? 'Edit Order' : 'Add New Order' }}</h2>
    
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
        <input 
          v-model="form.customerName" 
          type="text" 
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{'border-red-500': errors.customerName}"
          placeholder="e.g. John Doe"
        />
        <p v-if="errors.customerName" class="text-red-500 text-xs mt-1">{{ errors.customerName }}</p>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Food Items</label>
        <textarea 
          v-model="form.foodItems" 
          rows="3"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{'border-red-500': errors.foodItems}"
          placeholder="e.g. 2x Burger, 1x Fries"
        ></textarea>
        <p v-if="errors.foodItems" class="text-red-500 text-xs mt-1">{{ errors.foodItems }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Total Amount ($)</label>
          <input 
            v-model="form.totalAmount" 
            type="number" 
            step="0.01"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{'border-red-500': errors.totalAmount}"
            placeholder="0.00"
          />
          <p v-if="errors.totalAmount" class="text-red-500 text-xs mt-1">{{ errors.totalAmount }}</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
          <select 
            v-model="form.status"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      <div class="flex gap-2 pt-2">
        <button 
          type="submit" 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
        >
          {{ editingRecord ? 'Update Order' : 'Add Order' }}
        </button>
        <button 
          v-if="editingRecord" 
          type="button" 
          @click="cancel"
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
