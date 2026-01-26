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
  class?: string; // Para alinhar texto (text-right, text-center) ou definir largura
}

@Component({
  selector: 'app-table',
  imports: [CommonModule, FormsModule, Checkbox],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input({ required: true }) columns: TableColumn[] = [];

  // O set é interceptado para resetar a página quando os dados mudam (ex: busca)
  @Input({ required: true }) set data(value: any[]) {
    this._data.set(value);
    this.currentPage.set(1); // Resetar para página 1 se filtrar
  }

  // Signal privado para os dados brutos
  _data = signal<any[]>([]);

  @ContentChild(TemplateRef) rowTemplate!: TemplateRef<any>;
  search = output<string>();

  // --- LÓGICA DE PAGINAÇÃO ---
  currentPage = signal(1);
  pageSize = signal(5);

  // Computed: Total de itens
  totalItems = computed(() => this._data().length);

  // Computed: Fatia os dados para mostrar só a página atual
  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this._data().slice(start, end);
  });

  // Auxiliares para mostrar "1-5 of 10"
  startIndex = computed(() => (this.currentPage() - 1) * this.pageSize());
  endIndex = computed(() => Math.min(this.startIndex() + this.pageSize(), this.totalItems()));

  // Ações de Paginação
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

  // --- LÓGICA EXISTENTE ---
  allSelected = computed(() => this._data().length > 0 && this._data().every((u) => u.selected));

  toggleAll(event: any) {
    const isChecked = event.target.checked;
    this._data.update((items) => items.map((i) => ({ ...i, selected: isChecked })));
  }

  toggleOne(item: any) {
    this._data.update((items) =>
      items.map((i) => (i === item ? { ...i, selected: !i.selected } : i)),
    );
  }
}
