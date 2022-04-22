import Head from "next/head";
import { useState } from "react";
import { SurveyProps } from "types/types";
import Question from "./Question/Question";

type Props = {
    survey: SurveyProps
}

const Survey = ({ survey }: Props) => {
    const [answers, setAnswers] = useState<{ [id: string]: any }>({})

    const onChangeHandler = (id: string, value: any) => {
        setAnswers((prev) => ({
            ...prev,
            [id]: value
        }));
    }

    return (
        <>
            <Head>
                <title>{survey.title}</title>
            </Head>
            <div className="min-h-screen p-4 bg-gray-200 flex flex-col items-center">
                <div className="bg-white p-2 max-w-3xl w-full flex-grow shadow rounded">
                    <div className="text-center">
                        <h1 className="text-xl">{survey.title}</h1>
                        <h2>{survey.description}</h2>
                    </div>
                    <div className="mt-8 space-y-8">
                        {Object.entries(survey.questions).map(([id, q]) => (
                            <Question 
                                key={id} 
                                question={q} 
                                answer={answers[id]} 
                                onChange={(value) => onChangeHandler(id, value)} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Survey