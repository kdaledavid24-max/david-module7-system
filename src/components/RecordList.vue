<script setup>
defineProps({
  records: {
    type: Array,
    required: true
  },
  searchTerm: {
    type: String,
    required: true
  }
})

defineEmits(['edit', 'delete', 'update:searchTerm', 'add'])
</script>

<template>
  <div class="border border-[#333] rounded-xl bg-[#111] overflow-hidden">
    <!-- Header -->
    <div class="p-6 border-b border-[#222] flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-bold text-white">Menu Records</h2>
        <p class="text-sm text-gray-400 mt-1">Manage all food items in the system.</p>
      </div>
      <div class="flex items-center space-x-3">
        <span class="border border-[#ffcc00] text-[#ffcc00] text-xs font-bold px-3 py-1 rounded-md">{{ records.length }} Record{{ records.length !== 1 ? 's' : '' }}</span>
        <button 
          @click="$emit('add')"
          class="bg-[#ffcc00] hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-md text-sm transition flex items-center"
        >
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Add Item
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="p-6 border-b border-[#222]">
      <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input 
          :value="searchTerm"
          @input="$emit('update:searchTerm', $event.target.value)"
          type="text" 
          placeholder="Search by food name..." 
          class="w-full pl-10 pr-4 py-3 bg-black border border-[#333] rounded-lg text-white focus:outline-none focus:border-[#ffcc00] text-sm placeholder-gray-600 transition"
        />
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-if="records.length === 0" class="p-12 text-center text-gray-500">
      <p>No menu items found.</p>
    </div>
    
    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="text-[#ffcc00] text-[10px] uppercase font-black tracking-widest border-b border-[#222]">
            <th class="px-6 py-4">ID</th>
            <th class="px-6 py-4">Food Name</th>
            <th class="px-6 py-4">Category</th>
            <th class="px-6 py-4">Price</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#222]">
          <tr v-for="record in records" :key="record.id" class="hover:bg-[#1a1a1a] transition group">
            <td class="px-6 py-4 text-xs text-gray-500 font-mono">
              #{{ record.id }}
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <img v-if="record.image" :src="record.image" alt="" class="w-10 h-10 rounded object-cover mr-3 border border-[#333]" />
                <div v-else class="w-10 h-10 rounded bg-[#222] mr-3 border border-[#333] flex items-center justify-center">
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <div class="font-bold text-white text-sm">{{ record.foodName }}</div>
              </div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-400">
              {{ record.category }}
            </td>
            <td class="px-6 py-4 text-sm font-bold text-[#ffcc00]">
              ₱{{ Number(record.price).toFixed(2) }}
            </td>
            <td class="px-6 py-4">
              <span 
                class="px-3 py-1 inline-flex text-[10px] leading-5 font-bold rounded-full uppercase tracking-wider border"
                :class="{
                  'bg-green-900/30 text-green-400 border-green-800': record.status === 'Available',
                  'bg-red-900/30 text-red-400 border-red-800': record.status === 'Unavailable'
                }"
              >
                {{ record.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-center">
              <div class="flex items-center justify-center space-x-2">
                <button 
                  @click="$emit('edit', record)"
                  class="px-3 py-1 border border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc00] hover:text-black rounded text-xs font-bold transition"
                >
                  Edit
                </button>
                <button 
                  @click="$emit('delete', record.id)"
                  class="px-3 py-1 border border-red-900 text-red-500 hover:bg-red-900 hover:text-white rounded text-xs font-bold transition"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
