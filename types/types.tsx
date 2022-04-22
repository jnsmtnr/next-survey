export type SurveyProps = {
    id: string,
    title: string,
    description: string,
    questions: {
        [id: string]: QuestionProps
    }
}

export type QuestionProps = {
    type: QuestionType,
    title: string,
}

export enum QuestionType {
    Text = 1,
}