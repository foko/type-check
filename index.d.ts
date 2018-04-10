/**
 * @file index.d.ts
 * @copyright 2018-present Foko Inc. All rights reserved.
 */

declare module '@foko/type-check' {
  export function typeCheck(
    type: string,
    value: any
  ): void

  export function typeOf(
    value: any
  ): string
}
