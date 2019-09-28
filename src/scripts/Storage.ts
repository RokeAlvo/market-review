export class Storage {
  private storage: any[];
  constructor() {
    this.storage = [];
  }

  add(obj) {
    this.storage.push(...obj);
  }
}
