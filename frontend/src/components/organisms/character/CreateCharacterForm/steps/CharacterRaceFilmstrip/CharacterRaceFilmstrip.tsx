"use client"

import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { useWatch } from "react-hook-form";

import Icon from "@/components/atoms/Icon/Icon";
import CharacterRaceBtn from "@/components/organisms/character/CreateCharacterForm/steps/CharacterRaceBtn/CharacterRaceBtn";
import { useMultiStepFormContext } from "@/components/organisms/form/MultiStepForm/MultiStepFormContext";
import type { CharacterInputs } from "@/features/character/model/createCharacter";
import type { Race } from "@/lib/api/race/types";

import * as styles from "./CharacterRaceFilmstrip.css";

const DRAG_THRESHOLD = 5;
const SCROLL_EDGE_TOLERANCE = 1;

type CharacterRaceFilmstripProps = {
    races: Race[]
}

export default function CharacterRaceFilmstrip({ races }: CharacterRaceFilmstripProps) {
    const { control, register, setValue } = useMultiStepFormContext<CharacterInputs>().form;
    const selectedRaceId: number = useWatch({ control, name: "raceId" });

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const trackRef = useRef<HTMLUListElement>(null);
    const raceBtnRefs = useRef<Record<number, HTMLButtonElement | null>>({});
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
        raceBtnRefs.current[selectedRaceId]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }, [selectedRaceId]);

    function selectRace(race: Race): void {
        setValue("raceId", race.id);
        setValue("raceTitle", race.name);
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
        if (!races.length) return;
        const index = races.findIndex(race => race.id === selectedRaceId);
        const nextRace = races[(index + step + races.length) % races.length];
        selectRace(nextRace);
        raceBtnRefs.current[nextRace.id]?.focus({ preventScroll: true });
    }

    return (
        <div className={styles.filmstrip}>
            <button type="button" aria-label="Előző fajok" disabled={!canScrollPrev}
                className={styles.scrollBtn} onClick={() => scrollTrack(-1)}>
                <Icon name="chevron_left" className={styles.scrollIcon}/>
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
                        title={race.name}
                        img={race.buttonImageUrl}
                        onClick={() => selectRace(race)}
                        active={selectedRaceId === race.id}
                    />
                ))}
            </ul>
            <button type="button" aria-label="Következő fajok" disabled={!canScrollNext}
                className={styles.scrollBtn} onClick={() => scrollTrack(1)}>
                <Icon name="chevron_right" className={styles.scrollIcon}/>
            </button>
            <input type="hidden" {...register("raceId", { valueAsNumber: true })}/>
            <input type="hidden" {...register("raceTitle")}/>
        </div>
    );
}
