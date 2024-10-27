import CreateCharacterForm from "@/components/multi-step-form/create-character-form/CreateCharacterForm";

export default function CharacterCreatePage() {
    return (
        <>
            <section className="relative m-0 p-0 box-border w-full min-h-screen flex bg-blackBg">
                <CreateCharacterForm />
            </section>
        </>
    );
};