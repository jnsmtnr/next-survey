export type SurveyProps = {
    id: string,
    title: string,
    description: string,
    questions: {
        [id: string]: QuestionProps
    },
}

export type QuestionProps = {
    type: QuestionType,
    title: string,
    order: number,
    page: number,
    options?: {
        [id: string]: string
    },
    min?: number,
    max?: number,
}

export enum QuestionType {
    Text = 1,
    TextArea,
    SingleChoice,
    MultipleChoice,
    Scale,
}