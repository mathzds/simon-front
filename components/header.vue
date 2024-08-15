<script setup>
const links = [
    [
        {label: 'Home', icon: 'i-heroicons-home', to: '/'}, 
        {label: 'Search', icon: 'i-heroicons-magnifying-glass', to: '/search'}
    ], 
    [
        {label: 'Login', icon: 'i-heroicons-light-bulb'}
    ]
]
</script>

<template>
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>
