import { Grid } from './components/grid'
import { Pieces } from './components/pieces'
import { PuzzleProvider } from './context/puzzle-context'

function App() {
  return (
    <main className='bg-[#FBFFF5] py-24 px-8 min-h-screen grid place-items-center text-center'>

      <div>
        <h1 className="font-hegarty text-3xl">Quebra-cabeça</h1>

        <div className='flex gap-4 my-12'>
          <PuzzleProvider >
            <Grid />
            <Pieces />
          </PuzzleProvider>
        </div>

      </div>
    </main>
  )
}

export default App
