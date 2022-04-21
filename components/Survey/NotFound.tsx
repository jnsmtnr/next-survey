import Head from "next/head"

const NotFound = () => {
    return (
        <>
            <Head>
                <title>Survey not found</title>
            </Head>
            <div className="h-screen flex justify-center items-center">
                Survey not found
            </div>
        </>
    )
}

export default NotFound