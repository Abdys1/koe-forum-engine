type StepHeadingProps = {
    title: string
}

export default function StepHeading(props: StepHeadingProps) {
    return (
        <h2 className="relative py-2 px-5 w-full flex justify-start items-center text-secondary font-poppins text-2xl font-semibold tracking-widest">
            {props.title}
        </h2>
    );
}