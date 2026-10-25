'use client'

import clsx from "clsx";
import { useId, useState } from "react";
import Button from "@/components/Button/Button";
import { heading, headingAction, headingTitle } from "@/components/CharacterSheet/sheetHeading.css";
import EditButton from "@/components/EditButton/EditButton";
import * as styles from "./EditableTextSection.css";

const numberFormatter = new Intl.NumberFormat("hu-HU");

type EditableTextSectionProps = {
    title: string,
    value?: string,
    emptyText: string,
    info?: string,
    editHint?: string,
    minLength?: number,
    canEdit: boolean,
    onSave: (value: string) => void,
    className?: string
}

export default function EditableTextSection({ title, value, emptyText, info, editHint, minLength = 0, canEdit, onSave, className }: EditableTextSectionProps) {
    const titleId = useId();
    const hintId = useId();
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState("");
    const draftLength = draft.trim().length;
    const isTooShort = draftLength < minLength;
    const paragraphs = value?.trim() ? value.trim().split(/\n\s*\n/) : [];

    function startEditing(): void {
        setDraft(value ?? "");
        setIsEditing(true);
    }

    function save(): void {
        if (isTooShort) return;
        onSave(draft.trim());
        setIsEditing(false);
    }

    return (
        <section className={className} aria-labelledby={titleId}>
            <div className={heading}>
                <h2 id={titleId} className={headingTitle}>{title}</h2>
                {canEdit && !isEditing &&
                    <span className={headingAction}>
                        <EditButton label={`${title} szerkesztése`} onClick={startEditing}/>
                    </span>
                }
            </div>
            {info &&
                <p className={styles.info}>
                    <span className={clsx("material-icons", styles.infoIcon)} aria-hidden="true">lock</span>
                    {info}
                </p>
            }
            {isEditing
                ? <form className={styles.form} onSubmit={event => { event.preventDefault(); save(); }}>
                    {editHint && <p id={hintId} className={styles.editHint}>{editHint}</p>}
                    <textarea className={styles.textarea} value={draft} aria-labelledby={titleId} autoFocus
                        aria-describedby={editHint ? hintId : undefined}
                        onChange={event => setDraft(event.target.value)}
                        onKeyDown={event => event.key === "Escape" && setIsEditing(false)}/>
                    <div className={styles.actions}>
                        {minLength > 0 &&
                            <span className={clsx(styles.counter, !isTooShort && styles.counterValid)}>
                                {numberFormatter.format(draftLength)} / min. {numberFormatter.format(minLength)} karakter
                            </span>
                        }
                        <Button title="Mégse" variant="ghost" size="small" onClick={() => setIsEditing(false)}/>
                        <Button title="Mentés" variant="gold" size="small" type="submit" disabled={isTooShort}/>
                    </div>
                  </form>
                : paragraphs.length > 0
                    ? <div className={styles.body}>
                        {paragraphs.map((paragraph, index) => <p key={index} className={styles.paragraph}>{paragraph}</p>)}
                      </div>
                    : <p className={styles.empty}>{emptyText}</p>
            }
        </section>
    );
}
