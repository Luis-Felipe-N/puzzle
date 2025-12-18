import './App.css'
import { Grid } from './components/grid'
import { Pieces } from './components/pieces'
import { PuzzleProvider } from './context/puzzle-context'

function App() {

  return (
    <div>
      <h1>Quebra-cabeça</h1>
      <form >
        <div>
          <label htmlFor="imageUpload">Upload Image:</label>
          <input type="file" id="imageUpload" name="imageUpload" accept="image/*" />
        </div>
        <button>Gerar quebra-cabeça</button>
      </form>
      <div className='flex gap-4'>
        <PuzzleProvider >
          <Grid imageWidth={441} imageHeight={668} />
          <Pieces />
        </PuzzleProvider>
      </div>
    </div>
  )
}

export default App
