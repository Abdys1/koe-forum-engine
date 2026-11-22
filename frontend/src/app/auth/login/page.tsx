import LoginForm from "@/components/organisms/auth/LoginForm/LoginForm";
import AuthTemplate from "@/components/templates/AuthTemplate/AuthTemplate";
import { getHeroSlides } from "@/features/home/queries/getHomePage";

type LoginPageProps = {
    searchParams: { callbackUrl?: string | string[] }
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const callbackUrl = typeof searchParams.callbackUrl === "string" ? searchParams.callbackUrl : undefined;
    const slides = await getHeroSlides();

    return (
        <AuthTemplate slides={slides} title="Bejelentkezés" lead="Lépj be, és folytasd a történetet ott, ahol abbahagytad.">
            <LoginForm callbackUrl={callbackUrl} />
        </AuthTemplate>
    );
}
