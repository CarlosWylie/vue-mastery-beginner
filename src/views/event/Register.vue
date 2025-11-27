<script setup>
import { useRoute, useRouter } from 'vue-router';

const props = defineProps(["event"])

const router  = useRouter()

const register = () => {
    // not going to focus on api call but rather assume it is successful

    // programmatic navigation
    router.push({
        name : 'EventDetails'
    })
}
</script>

<template>
    <p>Register for the event here.</p>
    <button @click="register"> Register Me!</button>
</template>
