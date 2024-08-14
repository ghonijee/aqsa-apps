export class Singleton {
  private static instances: { [key: string]: any } = {};

  public static getInstance<T>(key: string, factory: () => T): T {
    if (!Singleton.instances[key]) {
      Singleton.instances[key] = factory();
    }
    return Singleton.instances[key];
  }
}
