"use client"

import clsx from "clsx";
import { useId } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/Button/Button";
import * as styles from "./NewPostForm.css";

export interface NewPostInputs {
    gameTitle: string,
    content: string
}

export const MIN_CONTENT_LENGTH = 500;
export const MAX_CONTENT_LENGTH = 30000;

const numberFormatter = new Intl.NumberFormat("hu-HU");

type NewPostFormProps = {
    onSubmit: (inputs: NewPostInputs) => void
}

export default function NewPostForm({ onSubmit }: NewPostFormProps) {
    const gameTitleId = useId();
    const contentId = useId();
    const { register, handleSubmit, watch, reset } = useForm<NewPostInputs>({
        defaultValues: { gameTitle: "", content: "" }
    });

    const content = watch("content");
    const gameTitle = watch("gameTitle");
    const isContentLengthValid = content.length >= MIN_CONTENT_LENGTH && content.length <= MAX_CONTENT_LENGTH;
    const canSubmit = gameTitle.trim() !== "" && isContentLengthValid;

    const submit = (inputs: NewPostInputs) => {
        onSubmit(inputs);
        reset();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
            <h2 className={styles.title}>Új hozzászólás</h2>
            <div className={styles.field}>
                <label htmlFor={gameTitleId} className={styles.label}>Játék címe</label>
                <input id={gameTitleId} type="text" className={styles.input}
                    {...register("gameTitle", { required: true })} />
            </div>
            <div className={styles.field}>
                <label htmlFor={contentId} className={styles.label}>Hozzászólás</label>
                <textarea id={contentId} className={styles.textarea}
                    {...register("content", {
                        required: true,
                        minLength: MIN_CONTENT_LENGTH,
                        maxLength: MAX_CONTENT_LENGTH
                    })} />
                <span className={clsx(styles.counter, content.length > MAX_CONTENT_LENGTH && styles.counterInvalid)}>
                    {numberFormatter.format(content.length)} / {numberFormatter.format(MAX_CONTENT_LENGTH)} karakter
                    (min. {numberFormatter.format(MIN_CONTENT_LENGTH)})
                </span>
            </div>
            <div className={styles.actions}>
                <Button type="submit" variant="gold" title="Hozzászólás küldése" disabled={!canSubmit} />
            </div>
        </form>
    );
}
