<script setup>
defineProps({
  records: {
    type: Array,
    required: true
  }
})

defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div v-if="records.length === 0" class="p-8 text-center text-gray-500">
      No orders found. Add a new order or try a different search.
    </div>
    
    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
            <th class="px-6 py-3 border-b">Customer</th>
            <th class="px-6 py-3 border-b">Items</th>
            <th class="px-6 py-3 border-b">Amount</th>
            <th class="px-6 py-3 border-b">Status</th>
            <th class="px-6 py-3 border-b text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="record in records" :key="record.id" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4">
              <div class="font-medium text-gray-900">{{ record.customerName }}</div>
              <div class="text-xs text-gray-500">{{ new Date(record.createdAt).toLocaleDateString() }}</div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">
              {{ record.foodItems.length > 50 ? record.foodItems.substring(0, 50) + '...' : record.foodItems }}
            </td>
            <td class="px-6 py-4 text-sm font-medium">
              ${{ Number(record.totalAmount).toFixed(2) }}
            </td>
            <td class="px-6 py-4">
              <span 
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-yellow-100 text-yellow-800': record.status === 'Pending',
                  'bg-blue-100 text-blue-800': record.status === 'Preparing',
                  'bg-green-100 text-green-800': record.status === 'Ready' || record.status === 'Delivered',
                  'bg-red-100 text-red-800': record.status === 'Cancelled'
                }"
              >
                {{ record.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right text-sm font-medium space-x-3">
              <button 
                @click="$emit('edit', record)"
                class="text-blue-600 hover:text-blue-900 transition"
              >
                Edit
              </button>
              <button 
                @click="$emit('delete', record.id)"
                class="text-red-600 hover:text-red-900 transition"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="px-6 py-4 border-t bg-gray-50 text-sm text-gray-500">
      Total Orders: {{ records.length }}
    </div>
  </div>
</template>
