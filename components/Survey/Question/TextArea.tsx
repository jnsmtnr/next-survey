type Props = {
    answer: string,
    onChange: (value: string) => void
}

const TextArea = (props: Props) => {
    return (
        <div>
            <textarea 
                className="border w-full p-1 rounded"
                rows={4}
                value={props.answer || ''}
                onChange={(event) => props.onChange(event.target.value)} 
            />
        </div>
    )
}

export default TextArea