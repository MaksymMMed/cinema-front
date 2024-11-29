export class PaginatedPage<T> {
    items: T[]; // Масив елементів типу T
    totalCount: number; // Загальна кількість елементів
  
    constructor(items: T[], totalCount: number) {
      this.items = items;
      this.totalCount = totalCount;
    }
  }
  