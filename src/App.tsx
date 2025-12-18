import { useState } from 'react'
import './App.css'
import { Grid } from './components/grid'
import { Pieces } from './components/pieces'

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
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
        <Grid imageWidth={441} imageHeight={668} />
        <Pieces imageWidth={441} imageHeight={668} />
      </div>
    </div>
  )
}

export default App
