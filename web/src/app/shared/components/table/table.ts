import {
  Component,
  computed,
  ContentChild,
  Input,
  input,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Checkbox } from '../inputs/checkbox/checkbox';

export interface TableColumn {
  label: string;
  sortable?: boolean;
  class?: string;
}

let nextId: number = 0;

@Component({
  selector: 'app-table',
  imports: [CommonModule, FormsModule, Checkbox],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input({ required: true }) columns: TableColumn[] = [];

  // Inputs
  isLoading = input<boolean>(false); // NOVO INPUT
  id = input<string>(`field-${nextId++}`);
  selectionMode = input<'checkbox' | 'none'>('none');

  // Signals e Outputs
  _data = signal<any[]>([]);
  selectionChange = output<any[]>();
  search = output<string>();
  rowClick = output<any>();

  @Input({ required: true }) set data(value: any[]) {
    this._data.set(value);
    // Opcional: Voltar para página 1 ao receber novos dados
    // this.currentPage.set(1);
  }

  @ContentChild(TemplateRef) rowTemplate!: TemplateRef<any>;

  // --- PAGINAÇÃO ---
  currentPage = signal(1);
  pageSize = signal(5);

  totalItems = computed(() => this._data().length);

  // Array auxiliar para gerar as linhas do Skeleton
  skeletonRows = computed(() => {
    return Array(this.pageSize()).fill(0);
  });

  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this._data().slice(start, end);
  });

  startIndex = computed(() => (this.currentPage() - 1) * this.pageSize());
  endIndex = computed(() => Math.min(this.startIndex() + this.pageSize(), this.totalItems()));

  // --- MÉTODOS DE PAGINAÇÃO ---
  nextPage() {
    if (this.endIndex() < this.totalItems() && !this.isLoading()) {
      this.currentPage.update((p) => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1 && !this.isLoading()) {
      this.currentPage.update((p) => p - 1);
    }
  }

  changePageSize(size: number) {
    this.pageSize.set(Number(size));
    this.currentPage.set(1);
  }

  // --- LÓGICA DE SELEÇÃO (Mantida igual) ---
  allSelected = computed(() => {
    const data = this._data();
    return data.length > 0 && data.every((u) => u.selected);
  });

  indeterminate = computed(() => {
    const data = this._data();
    const count = data.filter((u) => u.selected).length;
    return count > 0 && count < data.length;
  });

  toggleAll(isChecked: boolean) {
    this._data.update((items) => items.map((i) => ({ ...i, selected: isChecked })));
    this.emitSelection();
  }

  toggleOne(item: any, isChecked: boolean) {
    this._data.update((items) =>
      items.map((i) => (i === item ? { ...i, selected: isChecked } : i)),
    );
    this.emitSelection();
  }

  private emitSelection() {
    const selectedItems = this._data().filter((item) => item.selected);
    this.selectionChange.emit(selectedItems);
  }
}
