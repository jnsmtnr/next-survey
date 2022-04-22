type Props = {
    answer: string,
    onChange: (value: string) => void
}

const Text = (props: Props) => {
    return (
        <div>
            <input 
                type="text" 
                className="border w-full p-1 rounded"
                value={props.answer || ''}
                onChange={(event) => props.onChange(event.target.value)} 
            />
        </div>
    )
}

export default Text