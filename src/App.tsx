import { Button } from '@/components/ui/Button'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <h1>Vite + React</h1>
      <h1>API: {import.meta.env.VITE_API_URL}</h1>
      <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
    </>
  )
}

export default App
