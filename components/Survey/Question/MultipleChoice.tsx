import { ChangeEvent } from "react"

interface Props {
    answer: Array<string>,
    options: { [id: string]: string },
    onChange: (value: Array<string>) => void
}

const MultipleChoice = (props: Props) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (props.answer.includes(event.target.value)) {
            props.onChange(props.answer.filter(a => a !== event.target.value))
        } else {
            props.onChange([...props.answer, event.target.value])
        }
    }

    return (
        <div>
            {Object.entries(props.options).map(([id, label]) => (
                <label 
                    key={id} 
                    className="block space-x-2 pl-2 cursor-pointer"
                >
                    <input 
                        className="cursor-pointer"
                        type="checkbox" 
                        value={id} 
                        checked={props.answer.includes(id)} 
                        onChange={onChangeHandler}
                    />
                    <span>{label}</span>
                </label>
            ))}
        </div>
    )
}

export default MultipleChoice
