import { useState } from 'react'
import Routing from './routes/Routing'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Routing />
    </>
  )
}

export default App
