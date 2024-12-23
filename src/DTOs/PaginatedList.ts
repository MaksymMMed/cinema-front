export class PaginatedList<T> {
    items: T[];
    totalCount: number;
  
    constructor(items: T[], totalCount: number) {
      this.items = items;
      this.totalCount = totalCount;
    }
  }
  