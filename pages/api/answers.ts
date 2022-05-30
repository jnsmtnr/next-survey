import { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"

import getClient from 'db/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'OPTIONS') return res.status(200).json({ body: "OK" })

    if (req.method !== 'POST') return res.status(404).send('not found')

    if (
        !req.body ||
        typeof req.body !== "object" ||
        !req.body.id ||
        typeof req.body.id !== 'string' ||
        !(req.body.id.length === 12 || req.body.id.length === 24) ||
        !req.body.answers ||
        typeof req.body.answers !== 'object'
    ) {
        return res.status(400).send('not valid')
    }

    let surveyId

    try {
        surveyId = new ObjectId(req.body.id)
    } catch {
        return res.status(400).send('id not valid')
    }

    const client = getClient()

    try {
        await client.connect()

        const surveys = client.db('next-survey').collection('surveys')

        const survey = await surveys.findOne({ _id: surveyId })

        if (!survey) {
            return res.status(404).send('survey not found')
        }

        const parsedAnswers = Object.keys(survey.questions).reduce<{ [id: string]: any }>((answers, questionId) => {
            answers[questionId] = req.body.answers[questionId]

            return answers
        }, {})

        const answers = client.db('next-survey').collection('answers')

        await answers.insertOne({ surveyId: req.body.id, answers: parsedAnswers })

        res.status(201).send('thank you')
    } catch (e) {
        res.status(500).send('something went wrong')
    } finally {
        client.close()
    }
}

export default handler