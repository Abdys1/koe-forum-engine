'use client'

import clsx from "clsx";
import Link from "next/link";
import { useId, useLayoutEffect, useRef, useState } from "react";
import Button from "@/components/Button/Button";
import EditButton from "@/components/EditButton/EditButton";
import DropdownSelect from "@/components/Inputs/DropdownSelect/DropdownSelect";
import { CharacterQuote } from "@/lib/character";
import { locations } from "@/dummydata/locations";
import { goldLink } from "@/styles/shared.css";
import * as styles from "./QuoteSection.css";

type QuoteSectionProps = {
    quote?: CharacterQuote,
    canEdit: boolean,
    onSave: (quote: CharacterQuote) => void
}

const TITLE = "Róla mondták";
const MAX_QUOTE_LENGTH = 300;

type LocationId = keyof typeof locations;

const locationOptions = (Object.keys(locations) as LocationId[]).map(id => ({ value: id, label: locations[id].name }));

const locationHref = (locationId: string) => `/roleplay-area/locations/${locationId}`;

const numberFormatter = new Intl.NumberFormat("hu-HU");

export default function QuoteSection({ quote, canEdit, onSave }: QuoteSectionProps) {
    const titleId = useId();
    const textId = useId();
    const locationLabelId = useId();
    const postNumberId = useId();
    const [isEditing, setIsEditing] = useState(false);
    const textRef = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useState("");
    const [locationId, setLocationId] = useState<LocationId>(locationOptions[0].value);
    const [postNumber, setPostNumber] = useState("");

    useLayoutEffect(() => {
        const textarea = textRef.current;
        if (!textarea) return;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight + textarea.offsetHeight - textarea.clientHeight}px`;
    }, [text, isEditing]);

    const parsedPostNumber = Number(postNumber);
    const canSave = !!text.trim() && !!locationId && Number.isInteger(parsedPostNumber) && parsedPostNumber > 0;
    const savedLocation = quote && locations[quote.locationId as LocationId];

    function startEditing(): void {
        setText(quote?.text ?? "");
        setLocationId(quote && quote.locationId in locations ? quote.locationId as LocationId : locationOptions[0].value);
        setPostNumber(quote ? String(quote.postNumber) : "");
        setIsEditing(true);
    }

    function save(): void {
        if (!canSave) return;
        onSave({ text: text.trim(), locationId, postNumber: parsedPostNumber });
        setIsEditing(false);
    }

    return (
        <section className={styles.section} aria-labelledby={titleId}>
            <div className={styles.heading}>
                <h2 id={titleId} className={styles.title}>{TITLE}</h2>
                {canEdit && !isEditing && <EditButton label={`${TITLE} szerkesztése`} onClick={startEditing}/>}
            </div>

            {isEditing
                ? <form className={styles.form} onSubmit={event => { event.preventDefault(); save(); }}
                        onKeyDown={event => event.key === "Escape" && setIsEditing(false)}>
                    <div className={styles.field}>
                        <label htmlFor={textId} className={styles.label}>Idézet</label>
                        <textarea ref={textRef} id={textId} className={clsx(styles.input, styles.quoteInput)} rows={2} autoFocus
                            maxLength={MAX_QUOTE_LENGTH} value={text} placeholder="Ide írhatod a karakterről szóló idézetet..."
                            onChange={event => setText(event.target.value)}/>
                        <span className={styles.counter}>
                            {numberFormatter.format(text.trim().length)} / max. {numberFormatter.format(MAX_QUOTE_LENGTH)} karakter
                        </span>
                    </div>
                    <div className={styles.sourceRow}>
                        <div className={clsx(styles.field, styles.locationField)}>
                            <span id={locationLabelId} className={styles.label}>Helyszín</span>
                            <DropdownSelect options={locationOptions} value={locationId} labelId={locationLabelId}
                                onChange={setLocationId} className={styles.locationSelect}/>
                        </div>
                        <div className={clsx(styles.field, styles.postNumberField)}>
                            <label htmlFor={postNumberId} className={styles.label}>Hozzászólás száma</label>
                            <input id={postNumberId} type="number" min={1} step={1} inputMode="numeric" className={clsx(styles.input, styles.sourceInput)}
                                value={postNumber} onChange={event => setPostNumber(event.target.value)}/>
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <Button title="Mégse" variant="ghost" size="small" onClick={() => setIsEditing(false)}/>
                        <Button title="Mentés" variant="gold" size="small" type="submit" disabled={!canSave}/>
                    </div>
                  </form>
                : quote
                    ? <figure className={styles.figure}>
                        <span className={styles.quoteMark} aria-hidden="true">„</span>
                        <blockquote className={styles.quote}>
                            <p>{quote.text}</p>
                        </blockquote>
                        <figcaption className={styles.source}>
                            {savedLocation
                                ? <>
                                    <Link href={locationHref(quote.locationId)} className={goldLink}>{savedLocation.name}</Link>
                                    #{quote.postNumber}
                                  </>
                                : <>#{quote.postNumber}</>
                            }
                        </figcaption>
                      </figure>
                    : <p className={styles.empty}>
                        Ide olyan rövid szöveg kerülhet, amit a játék során egy másik karakter mondott erről a karakterről.
                      </p>
            }
        </section>
    );
}
