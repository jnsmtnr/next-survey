import { GetServerSideProps } from "next"
import { MongoClient, ObjectId } from 'mongodb'

import Survey from 'components/Survey/Survey';

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
    return (
        <div className="min-h-screen p-4 bg-gray-200 flex flex-col items-center">
            <Survey survey={survey!} />
        </div>
    )
}

export default SurveyPage

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const id = context.params!.id as string

    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.zwaeg.mongodb.net/next-survey?retryWrites=true&w=majority`)

    try {
        await client.connect()

        const surveys = client.db('next-survey').collection('surveys')

        const survey = await surveys.findOne({ _id: new ObjectId(id) })

        if (!survey) {
            throw new Error('nem nyert');
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
                error: e.message
            } 
        }
    } finally {
        client.close()
    }
}