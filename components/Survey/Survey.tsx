import Head from "next/head";
import { useState, useMemo } from "react";
import { SurveyProps } from "types/types";
import Question from "./Question/Question";
import ThankYou from "./ThankYou";

type Props = {
    survey: SurveyProps
}

const Survey = ({ survey }: Props) => {
    const [answers, setAnswers] = useState<{ [id: string]: any }>({})
    const [finished, setFinished] = useState(false)
    const [sending, setSending] = useState(false)

    const onChangeHandler = (id: string, value: any) => {
        setAnswers((prev) => ({
            ...prev,
            [id]: value
        }));
    }

    const orderedQuestions = useMemo(() => Object.entries(survey.questions)
        .map(([id, question]) => ({
            id,
            ...question
        }))
        .sort((a,b) => a.order - b.order)
    , [survey])

    const sendAnswers = () => {
        setSending(true)

        fetch('/api/answers', {
            method: 'POST',
            body: JSON.stringify({
                id: survey.id,
                answers
            }),
            headers: {
                'Content-Type': 'application/json'
              },
        })
            .then(response => {
            if (response.ok) {
                setFinished(true)
            }
        })
            .catch(error => console.log(error))
            .finally(() => setSending(false))
    }

    return (
        <>
            <Head>
                <title>{survey.title}</title>
            </Head>
            <div className="min-h-screen p-4 bg-gray-200 flex flex-col items-center">
                <div className="bg-white p-2 max-w-3xl w-full flex-grow shadow rounded flex flex-col">
                    <div className="text-center">
                        <h1 className="text-xl">{survey.title}</h1>
                        <h2>{survey.description}</h2>
                    </div>
                    {!finished && (
                        <>
                            <div className="mt-8 space-y-8">
                                {orderedQuestions.map(q => (
                                    <Question
                                        key={q.id} 
                                        question={q} 
                                        answer={answers[q.id]} 
                                        onChange={(value) => onChangeHandler(q.id, value)} 
                                    />
                                    )
                                )}
                            </div>
                            <div className="mt-8 flex-grow flex flex-col justify-end items-center">
                                <button 
                                    className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-4 rounded-full" 
                                    onClick={sendAnswers}
                                    disabled={sending}
                                >
                                    { sending ? 'Sending' : 'Send' }
                                </button>
                            </div>
                        </>
                    )}
                    {finished && (
                        <div className="flex-grow flex justify-center items-center">
                            <ThankYou />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Survey