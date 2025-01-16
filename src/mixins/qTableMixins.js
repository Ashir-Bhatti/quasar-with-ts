/* eslint-disable no-empty-function */

// interface IPagination {
//   page: number;
//   rowsPerPage: number;
//   rowsNumber: number;
// }
/*eslint no-empty-function: "error"*/
import { instance } from 'src/boot/axios';
export default {
  data() {
    return {
      qAxios: instance,
      qPresistState: false,
      tableApi: '',
      viewRoute: '',
      tablePagination: {
        page: 1,
        rowsPerPage: 25,
        rowsNumber: 1,
      },
      tableFilter: '',
      isTableLoading: false,
      tableData: [],
      tableParams: {},
      storageData: {},
      queryParams: {},
      qAxiosResponse: {},
      rowsPerPageOptions: [10, 25, 50, 0],
      qIsSorted: true,
    };
  },

  methods: {
    fetchTableData({ pagination, filter }) {
      this.qTableBeforeLoad();

      this.isTableLoading = true;
      this.queryParams = {
        page: pagination.page,
        rowsPerPage: pagination.rowsPerPage,
        rowsNumber: pagination.rowsNumber,
        sortBy: pagination.sortBy,
        descending: pagination.descending,
        filter: filter,
        ...this.tableParams,
        ...this.storageData,
      };
      this.tablePagination = pagination;

      this.storageData = {};
      this.qAxios
        .get(this.tableApi, {
          params: { ...this.queryParams },
        })
        .then((response) => {
          this.tableData = response.data.data.users;
          this.qAxiosResponse = response.data;
          this.tablePagination = pagination;
          this.tablePagination.rowsNumber = response.data.data.meta
            ? response.data.meta.total
            : 10;
          this.qTableLoaded();
        })
        .finally(() => {
          this.isTableLoading = false;
        });
    },
    deleteItem(id) {
      this.qAxios.delete(`${this.tableApi}/${id}`).then(() => {
        this.tableData = this.tableData.filter((item) => item.id != id);
      });
    },
    viewItem(id) {
      this.$router.push({ name: this.viewRoute, params: { id } });
    },
    viewRouteObj(id) {
      return { name: this.viewRoute, params: { id } };
    },
    updateItem(data) {
      this.tableData.map((item) => {
        if (item.id == data.id) {
          return data;
        }
      });
    },
    loadTable() {
      this.fetchTableData({
        pagination: this.tablePagination,
        filter: this.tableFilter,
      });
    },
    setLocalStorageState() {
      const queryParams = JSON.parse(localStorage.getItem(this.tableApi));
      if (queryParams) {
        this.storageData = { ...queryParams };
        localStorage.removeItem(this.tableApi);
        this.tablePagination = {
          page: queryParams.page,
          rowsPerPage: queryParams.rowsPerPage,
          rowsNumber: queryParams.rowsNumber,
        };
        this.tableFilter = queryParams.filter;
      }
    },

    qTableLoaded() {},
    qTableBeforeLoad() {},
    qSortList() {
      this.qAxios.post(`${this.tableApi}/sort`, this.tableData).then(() => {
        this.qIsSorted = true;
      });
    },
  },
  mounted() {},
  beforeUnmount() {
    if (this.qPresistState) {
      localStorage.setItem(this.tableApi, JSON.stringify(this.queryParams));
    }
  },

  created() {
    if (this.qPresistState) {
      this.setLocalStorageState();
    }
  },
  beforeMount() {
    this.loadTable();
  },
  watch: {
    '$i18n.locale': function () {
      this.loadTable();
    },
  },
};
