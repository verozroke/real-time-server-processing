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
    try {

        const {data} = await axios.get('http://localhost:3000/get-messages', {
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
        messages.value = [data, ...messages.value]
        await subscribe()

    } catch(e) {
        console.log(e);
        setTimeout(() => {
            subscribe()
        }, 500)
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