import clsx from "clsx";

type IconProps = {
    name: string,
    className?: string
}

export default function Icon({ name, className }: IconProps) {
    return <span className={clsx("material-icons", className)} aria-hidden="true">{name}</span>;
}
