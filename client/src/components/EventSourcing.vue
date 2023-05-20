<template>
    <div class="center">
        <div>
            <div class="form">
                <input type="text" v-model="messageInputValue"> 
                <button @click="sendMessage">Send</button>
            </div>
            <div class="messages" >
                <div class="message" v-for="message in messages" :key="message.id">
                    {{ message.message }}
                </div>
            </div> 
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const messages = ref([])
const messageInputValue = ref('')

const subscribe = async () => {
    const eventSource = new EventSource('http://localhost:3000/connect')
    eventSource.onmessage = function(event) {
        messages.value = [JSON.parse(event.data), ...messages.value]
    }
}

const sendMessage = async () => {
    const message = {
        message: messageInputValue.value,
        id: Date.now(),
    }
    await axios.post('http://localhost:3000/new-messages', message)
    messageInputValue.value = ''
}


subscribe()
</script>

<style lang="scss" scoped>

</style>