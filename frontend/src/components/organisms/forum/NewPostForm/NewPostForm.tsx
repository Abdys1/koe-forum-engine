"use client"

import clsx from "clsx";
import { useId } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/atoms/Button/Button";
import { canSubmitNewPost, NewPostInput, POST_CONTENT_MAX_LENGTH, POST_CONTENT_MIN_LENGTH } from "@/features/forum/model/post";

import * as styles from "./NewPostForm.css";

const numberFormatter = new Intl.NumberFormat("hu-HU");

type NewPostFormProps = {
    onSubmit: (inputs: NewPostInput) => void
}

export default function NewPostForm({ onSubmit }: NewPostFormProps) {
    const gameTitleId = useId();
    const contentId = useId();
    const { register, handleSubmit, watch, reset } = useForm<NewPostInput>({
        defaultValues: { gameTitle: "", content: "" }
    });

    const content = watch("content");
    const gameTitle = watch("gameTitle");
    const canSubmit = canSubmitNewPost({ gameTitle, content });

    const submit = (inputs: NewPostInput) => {
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
                        minLength: POST_CONTENT_MIN_LENGTH,
                        maxLength: POST_CONTENT_MAX_LENGTH
                    })} />
                <span className={clsx(styles.counter, content.length > POST_CONTENT_MAX_LENGTH && styles.counterInvalid)}>
                    {numberFormatter.format(content.length)} / {numberFormatter.format(POST_CONTENT_MAX_LENGTH)} karakter
                    (min. {numberFormatter.format(POST_CONTENT_MIN_LENGTH)})
                </span>
            </div>
            <div className={styles.actions}>
                <Button type="submit" variant="gold" title="Hozzászólás küldése" disabled={!canSubmit} />
            </div>
        </form>
    );
}
