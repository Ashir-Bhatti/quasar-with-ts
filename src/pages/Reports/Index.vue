<template>
  <q-page class="q-pa-md">
    <!-- Scrollable Row for Columns -->
    <div class="q-gutter-md row no-wrap scrollable-container">
      <!-- Columns -->
      <div
        v-for="(column, columnIndex) in boardColumns"
        :key="columnIndex"
        class="q-pa-sm column bg-grey-2"
        style="width: 300px; min-height: 400px; border-radius: 8px; flex: 0 0 auto;"
        @dragover.prevent="onDragOver"
        @drop="onDrop(columnIndex)"
      >
        <q-card flat class="q-pa-sm">
          <div class="text-h6 text-center bg-primary">{{ column.name }}</div>
        </q-card>
        <!-- Draggable Tasks -->
        <div class="q-pa-sm">
          <div
            v-for="(task, taskIndex) in column.tasks"
            :key="taskIndex"
            class="q-mb-sm"
            draggable="true"
            @dragstart="onDragStart(task, columnIndex, taskIndex)"
            @dragend="onDragEnd"
            @click="openTaskDetails(task, columnIndex, taskIndex)"
          >
            <q-card flat bordered style="cursor: pointer;">
              <q-card-section>
                <div class="text-sm">{{ task.name }}</div>
                <div class="text-caption row items-center">
                  <q-icon
                    :name="priorityIcon(task.priority)"
                    class="q-mr-sm"
                  ></q-icon>
                  Priority: {{ task.priority }}
                </div>
                <div class="text-caption row items-center">
                  <q-avatar size="24px" class="q-mr-sm">
                    <img :src="getAvatar(task.assignee)" alt="User Avatar" />
                  </q-avatar>
                  Assignee: {{ task.assignee }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <!-- Task Details Modal -->
    <q-dialog v-model="showTaskModal" persistent>
      <q-card style="width: 400px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Task Details</div>
        </q-card-section>
        <q-card-section>
          <p><b>Name:</b> {{ selectedTask?.name }}</p>
          <p><b>Description:</b> {{ selectedTask?.description }}</p>
          <p><b>Priority:</b>
            <q-select
              v-model="selectedTask.priority"
              :options="['High', 'Medium', 'Low']"
              filled
            />
          </p>
          <p><b>Assignee:</b>
            <q-select
              v-model="selectedTask.assignee"
              :options="users"
              option-label="name"
              option-value="name"
              filled
            >
              <template v-slot:option="scope">
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="30px">
                      <img :src="getAvatar(scope.opt.name)" alt="User Avatar" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ scope.opt.name }}</q-item-label>
                    <q-item-label caption>{{ scope.opt.role }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </p>
          <p><b>Status:</b>
            <q-select
              v-model="selectedStatus"
              :options="boardColumns.map(column => column.name)"
              label="Update Status"
              filled
            />
          </p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" color="negative" @click="closeModal" />
          <q-btn flat label="Update" color="positive" @click="updateTaskStatus" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      boardColumns: [
        {
          name: "To Do",
          tasks: [
            { name: "Task 1", description: "Description for Task 1", priority: "High", assignee: "John Doe" },
            { name: "Task 2", description: "Description for Task 2", priority: "Medium", assignee: "Jane Smith" },
            { name: "Task 3", description: "Description for Task 3", priority: "Low", assignee: "Alice Johnson" },
          ],
        },
        {
          name: "In Progress",
          tasks: [
            { name: "Task 4", description: "Description for Task 4", priority: "High", assignee: "Robert Brown" },
            { name: "Task 5", description: "Description for Task 5", priority: "Medium", assignee: "Emily Davis" },
            { name: "Task 12", description: "Description for Task 12", priority: "Medium", assignee: "Emily Davis" },
          ],
        },
        {
          name: "Done",
          tasks: [
            { name: "Task 6", description: "Description for Task 6", priority: "Low", assignee: "Michael Wilson" },
            { name: "Task 11", description: "Description for Task 12", priority: "Low", assignee: "Michael Wilson" },
          ],
        },
        {
          name: "Deleted",
          tasks: [
            { name: "Task 7", description: "Description for Task 7", priority: "Low", assignee: "Michael Wilson" },
            { name: "Task 8", description: "Description for Task 8", priority: "Low", assignee: "Michael Wilson" },
            { name: "Task 9", description: "Description for Task 9", priority: "Low", assignee: "Michael Wilson" },
            { name: "Task 10", description: "Description for Task 10", priority: "Low", assignee: "Michael Wilson" },
          ],
        },
      ],
      showTaskModal: false,
      selectedTask: null,
      selectedStatus: null,
      currentColumnIndex: null,
      currentTaskIndex: null,
      users: [
        { name: "John Doe", role: "Project Manager" },
        { name: "Jane Smith", role: "Developer" },
        { name: "Alice Johnson", role: "Tester" },
        { name: "Robert Brown", role: "Designer" },
        { name: "Emily Davis", role: "Business Analyst" },
        { name: "Michael Wilson", role: "Scrum Master" },
      ],
    };
  },
  methods: {
    onDragStart(task, columnIndex, taskIndex) {
      this.draggingTask = task;
      this.currentColumnIndex = columnIndex;
      this.currentTaskIndex = taskIndex;
    },
    onDragEnd() {
      this.draggingTask = null;
      this.currentColumnIndex = null;
      this.currentTaskIndex = null;
    },
    onDragOver(event) {
      event.preventDefault();
    },
    onDrop(columnIndex) {
      if (
        this.draggingTask &&
        this.currentColumnIndex !== null &&
        this.currentTaskIndex !== null
      ) {
        this.boardColumns[this.currentColumnIndex].tasks.splice(
          this.currentTaskIndex,
          1
        );
        this.boardColumns[columnIndex].tasks.push(this.draggingTask);
        this.onDragEnd();
      }
    },
    openTaskDetails(task, columnIndex, taskIndex) {
      this.selectedTask = { ...task };
      this.currentColumnIndex = columnIndex;
      this.currentTaskIndex = taskIndex;
      this.selectedStatus = this.boardColumns[columnIndex].name;
      this.showTaskModal = true;
    },
    closeModal() {
      this.showTaskModal = false;
    },
    updateTaskStatus() {
      if (this.selectedStatus && this.currentColumnIndex !== null) {
        const targetColumn = this.boardColumns.find(
          (column) => column.name === this.selectedStatus
        );
        if (targetColumn) {
          this.boardColumns[this.currentColumnIndex].tasks.splice(
            this.currentTaskIndex,
            1
          );
          targetColumn.tasks.push(this.selectedTask);
        }
        this.closeModal();
      }
    },
    getAvatar(assignee) {
      const avatars = {
        "John Doe": "https://i.pravatar.cc/24?u=johndoe",
        "Jane Smith": "https://i.pravatar.cc/24?u=janesmith",
        "Alice Johnson": "https://i.pravatar.cc/24?u=alicejohnson",
        "Robert Brown": "https://i.pravatar.cc/24?u=robertbrown",
        "Emily Davis": "https://i.pravatar.cc/24?u=emilydavis",
        "Michael Wilson": "https://i.pravatar.cc/24?u=michaelwilson",
      };
      return avatars[assignee] || "https://i.pravatar.cc/24?u=default";
    },
    priorityIcon(priority) {
      const icons = {
        High: "priority_high",
        Medium: "priority_medium",
        Low: "priority_low",
      };
      return icons[priority] || "help_outline";
    },
  },
};
</script>

<style scoped>
.scrollable-container {
  overflow-x: auto;
  display: flex;
  /* padding: 8px 0; */
}

.q-card {
  transition: box-shadow 0.5s;
}

.q-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.scrollable-container::-webkit-scrollbar {
  height: 8px;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.scrollable-container::-webkit-scrollbar-thumb:hover {
  background: #aaa;
}
</style>
