<template>
  <div class="q-pa-lg">
    <!-- Add Button -->
    <q-btn 
      label="Add New User" 
      color="primary" 
      @click="openAddDialog" 
      class="q-mb-md" 
      style="position: absolute; top: 20px; right: 20px; padding: 5px 10px; z-index: 2;" 
    />

    <!-- Search Filter -->
    <q-input
      outlined
      v-model="filter"
      placeholder="Search Users..."
      dense
      class="q-mb-md"
      style="max-width: 300px;"
      debounce="300"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>

    <!-- User Table -->
    <q-table
      :rows="filteredItems"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[10, 20, 50]"
      class="shadow-2 rounded-borders"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn 
            flat 
            dense 
            color="secondary" 
            @click="editItem(props.row)" 
            icon="edit" 
          />
          <q-btn 
            flat 
            dense 
            color="negative" 
            @click="openDeleteConfirmation(props.row)" 
            icon="delete" 
            class="q-ml-sm" 
          />
        </q-td>
      </template>
    </q-table>

    <!-- Add/Edit User Dialog -->
    <q-dialog v-model="showDialog">
      <q-card style="width: 400px; max-width: 80vw;">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">User Form</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="formData.name" label="Name" filled required />
          <q-input v-model="formData.email" label="Email" type="email" filled required />
          <q-input v-model="formData.phone" label="Phone" filled />
          <q-input v-model="formData.city" label="City" filled />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancel" @click="closeDialog" />
          <q-btn label="Save" @click="saveItem" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Delete Confirmation Dialog -->
    <q-dialog v-model="showDeleteDialog">
      <q-card style="width: 400px; max-width: 80vw;">
        <q-card-section class="bg-negative text-white">
          <div class="text-h6">Are you sure you want to delete this user?</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancel" @click="closeDeleteDialog" />
          <q-btn label="Delete" @click="deleteItem" color="negative" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Loading Spinner -->
    <q-dialog v-model="loading" persistent>
      <q-card-section class="q-pa-md text-center">
        <q-spinner color="primary" size="50px" />
        <div class="q-mt-md">Processing...</div>
      </q-card-section>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "UserTable",
  data() {
    return {
      filter: "",
      showDialog: false,
      showDeleteDialog: false,
      loading: false, // Spinner state
      isEditMode: false,
      formData: { id: null, name: "", email: "", phone: "", city: "" },
      itemToDelete: null,
      items: Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        email: `user${index + 1}@example.com`,
        phone: `555-555-${index + 1000}`,
        city: `City ${index + 1}`
      })),
      columns: [
        { name: "name", label: "Name", align: "left", field: "name", sortable: true },
        { name: "email", label: "Email", align: "center", field: "email", sortable: true },
        { name: "phone", label: "Phone", align: "center", field: "phone", sortable: true },
        { name: "city", label: "City", align: "center", field: "city", sortable: true },
        { name: "actions", label: "Actions", align: "center", field: "actions" }
      ]
    };
  },
  computed: {
    filteredItems() {
      if (!this.filter) return this.items;
      const search = this.filter.toLowerCase();
      return this.items.filter(item =>
        Object.values(item).some(value => value.toString().toLowerCase().includes(search))
      );
    }
  },
  methods: {
    openAddDialog() {
      this.formData = { id: null, name: "", email: "", phone: "", city: "" };
      this.isEditMode = false;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
    saveItem() {
      this.loading = true;
      setTimeout(() => {
        if (this.isEditMode) {
          const index = this.items.findIndex(item => item.id === this.formData.id);
          this.items.splice(index, 1, this.formData);
        } else {
          this.formData.id = this.items.length + 1;
          this.items.push(this.formData);
        }
        this.closeDialog();
        this.loading = false;
      }, 1000);
    },
    editItem(item) {
      this.formData = { ...item };
      this.isEditMode = true;
      this.showDialog = true;
    },
    openDeleteConfirmation(item) {
      this.itemToDelete = item;
      this.showDeleteDialog = true;
    },
    closeDeleteDialog() {
      this.showDeleteDialog = false;
    },
    deleteItem() {
      this.loading = true;
      setTimeout(() => {
        const index = this.items.findIndex(i => i.id === this.itemToDelete.id);
        this.items.splice(index, 1);
        this.closeDeleteDialog();
        this.loading = false;
      }, 1000);
    }
  }
};
</script>

<style scoped>
.q-table {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
.q-input {
  margin-bottom: 1rem;
}
.bg-primary {
  background-color: #007bff;
}
.bg-negative {
  background-color: #d32f2f;
}
</style>
