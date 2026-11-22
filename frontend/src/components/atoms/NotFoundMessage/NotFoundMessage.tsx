import * as styles from "./NotFoundMessage.css";

type NotFoundMessageProps = {
    message: string
}

export default function NotFoundMessage({ message }: NotFoundMessageProps) {
    return <h1 className={styles.notFound}>{message}</h1>;
}
