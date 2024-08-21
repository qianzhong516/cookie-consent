class Storage {
  static getItem(key: string) {
    const item = window.localStorage.getItem(key);
    return item == null ? item : JSON.parse(item);
  }

  static setItem(key: string, value: unknown) {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  }
}

export default Storage;
