<template>
  <q-page class="q-pa-md">
    <div class="chat-container">
      <!-- Chat Header -->
      <div class="chat-header row items-center justify-between q-pa-sm">
        <div class="row items-center">
          <q-avatar size="40px" rounded>
            <img src="https://cdn.quasar.dev/img/avatar3.jpg" alt="Avatar" />
          </q-avatar>
          <div class="q-ml-sm">
            <div class="text-h6">Jane</div>
            <div class="text-caption text-grey">Online</div>
          </div>
        </div>
        <div class="row items-center">
          <q-btn
            flat
            round
            icon="call"
            color="primary"
            dense
            class="q-mr-sm call-icon"
            @click="onAudioCall"
          />
          <q-btn
            flat
            round
            icon="videocam"
            color="primary"
            dense
            class="call-icon"
            @click="onVideoCall"
          />
        </div>
      </div>

      <!-- Chat Messages -->
      <div
        ref="chatArea"
        class="chat-messages scrollable"
        @scroll="onScroll"
      >
        <q-chat-message
          v-for="(message, index) in messages"
          :key="index"
          :text="[message.text]"
          :sent="message.sent"
          :stamp="message.stamp"
          :bg-color="message.sent ? 'primary' : 'green-4'"
          size="5"
          text-color="white"
          class="q-mb-sm"
        >
          <template v-slot:footer>
            <q-icon
              :name="message.read ? 'done_all' : 'done'"
              :color="message.read ? 'blue' : 'grey'"
              size="16px"
              class="q-ml-sm"
            />
          </template>
        </q-chat-message>

        <!-- Show loading spinner while fetching messages -->
        <div v-if="isLoading" class="loading-container">
          <q-spinner color="primary" size="30px" />
        </div>
      </div>

      <!-- Message Input -->
      <div class="chat-input q-pt-sm">
        <q-input
          v-model="newMessage"
          placeholder="Type a message..."
          filled
          dense
          class="q-mb-xs"
          @keyup.enter="sendMessage"
        />
        <q-btn
          label="Send"
          color="primary"
          icon="send"
          @click="sendMessage"
          class="full-width"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "ChatPage",
  data() {
    return {
      messages: [
        {
          id: 1,
          name: "Jane",
          text: "Hey, how are you?",
          sent: false,
          stamp: "7 minutes ago",
          read: false,
        },
        {
          id: 2,
          name: "me",
          text: "Doing fine, how r you?",
          sent: true,
          stamp: "4 minutes ago",
          read: true,
        },
        {
          id: 1,
          name: "Jane",
          text: "Hey, how are you?",
          sent: false,
          stamp: "7 minutes ago",
          read: false,
        },
        {
          id: 2,
          name: "me",
          text: "Doing fine, how r you?",
          sent: true,
          stamp: "4 minutes ago",
          read: true,
        },
        {
          id: 1,
          name: "Jane",
          text: "Hey, how are you?",
          sent: false,
          stamp: "7 minutes ago",
          read: false,
        },
        {
          id: 2,
          name: "me",
          text: "Doing fine, how r you?",
          sent: true,
          stamp: "4 minutes ago",
          read: true,
        },
        {
          id: 1,
          name: "Jane",
          text: "Hey, how are you?",
          sent: false,
          stamp: "7 minutes ago",
          read: false,
        },
        {
          id: 2,
          name: "me",
          text: "Doing fine, how r you?",
          sent: true,
          stamp: "4 minutes ago",
          read: true,
        },
        {
          id: 1,
          name: "Jane",
          text: "Hey, how are you?",
          sent: false,
          stamp: "7 minutes ago",
          read: false,
        },
        {
          id: 2,
          name: "me",
          text: "Doing fine, how r you?",
          sent: true,
          stamp: "4 minutes ago",
          read: true,
        },
        {
          id: 1,
          name: "Jane",
          text: "Hey, how are you?",
          sent: false,
          stamp: "7 minutes ago",
          read: false,
        },
        {
          id: 2,
          name: "me",
          text: "Doing fine, how r you?",
          sent: true,
          stamp: "4 minutes ago",
          read: true,
        },
        {
          id: 1,
          name: "Jane",
          text: "Hey, how are you?",
          sent: false,
          stamp: "7 minutes ago",
          read: false,
        },
        {
          id: 2,
          name: "me",
          text: "Doing fine, how r you?",
          sent: true,
          stamp: "4 minutes ago",
          read: true,
        },
        {
          id: 1,
          name: "Jane",
          text: "Hey, how are you?",
          sent: false,
          stamp: "7 minutes ago",
          read: false,
        },
        {
          id: 2,
          name: "me",
          text: "Doing fine, how r you?",
          sent: true,
          stamp: "4 minutes ago",
          read: true,
        },
        {
          id: 1,
          name: "Jane",
          text: "Hey, how are you?",
          sent: false,
          stamp: "7 minutes ago",
          read: false,
        },
        {
          id: 2,
          name: "me",
          text: "Doing fine, how r you?",
          sent: true,
          stamp: "4 minutes ago",
          read: true,
        },
        {
          id: 1,
          name: "Jane",
          text: "Hey, how are you?",
          sent: false,
          stamp: "7 minutes ago",
          read: false,
        },
        {
          id: 2,
          name: "me",
          text: "Doing fine, how r you?",
          sent: true,
          stamp: "4 minutes ago",
          read: true,
        },
        {
          id: 1,
          name: "Jane",
          text: "Hey, how are you?",
          sent: false,
          stamp: "7 minutes ago",
          read: false,
        },
        {
          id: 2,
          name: "me",
          text: "Doing fine, how r you?",
          sent: true,
          stamp: "4 minutes ago",
          read: true,
        },
        {
          id: 1,
          name: "Jane",
          text: "Hey, how are you?",
          sent: false,
          stamp: "7 minutes ago",
          read: false,
        },
        {
          id: 2,
          name: "me",
          text: "Doing fine, how r you?",
          sent: true,
          stamp: "4 minutes ago",
          read: true,
        },
        {
          id: 1,
          name: "Jane",
          text: "Hey, how are you?",
          sent: false,
          stamp: "7 minutes ago",
          read: false,
        },
        {
          id: 2,
          name: "me",
          text: "Doing fine, how r you?",
          sent: true,
          stamp: "4 minutes ago",
          read: true,
        },
        {
          id: 1,
          name: "Jane",
          text: "Hey, how are you?",
          sent: false,
          stamp: "7 minutes ago",
          read: false,
        },
        {
          id: 2,
          name: "me",
          text: "Doing fine, how r you?",
          sent: true,
          stamp: "4 minutes ago",
          read: true,
        },
      ],
      newMessage: "",
      page: 1,
      isLoading: false,
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() === "") return;

      this.messages.push({
        id: this.messages.length + 1,
        name: "me",
        avatar: "https://cdn.quasar.dev/img/avatar4.jpg",
        text: this.newMessage,
        sent: true,
        stamp: "Just now",
        read: false,
      });

      this.newMessage = "";
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatArea = this.$refs.chatArea;
        if (chatArea) {
          chatArea.scrollTop = chatArea.scrollHeight;
        }
      });
    },
    onScroll() {
      const chatArea = this.$refs.chatArea;
      if (chatArea.scrollTop === 0 && !this.isLoading) {
        this.isLoading = true;
        this.loadOlderMessages();
      }
    },
    async loadOlderMessages() {
      // Simulate API call
      setTimeout(() => {
        const olderMessages = [
          {
            id: this.messages[0].id - 1,
            name: "Jane",
            avatar: "https://cdn.quasar.dev/img/avatar3.jpg",
            text: "Did you check the report?",
            sent: false,
            stamp: "10 minutes ago",
            read: true,
          },
          {
            id: this.messages[0].id - 2,
            name: "me",
            avatar: "https://cdn.quasar.dev/img/avatar4.jpg",
            text: "Yes, I did!",
            sent: true,
            stamp: "12 minutes ago",
            read: true,
          },
        ];

        this.messages = [...olderMessages, ...this.messages];
        this.isLoading = false;

        const chatArea = this.$refs.chatArea;
        chatArea.scrollTop = chatArea.scrollHeight / 3;
      }, 1000); // Simulate delay
    },
    onAudioCall() {
      console.log("Audio call initiated");
    },
    onVideoCall() {
      console.log("Video call initiated");
    },
  },
  mounted() {
    this.scrollToBottom();
  },
};
</script>

<style scoped>
.chat-container {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 90px);
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
}

.chat-header {
  background-color: #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #ccc;
  padding: 10px;
}

.call-icon {
  background-color: #ffffff !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  width: 100%;
  padding: 20px;
  background-color: white;

}

.scrollable {
  scrollbar-width: thin;
  scrollbar-color: #90caf9 transparent;
}

.scrollable::-webkit-scrollbar {
  width: 6px;
}

.scrollable::-webkit-scrollbar-thumb {
  background-color: #90caf9;
  border-radius: 4px;
}

.chat-input {
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  padding: 10px;
  margin-top: auto;
  position: sticky;
  bottom: 0;
}

.full-width {
  width: 100%;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
</style>
