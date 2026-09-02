<script setup>
import { getAssetUrl } from '../utils/assetHelper.js'

defineProps({
  records: {
    type: Array,
    required: true
  },
  allRecordsCount: {
    type: Number,
    default: 0
  },
  searchTerm: {
    type: String,
    required: true
  },
  selectedStatus: {
    type: String,
    default: 'All'
  },
  selectedCategory: {
    type: String,
    default: 'All'
  },
  categories: {
    type: Array,
    default: () => ['All']
  },
  isDarkMode: {
    type: Boolean,
    default: true
  }
})

defineEmits([
  'edit', 
  'delete', 
  'update:searchTerm', 
  'update:selectedStatus', 
  'update:selectedCategory', 
  'clear-filters', 
  'add'
])

const statusOptions = ['All', 'Pending', 'Preparing', 'Ready', 'Delivered', 'Available', 'Cancelled']
</script>

<template>
  <div 
    class="rounded-2xl overflow-hidden shadow-xl transition-colors duration-300 border"
    :class="isDarkMode 
      ? 'border-[#333] bg-[#111]' 
      : 'border-amber-200 bg-white shadow-amber-900/5'"
  >
    <!-- Header -->
    <div 
      class="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-300"
      :class="isDarkMode ? 'border-[#222]' : 'border-amber-100 bg-amber-50/40'"
    >
      <div>
        <div class="flex items-center space-x-3">
          <h2 
            class="text-xl font-bold transition-colors"
            :class="isDarkMode ? 'text-white' : 'text-gray-900'"
          >
            Menu & Order Records
          </h2>
          <span 
            class="text-xs font-bold px-2.5 py-0.5 rounded-full border"
            :class="isDarkMode 
              ? 'bg-[#ffcc00]/10 border-[#ffcc00]/30 text-[#ffcc00]' 
              : 'bg-amber-100 border-amber-300 text-amber-900'"
          >
            Showing {{ records.length }} of {{ allRecordsCount || records.length }}
          </span>
        </div>
        <p class="text-xs text-gray-500 mt-1">Manage, filter, and track real-time kitchen orders.</p>
      </div>
      <div class="flex items-center space-x-3">
        <button 
          @click="$emit('add')"
          class="bg-[#ffcc00] hover:bg-yellow-500 text-black font-bold py-2.5 px-5 rounded-xl text-sm transition flex items-center shadow-lg hover:shadow-yellow-500/20 active:scale-95 cursor-pointer"
        >
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          Add Item
        </button>
      </div>
    </div>

    <!-- Filter Bar: Search + Category + Status Pills -->
    <div 
      class="p-6 border-b space-y-4 transition-colors duration-300"
      :class="isDarkMode ? 'border-[#222] bg-[#0c0c0c]/80' : 'border-amber-100 bg-gray-50/70'"
    >
      <!-- Search & Category Row -->
      <div class="flex flex-col md:flex-row gap-3">
        <div class="relative flex-grow">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            :value="searchTerm"
            @input="$emit('update:searchTerm', $event.target.value)"
            type="text" 
            placeholder="Search by food name, customer, or category..." 
            class="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition outline-none border font-medium"
            :class="isDarkMode 
              ? 'bg-black border-[#333] text-white focus:border-[#ffcc00] placeholder-gray-600' 
              : 'bg-white border-gray-200 text-gray-900 focus:border-amber-500 placeholder-gray-400 shadow-sm'"
          />
        </div>

        <!-- Category Dropdown Filter -->
        <div class="md:w-56">
          <select 
            :value="selectedCategory"
            @change="$emit('update:selectedCategory', $event.target.value)"
            class="w-full px-4 py-2.5 rounded-xl text-sm transition outline-none border font-medium cursor-pointer"
            :class="isDarkMode 
              ? 'bg-black border-[#333] text-white focus:border-[#ffcc00]' 
              : 'bg-white border-gray-200 text-gray-900 focus:border-amber-500 shadow-sm'"
          >
            <option value="All">All Categories</option>
            <option v-for="cat in categories.filter(c => c !== 'All')" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>
      </div>

      <!-- Status Filter Pills -->
      <div class="flex flex-wrap items-center gap-2 pt-1">
        <span class="text-[11px] uppercase tracking-wider text-gray-500 font-bold mr-1">Status:</span>
        <button
          v-for="status in statusOptions"
          :key="status"
          @click="$emit('update:selectedStatus', status)"
          type="button"
          class="px-3.5 py-1 rounded-full text-xs font-semibold transition cursor-pointer border"
          :class="selectedStatus === status 
            ? 'bg-[#ffcc00] text-black border-[#ffcc00] shadow-sm font-bold scale-105' 
            : (isDarkMode 
                ? 'bg-[#181818] text-gray-300 border-[#2b2b2b] hover:border-gray-500 hover:text-white' 
                : 'bg-white text-gray-700 border-gray-200 hover:border-amber-400 hover:bg-amber-50/50')"
        >
          {{ status }}
        </button>

        <button 
          v-if="selectedStatus !== 'All' || selectedCategory !== 'All' || searchTerm"
          @click="$emit('clear-filters')"
          class="ml-auto text-xs text-amber-600 dark:text-yellow-500 hover:underline font-semibold cursor-pointer"
        >
          Clear filters
        </button>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-if="records.length === 0" class="p-16 text-center">
      <div 
        class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
        :class="isDarkMode ? 'bg-[#1c1c1c] text-gray-500' : 'bg-amber-100 text-amber-600'"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </div>
      <h3 
        class="text-base font-bold mb-1"
        :class="isDarkMode ? 'text-white' : 'text-gray-900'"
      >
        No matching menu items found
      </h3>
      <p class="text-xs text-gray-500 max-w-sm mx-auto mb-5">
        No orders match your current filter ({{ selectedStatus !== 'All' ? `Status: ${selectedStatus}` : '' }} {{ selectedCategory !== 'All' ? `Category: ${selectedCategory}` : '' }}).
      </p>
      <button 
        @click="$emit('clear-filters')"
        class="px-4 py-2 rounded-xl text-xs font-bold transition border cursor-pointer"
        :class="isDarkMode 
          ? 'bg-[#222] hover:bg-[#333] text-[#ffcc00] border-[#333]' 
          : 'bg-amber-500 hover:bg-amber-600 text-white border-amber-500 shadow-md'"
      >
        Reset Filter Criteria
      </button>
    </div>
    
    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr 
            class="text-[10px] uppercase font-black tracking-widest border-b"
            :class="isDarkMode 
              ? 'text-[#ffcc00] border-[#222] bg-[#0d0d0d]' 
              : 'text-amber-800 border-amber-100 bg-amber-50/60'"
          >
            <th class="px-6 py-4">ID</th>
            <th class="px-6 py-4">Customer</th>
            <th class="px-6 py-4">Food Item</th>
            <th class="px-6 py-4">Category</th>
            <th class="px-6 py-4">Price</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y" :class="isDarkMode ? 'divide-[#222]' : 'divide-gray-100'">
          <tr 
            v-for="record in records" 
            :key="record.id" 
            class="transition group"
            :class="isDarkMode ? 'hover:bg-[#181818]' : 'hover:bg-amber-50/40'"
          >
            <td class="px-6 py-4 text-xs font-mono" :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'">
              #{{ String(record.id).slice(-6) }}
            </td>
            <td class="px-6 py-4">
              <div 
                class="font-semibold text-sm"
                :class="isDarkMode ? 'text-white' : 'text-gray-900'"
              >
                {{ record.customerName || '—' }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <img v-if="record.image" :src="getAssetUrl(record.image)" alt="" class="w-10 h-10 rounded-xl object-cover mr-3 border shadow-sm" :class="isDarkMode ? 'border-[#333]' : 'border-gray-200'" />
                <div v-else class="w-10 h-10 rounded-xl mr-3 border flex items-center justify-center" :class="isDarkMode ? 'bg-[#222] border-[#333]' : 'bg-gray-100 border-gray-200'">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <div 
                  class="font-bold text-sm"
                  :class="isDarkMode ? 'text-white' : 'text-gray-900'"
                >
                  {{ record.foodName }}
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-sm">
              <span 
                class="px-2.5 py-0.5 rounded-lg border text-xs font-medium"
                :class="isDarkMode 
                  ? 'bg-[#1c1c1c] text-gray-300 border-[#2b2b2b]' 
                  : 'bg-gray-100 text-gray-700 border-gray-200'"
              >
                {{ record.category }}
              </span>
            </td>
            <td 
              class="px-6 py-4 text-sm font-black"
              :class="isDarkMode ? 'text-[#ffcc00]' : 'text-amber-600'"
            >
              ₱{{ Number(record.price || 0).toFixed(2) }}
            </td>
            <td class="px-6 py-4">
              <span 
                class="px-3 py-1 inline-flex text-[10px] leading-5 font-bold rounded-full uppercase tracking-wider border shadow-sm"
                :class="{
                  'bg-yellow-900/30 text-yellow-400 border-yellow-800': record.status === 'Pending',
                  'bg-blue-900/30 text-blue-400 border-blue-800': record.status === 'Preparing',
                  'bg-green-900/30 text-green-400 border-green-800': record.status === 'Ready' || record.status === 'Available' || record.status === 'Delivered',
                  'bg-red-900/30 text-red-400 border-red-800': record.status === 'Unavailable' || record.status === 'Cancelled'
                }"
              >
                {{ record.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-center">
              <div class="flex items-center justify-center space-x-2">
                <button 
                  @click="$emit('edit', record)"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border"
                  :class="isDarkMode 
                    ? 'border-[#ffcc00] text-[#ffcc00] hover:bg-[#ffcc00] hover:text-black' 
                    : 'border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-white'"
                >
                  Edit
                </button>
                <button 
                  @click="$emit('delete', record.id)"
                  class="px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border"
                  :class="isDarkMode 
                    ? 'border-red-900/80 text-red-400 hover:bg-red-900 hover:text-white' 
                    : 'border-red-300 text-red-600 hover:bg-red-500 hover:text-white'"
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
