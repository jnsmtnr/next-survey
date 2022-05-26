import { ChangeEvent } from "react"

interface Props {
    answer: string,
    options: { [id: string]: string },
    onChange: (value: string) => void
}

const SingleChoice = (props: Props) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.value)
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
                        type="radio" 
                        value={id} 
                        checked={id === props.answer} 
                        onChange={onChangeHandler}
                    />
                    <span>{label}</span>
                </label>
            ))}
        </div>
    )
}

export default SingleChoice