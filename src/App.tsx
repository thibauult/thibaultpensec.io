import { PrismicRichText, useSinglePrismicDocument } from '@prismicio/react'
import './App.css';

function App() {

  const [welcome, { state }] = useSinglePrismicDocument('welcome')

  return (
    <main>
      {state === 'loading' ? 
        (<p>Loading…</p>) : 
        // @ts-ignore
        (welcome && <PrismicRichText field={welcome.data.intro} /> ) 
      }
    </main>
  )
}

export default App
