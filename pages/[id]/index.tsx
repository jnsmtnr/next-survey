import { GetStaticProps, GetStaticPaths, NextPage } from "next"
import { ObjectId } from 'mongodb'
import getClient from "db/db";

import Survey from 'components/Survey/Survey';
import NotFound from 'components/Survey/NotFound'

import { SurveyProps } from 'types/types'

type Props = {
    survey?: SurveyProps,
    error?: {
        message: string
    },
}

const SurveyPage: NextPage<Props> = ({ survey }) => {
    if (survey) return <Survey survey={survey} />
    
    return <NotFound />
}

export default SurveyPage

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (context) => {
    const id = context.params!.id

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
                    description: survey.description,
                    questions: survey.questions || []
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

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
    const client = getClient()

    try {
        await client.connect()

        const surveys = await client.db().collection('surveys').find().project({ _id: 1 }).toArray()

        return {
            paths: surveys.map(survey => ({ params: { id: survey._id.toString() }})),
            fallback: false
        }
    }
    catch (e: any) {
        return {
            paths: [],
            fallback: false
        }
    }
    finally {
        client.close()
    }
}
