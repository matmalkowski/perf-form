class Observable {
  private listeners: Array<Function>;

  constructor() {
    this.listeners = [];
  }

  public subscribe(fc: Function) {
    this.listeners.push(fc);
  }

  public unsubscribe(fc: Function) {
    this.listeners = this.listeners.filter(subscriber => subscriber !== fc);
  }

  public notify() {
    this.listeners.forEach(listener => listener());
  }
}

export default Observable;
