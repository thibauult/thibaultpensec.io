import { PrismicRichText, useSinglePrismicDocument } from '@prismicio/react'
import Loader from './components'
import './Home.css';

function Home() {

  const [welcome, { state }] = useSinglePrismicDocument('welcome')

  return (

    <main className='App'>
      {state === 'loading' ? (<Loader/>) : 
        // @ts-ignore
        (welcome && <PrismicRichText field={welcome.data.intro} /> )
      }
    </main>
  )
}

export default Home
