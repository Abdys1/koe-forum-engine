"use client"

import Button from "@/components/Button/Button";
import CharacterRaceBtn from "@/components/MultiStepForm/CreateCharacterForm/CharacterRaceBtn/CharacterRaceBtn";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import { useMultiStepFormContext } from "@/components/MultiStepForm/MultiStepFormContext";
import { findRace, races, SelectableRace } from "@/dummydata/races";
import * as styles from "./CharacterRaceStep.css";

const DRAG_THRESHOLD = 5;
const SCROLL_EDGE_TOLERANCE = 1;

export default function CharacterRaceStep() {
    const formContext = useMultiStepFormContext();
    const { register, getValues, setValue } = formContext.form;

    const [selectedRace, setSelectedRace] = useState<SelectableRace>(findRace(getValues("raceId")));
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const trackRef = useRef<HTMLUListElement>(null);
    const raceBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const dragState = useRef({ pointerId: -1, startX: 0, startScrollLeft: 0, moved: false });
    const [isDragging, setIsDragging] = useState(false);

    const updateScrollState = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;
        setCanScrollPrev(track.scrollLeft > SCROLL_EDGE_TOLERANCE);
        setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - SCROLL_EDGE_TOLERANCE);
    }, []);

    useEffect(() => {
        updateScrollState();
        window.addEventListener("resize", updateScrollState);
        return () => window.removeEventListener("resize", updateScrollState);
    }, [updateScrollState]);

    useEffect(() => {
        raceBtnRefs.current[selectedRace.id]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }, [selectedRace]);

    function selectRace(race: SelectableRace): void {
        setSelectedRace(race);
        setValue("raceId", race.id);
        setValue("raceTitle", race.title);
    }

    function scrollTrack(direction: 1 | -1): void {
        const track = trackRef.current;
        if (!track) return;
        track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
    }

    function handlePointerDown(event: React.PointerEvent<HTMLUListElement>): void {
        if (event.pointerType !== "mouse" || event.button !== 0 || !trackRef.current) return;
        dragState.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startScrollLeft: trackRef.current.scrollLeft,
            moved: false
        };
    }

    function handlePointerMove(event: React.PointerEvent<HTMLUListElement>): void {
        const drag = dragState.current;
        const track = trackRef.current;
        if (drag.pointerId !== event.pointerId || !track) return;
        const deltaX = event.clientX - drag.startX;
        if (!drag.moved && Math.abs(deltaX) > DRAG_THRESHOLD) {
            drag.moved = true;
            track.setPointerCapture(event.pointerId);
            setIsDragging(true);
        }
        if (drag.moved) {
            track.scrollLeft = drag.startScrollLeft - deltaX;
        }
    }

    function handlePointerEnd(event: React.PointerEvent<HTMLUListElement>): void {
        if (dragState.current.pointerId !== event.pointerId) return;
        dragState.current.pointerId = -1;
        setIsDragging(false);
    }

    function handleClickCapture(event: React.MouseEvent<HTMLUListElement>): void {
        if (!dragState.current.moved) return;
        event.preventDefault();
        event.stopPropagation();
        dragState.current.moved = false;
    }

    function handleTrackKeyDown(event: React.KeyboardEvent<HTMLUListElement>): void {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        const step = event.key === "ArrowRight" ? 1 : -1;
        const index = races.findIndex(race => race.id === selectedRace.id);
        const nextRace = races[(index + step + races.length) % races.length];
        selectRace(nextRace);
        raceBtnRefs.current[nextRace.id]?.focus({ preventScroll: true });
    }

    return (
        <div className={styles.content}>
            <div className={styles.stage}>
                <div className={styles.detail}>
                    <SectionHeading eyebrow="1. lépés" title="Származás"/>
                    <article key={selectedRace.id} className={styles.infoPanel}>
                        <h3 className={styles.raceTitle}>{selectedRace.title}</h3>
                        <p className={styles.teaser}>{selectedRace.teaser}</p>
                        <p className={styles.raceDesc}>{selectedRace.desc}</p>
                        <Button href="#" variant="outline" size="medium" title="Részletes ismertető"/>
                    </article>
                </div>
            </div>
            <div className={styles.filmstrip}>
                <button type="button" aria-label="Előző fajok" disabled={!canScrollPrev}
                    className={clsx("material-icons", styles.scrollBtn)} onClick={() => scrollTrack(-1)}>
                    chevron_left
                </button>
                <ul ref={trackRef} aria-label="Választható fajok"
                    className={clsx(styles.track, {
                        [styles.trackFadeStart]: canScrollPrev,
                        [styles.trackFadeEnd]: canScrollNext,
                        [styles.trackDragging]: isDragging
                    })}
                    onScroll={updateScrollState} onKeyDown={handleTrackKeyDown}
                    onPointerDown={handlePointerDown} onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerEnd} onPointerCancel={handlePointerEnd}
                    onClickCapture={handleClickCapture}>
                    {races.map((race) => (
                        <CharacterRaceBtn
                            key={race.id}
                            ref={element => { raceBtnRefs.current[race.id] = element; }}
                            title={race.title}
                            img={race.buttonImg}
                            onClick={() => selectRace(race)}
                            active={selectedRace.id === race.id}
                        />
                    ))}
                </ul>
                <button type="button" aria-label="Következő fajok" disabled={!canScrollNext}
                    className={clsx("material-icons", styles.scrollBtn)} onClick={() => scrollTrack(1)}>
                    chevron_right
                </button>
            </div>
            <input type="hidden" {...register("raceId")}/>
            <input type="hidden" {...register("raceTitle")}/>
        </div>
    );
}
