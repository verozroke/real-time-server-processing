<template>
    <div>
        <div v-if="connected" class="center">
        <div>
            <div class="form">
                <input type="text" v-model="messageInputValue"> 
                <button @click="sendMessage">Send</button>
            </div>
            <div class="messages" >
                <div class="message" v-for="message in messages" :key="message.id">
                    {{ message.event !== 'connection' 
                        ? `${message.username}: ${message.message}` 
                        : `Пользователь ${message.username} подключился`
                        }}
                </div>
            </div> 
        </div>
    </div>
    <div v-else class="center">
        <div>
            <div class="form">
                <input type="text" placeholder="your name" v-model="username">
                <button @click="connect">Login</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const messages = ref([])
const socket = ref(null)
const messageInputValue = ref('')

const connected = ref(false)
const username = ref('')



const sendMessage = async () => {
    const message = {
        username: username.value,
        message: messageInputValue.value,
        id: Date.now(),
        event: 'message'
    }
    socket.current.send(JSON.stringify(message))
    messageInputValue.value = ''
}

function connect( ) {
    socket.current = new WebSocket('ws://localhost:3000')
    socket.current.onmessage = (event) => {
        console.log('message received', event.data);
        const message = JSON.parse(event.data)
        messages.value = [message, ...messages.value]
    }
    socket.current.onopen = () => {
        connected.value = true
        const message = {
            event: 'connection',
            username: username.value,
            id: Date.now(),
        }
        socket.current.send(JSON.stringify(message))
    }
    socket.current.onerror = () => {

    }
    socket.current.onclose = () => {

    }
}


</script>

<style lang="scss" scoped>
</style>