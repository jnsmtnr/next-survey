type Props = {
    answer: number,
    min: number,
    max: number,
    onChange: (value: number) => void
}

const Scale = (props: Props) => {
    const values = Array(props.max - props.min + 1).fill(1).map((_, i) => i + props.min)

    return (
        <div className="flex">
            {values.map(value => (
                <div 
                    key={value}
                    className={"w-full text-center border border-r-0 last:border-r py-2 hover:bg-neutral-600 hover:text-white cursor-pointer" + (props.answer >= value ? " bg-neutral-700 text-white" : "")}
                    onClick={() => props.onChange(value)}
                >
                    {value}
                </div>
            ))}
        </div>
    )
}

export default Scale
