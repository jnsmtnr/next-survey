import Head from "next/head";

type Props = {
    survey: {
        id: string,
        title: string,
        description: string
    }
}

const Survey = ({ survey }: Props) => {
    return (
        <>
            <Head>
                <title>{survey.title}</title>
            </Head>
            <div className="min-h-screen p-4 bg-gray-200 flex flex-col items-center">
                <div className="bg-white p-2 max-w-3xl w-full flex-grow shadow rounded">
                    <div className="text-center">
                        <h1 className="text-xl">{survey.title}</h1>
                        <h2>{survey.description}</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Survey