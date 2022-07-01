type InfiniteData<TData> = {
  data: TData[]
  nextCursor?: number
}

export default InfiniteData
