import Image from "next/image";
import * as styles from "./Title.css";

export default function Title({ subTitle, mainTitle }: { subTitle: string, mainTitle: string }) {
    return (
        <div className={styles.container}>
            <Image className={styles.logo} src="/images/logo.png" alt="bölcsek köve szimbólum, a játék logója" width={120} height={120} />
            <h3 className={styles.subTitle}>{subTitle}</h3>
            <h2 className={styles.mainTitle}>{mainTitle}</h2>
        </div>
    )
}
