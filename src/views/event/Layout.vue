<script setup>
import { ref, onMounted } from 'vue'

import EventService from '../../services/EventService'

import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    id: {
        required: true
    }
})

const event = ref(null)

onMounted(() => {
    EventService.getEvent(props.id)
        .then((response) => {
            event.value = response.data
        })
        .catch((error) => {
            console.log(error)
            if (error.response && error.response.status == 404) {
                router.push({
                    name: '404Resource',
                    params: { resource: 'event' }
                })
            } else {
                router.push({ name: 'NetworkError' })
            }
        })
})
</script>

<template>
    <div v-if="event">
        <h1>{{ event.title }}</h1>

        <div id="nav" style="display: flex; gap: 4px; justify-content: center; font-weight: bold;">
            <router-link :to="{ name: 'EventDetails' }">Details</router-link>
            <router-link :to="{ name: 'EventRegister' }">Register</router-link>
            <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
        </div>

        <router-view :event="event" />
    </div>
</template>
