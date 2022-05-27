import getClient from 'db/db'
import type { GetStaticProps, NextPage } from 'next'

import Welcome from 'components/Welcome/Welcome'

type Props = {
    surveys: { id: string, title: string }[]
}

const Home: NextPage<Props> = (props) => {
    return <Welcome surveys={props.surveys} />
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const client = getClient()

    try {
        await client.connect()

        const surveys = await client.db().collection('surveys').find().project({ _id: 1, title: 1 }).toArray()

        return {
            props: {
                surveys: surveys.map(survey => ({ id: survey._id.toString(), title: survey.title }))
            },
            revalidate: 60,
        }
    }
    catch (e: any) {
        return {
            props: {
                surveys: []
            }
        }
    }
    finally {
        client.close()
    }
}

export default Home
