import { QuestionProps, QuestionType } from "types/types"

import Text from './Text'
import TextArea from './TextArea'

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
        </div>
    )
}

export default Question