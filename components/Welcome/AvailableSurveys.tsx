import Link from 'next/link'

type Props = {
    surveys: { id: string, title: string }[]
}

const AvailableSurveys = (props: Props) => {
    return (
        <ul className='text-center'>
            {props.surveys.map((survey) => (
                <li key={survey.id}>
                    <Link href={"/" + survey.id}>{survey.title}</Link>
                </li>
            ))}
        </ul>
    )
}

export default AvailableSurveys