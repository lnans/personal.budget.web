export type InfiniteData<TData> = {
  data: TData[]
  nextCursor?: number
}
