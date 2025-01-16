export default interface IColumns {
    name: string;
    align: 'left' | 'center' | 'right';
    label: string;
    field: string;
    sortable?: boolean;
  }