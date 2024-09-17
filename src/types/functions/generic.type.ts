import { memo } from 'react'

export const genericMemo: <T>(component: T) => T = memo

export type Split<T> = keyof T extends infer Keys // turn on distributivity
  ? Keys extends PropertyKey
    ? Keys extends keyof T
      ? Keys
      : never
    : never
  : never
export type NonNullable<T> = T extends {} | undefined ? null : T
