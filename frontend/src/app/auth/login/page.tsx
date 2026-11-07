import BackgroundSlideshow from "@/components/Home/BackgroundSlideshow/BackgroundSlideshow";
import LoginForm from "@/components/LoginForm/LoginForm";
import { heroSlides } from "@/dummydata/homepage";
import * as styles from "./login.css";

type LoginPageProps = {
    searchParams: { callbackUrl?: string | string[] }
}

export default function LoginPage({ searchParams }: LoginPageProps) {
    const callbackUrl = typeof searchParams.callbackUrl === "string" ? searchParams.callbackUrl : undefined;

    return (
        <main className={styles.page}>
            <BackgroundSlideshow slides={heroSlides} />
            <div className={styles.centerVeil} />
            <div className={styles.content}>
                <span className={styles.siteName}>Gloamfall</span>
                <h1 className={styles.title}>Bejelentkezés</h1>
                <p className={styles.lead}>Lépj be, és folytasd a történetet ott, ahol abbahagytad.</p>
                <div className={styles.card}>
                    <LoginForm callbackUrl={callbackUrl} />
                </div>
            </div>
        </main>
    );
}
