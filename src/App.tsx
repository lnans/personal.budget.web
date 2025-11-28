import { Button } from '@/components/ui/Button'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  console.log('API URL:', import.meta.env.VITE_API_URL)

  return (
    <>
      <h1>Vite + React</h1>
      <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
    </>
  )
}

export default App
