import { GetServerSideProps } from "next"
import { ObjectId } from 'mongodb'
import getClient from "db/db";

import Survey from 'components/Survey/Survey';
import NotFound from 'components/Survey/NotFound'

type Props = {
    survey?: {
        id: string,
        title: string,
        description: string
    },
    error?: {
        message: string
    },
}

const SurveyPage = ({ survey }: Props) => {
    if (survey) return <Survey survey={survey} />
    
    return <NotFound />
}

export default SurveyPage

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const id = context.params!.id as string

    const client = getClient()

    try {
        await client.connect()

        const surveys = client.db('next-survey').collection('surveys')

        const survey = await surveys.findOne({ _id: new ObjectId(id) })

        if (!survey) {
            throw new Error('Survey not found');
        }

        return {
            props: { 
                survey: {
                    id: survey._id.toString(),
                    title: survey.title,
                    description: survey.description
                },
            }
        }
    } catch(e: any) {
        return { 
            props: { 
                error: {
                    message: e.message
                }
            } 
        }
    } finally {
        client.close()
    }
}