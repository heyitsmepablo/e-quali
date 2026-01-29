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
import { Checkbox } from '../inputs/checkbox/checkbox'; // Verifique o caminho

export interface TableColumn {
  label: string;
  sortable?: boolean;
  class?: string;
}

@Component({
  selector: 'app-table',
  imports: [CommonModule, FormsModule, Checkbox],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input({ required: true }) columns: TableColumn[] = [];

  @Input({ required: true }) set data(value: any[]) {
    // Ao receber novos dados, preservamos a seleção se os objetos forem os mesmos,
    // ou resetamos se preferir. Aqui estou resetando a paginação.
    this._data.set(value);
    this.currentPage.set(1);
  }
  id = input<string>(`table-${Math.random().toString(36).substr(2, 9)}`);
  selectionMode = input<'checkbox' | 'none'>('none');
  selectionChange = output<any[]>();
  _data = signal<any[]>([]);

  @ContentChild(TemplateRef) rowTemplate!: TemplateRef<any>;
  search = output<string>();

  // --- LÓGICA DE PAGINAÇÃO ---
  currentPage = signal(1);
  pageSize = signal(5);

  totalItems = computed(() => this._data().length);

  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this._data().slice(start, end);
  });

  startIndex = computed(() => (this.currentPage() - 1) * this.pageSize());
  endIndex = computed(() => Math.min(this.startIndex() + this.pageSize(), this.totalItems()));

  rowClick = output<any>();

  nextPage() {
    if (this.endIndex() < this.totalItems()) {
      this.currentPage.update((p) => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
    }
  }

  changePageSize(size: number) {
    this.pageSize.set(Number(size));
    this.currentPage.set(1);
  }

  // --- LÓGICA DE SELEÇÃO (CHECKBOX) ---

  // 1. Todos estão selecionados?
  allSelected = computed(() => {
    const data = this._data();
    return data.length > 0 && data.every((u) => u.selected);
  });

  // 2. Estado Indeterminado (Alguns selecionados, mas não todos)
  indeterminate = computed(() => {
    const data = this._data();
    const count = data.filter((u) => u.selected).length;
    return count > 0 && count < data.length;
  });

  toggleAll(isChecked: boolean) {
    // Atualiza os dados
    this._data.update((items) => items.map((i) => ({ ...i, selected: isChecked })));

    // Avisa o pai
    this.emitSelection();
  }

  toggleOne(item: any, isChecked: boolean) {
    // Atualiza os dados
    this._data.update((items) =>
      items.map((i) => (i === item ? { ...i, selected: isChecked } : i)),
    );

    // Avisa o pai
    this.emitSelection();
  }

  // Método auxiliar privado para filtrar e emitir
  private emitSelection() {
    const selectedItems = this._data().filter((item) => item.selected);
    this.selectionChange.emit(selectedItems);
  }
}
