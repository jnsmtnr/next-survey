type Props = {
    survey: {
        id: string,
        title: string,
        description: string
    }
}

const Survey = ({ survey }: Props) => {
    return (
        <div className="bg-white p-2 max-w-3xl w-full flex-grow shadow rounded">
            <div className="text-center">
                <h1 className="text-xl">{survey.title}</h1>
                <h2>{survey.description}</h2>
            </div>
        </div>
    )
}

export default Survey