


import Container from '@componentsL/Container'


import "@css/tailwindcss.css"
import Layout from '@componentsL/Layout'

import '@css/index.css'
import UrlListContainer from '@componentsUX/UrlList/UrlListContainer'
import FindUrlContainer from '@componentsUX/FindUrl/FindUrlContainer'
import CreateShortUrlContainer from '@componentsUX/CreateShortUrl/CreateShortUrlContainer'
import ToShortUrlContainer from '@componentsUX/ToShortUrl/ToShortUrlContainer'
import InfoShortUrlContainer from '@componentsUX/InfoShortUrl/InfoShortUrlContainer'




function App() {



  return (
    <Layout>
      <Container>
        <section className = 'flex flex-col items-center gap-3'>
          <UrlListContainer />
          <FindUrlContainer />
          <CreateShortUrlContainer />
          <ToShortUrlContainer />
          <InfoShortUrlContainer />
        </section>


      </Container>
    </Layout>
  )
}

export default App
