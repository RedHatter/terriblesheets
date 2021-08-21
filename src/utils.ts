export type ChangeEvent = Event & { currentTarget: EventTarget & HTMLInputElement }

export function mapObjectValues<T,V>(obj: T, fn: (val: any) => V): Record<keyof T,V> {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)])) as Record<keyof T,V>
}

export function capitalize(s: string) {
  return s[0].toUpperCase() + s.substring(1)
}