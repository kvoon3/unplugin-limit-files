export interface Options {
  path: string
  limit?: number
  customFilter?: (fileName: string) => boolean
}
