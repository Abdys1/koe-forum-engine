'use client'

import clsx from "clsx";
import Link from "next/link";
import { useId, useLayoutEffect, useRef, useState } from "react";

import Button from "@/components/atoms/Button/Button";
import IconButton from "@/components/atoms/IconButton/IconButton";
import TextLink from "@/components/atoms/TextLink/TextLink";
import DropdownSelect from "@/components/molecules/DropdownSelect/DropdownSelect";
import { CharacterQuote } from "@/features/character/model/character";
import { MAX_QUOTE_LENGTH, toCharacterQuote } from "@/features/character/model/quote";
import { findLocation, locationHref, locations } from "@/features/forum/model/location";

import * as styles from "./QuoteSection.css";

type QuoteSectionProps = {
    quote?: CharacterQuote,
    canEdit: boolean,
    onSave: (quote: CharacterQuote) => void
}

const TITLE = "Róla mondták";
const locationOptions = locations.map(location => ({ value: location.id, label: location.name }));

const numberFormatter = new Intl.NumberFormat("hu-HU");

export default function QuoteSection({ quote, canEdit, onSave }: QuoteSectionProps) {
    const titleId = useId();
    const textId = useId();
    const locationLabelId = useId();
    const postNumberId = useId();
    const [isEditing, setIsEditing] = useState(false);
    const textRef = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useState("");
    const [locationId, setLocationId] = useState(locationOptions[0].value);
    const [postNumber, setPostNumber] = useState("");

    useLayoutEffect(() => {
        const textarea = textRef.current;
        if (!textarea) return;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight + textarea.offsetHeight - textarea.clientHeight}px`;
    }, [text, isEditing]);

    const draftQuote = toCharacterQuote({ text, locationId, postNumber });
    const savedLocation = quote && findLocation(quote.locationId);

    function startEditing(): void {
        setText(quote?.text ?? "");
        setLocationId(quote && findLocation(quote.locationId) ? quote.locationId : locationOptions[0].value);
        setPostNumber(quote ? String(quote.postNumber) : "");
        setIsEditing(true);
    }

    function save(): void {
        if (!draftQuote) return;
        onSave(draftQuote);
        setIsEditing(false);
    }

    return (
        <section className={styles.section} aria-labelledby={titleId}>
            <div className={styles.heading}>
                <h2 id={titleId} className={styles.title}>{TITLE}</h2>
                {canEdit && !isEditing && <IconButton icon="edit" label={`${TITLE} szerkesztése`} onClick={startEditing}/>}
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
                        <Button title="Mentés" variant="gold" size="small" type="submit" disabled={!draftQuote}/>
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
                                    <TextLink href={locationHref(quote.locationId)}>{savedLocation.name}</TextLink>
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
