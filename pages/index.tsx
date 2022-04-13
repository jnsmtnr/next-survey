import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Next Survey</title>
      </Head>
      <div className='flex h-screen justify-center items-center'>
          <div>Welcome</div>
      </div>
    </>
  )
}

export default Home
