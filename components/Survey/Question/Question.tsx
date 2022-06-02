import { QuestionProps, QuestionType } from "types/types"

import Text from './Text'
import TextArea from './TextArea'
import SingleChoice from './SingleChoice'
import MultipleChoice from "./MultipleChoice"
import Scale from "./Scale"

type Props = {
    question: QuestionProps,
    answer: any,
    onChange: (value: any) => void
}

const Question = (props: Props) => {
    return (
        <div>
            <h1 className="mb-2">{props.question.title}</h1>
            {props.question.type === QuestionType.Text && <Text answer={props.answer} onChange={props.onChange} />}
            {props.question.type === QuestionType.TextArea && <TextArea answer={props.answer} onChange={props.onChange} />}
            {props.question.type === QuestionType.SingleChoice && <SingleChoice options={props.question.options || {}} answer={props.answer} onChange={props.onChange} />}
            {props.question.type === QuestionType.MultipleChoice && <MultipleChoice options={props.question.options || {}} answer={props.answer || []} onChange={props.onChange} />}
            {props.question.type === QuestionType.Scale && <Scale answer={props.answer} min={props.question.min!} max={props.question.max!} onChange={props.onChange} />}
        </div>
    )
}

export default Question
