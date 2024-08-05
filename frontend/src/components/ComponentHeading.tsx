type ComponentHeadingProps = {
    title: string
}

export default function ComponentHeading(props: ComponentHeadingProps) {
    return (
        <h1 className="relative w-full mb-2 text-secondaryLight font-poppins font-medium text-start text-xl uppercase tracking-widest">
            {props.title}
        </h1>
    );
}