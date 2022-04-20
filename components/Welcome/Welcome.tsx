import Head from 'next/head'
import AvailableSurveys from 'components/Welcome/AvailableSurveys'

type Props = {
    surveys: { id: string, title: string }[]
}

const Welcome = (props: Props) => {
    return (
        <>
            <Head>
                <title>Next Survey</title>
            </Head>
            <div className='flex flex-col h-screen justify-center items-center space-y-4'>
                <div className='text-xl'>Welcome</div>
                <AvailableSurveys surveys={props.surveys} />
            </div>
        </>
    )
}

export default Welcome