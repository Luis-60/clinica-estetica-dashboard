export default class FormBuilder {
  private data: Map<string, any>;

  constructor(initialData: Record<string, any> = {}) {
    this.data = new Map();

    for (const key in initialData) {
      if (Object.prototype.hasOwnProperty.call(initialData, key)) {
        this.append(key, initialData[key]);
      }
    }
  }

  append(key: string, value: any): void {
    this.data.set(key, value);
  }

  get(key: string): any {
    return this.data.get(key);
  }

  has(key: string): boolean {
    return this.data.has(key);
  }

  delete(key: string): void {
    this.data.delete(key);
  }

  entries(): IterableIterator<[string, any]> {
    return this.data.entries();
  }

  toFormData(): FormData {
    const realFormData = new FormData();
    for (const [key, value] of this.data.entries()) {
      realFormData.append(key, value);
    }
    return realFormData;
  }

  [Symbol.iterator](): IterableIterator<[string, any]> {
    return this.data.entries();
  }
}
