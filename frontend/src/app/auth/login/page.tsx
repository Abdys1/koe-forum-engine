import LoginForm from "@/components/LoginForm/LoginForm";
import * as styles from "./login.css";

export default function LoginPage() {
    return (
        <div className={styles.page}>
            <LoginForm />
        </div>
    );
}
