import Image from "next/image";
import { useId, useRef } from "react";

import Button from "@/components/atoms/Button/Button";
import PortraitFrame from "@/components/atoms/PortraitFrame/PortraitFrame";
import { visuallyHidden } from "@/styles/shared.css";

import * as styles from "./CharacterSheet.css";

type CharacterSheetPortraitProps = {
    name: string,
    imageUrl: string,
    canEdit: boolean,
    onChangeImage: (file: File) => void
}

export default function CharacterSheetPortrait({ name, imageUrl, canEdit, onChangeImage }: CharacterSheetPortraitProps) {
    const imageInputId = useId();
    const imageInputRef = useRef<HTMLInputElement>(null);

    if (!canEdit) {
        return (
            <div className={styles.portrait}>
                <Image src={imageUrl} alt={name} fill sizes="272px" className={styles.portraitImg} priority/>
            </div>
        );
    }

    return (
        <div className={styles.portraitColumn}>
            <PortraitFrame htmlFor={imageInputId} imageUrl={imageUrl} imageAlt={name} size="large"
                overlay={{ icon: "swap_horiz", text: "Kép cseréje" }}/>
            <Button variant="soft" size="small" icon="swap_horiz" title="Kép cseréje"
                onClick={() => imageInputRef.current?.click()}/>
            <input ref={imageInputRef} id={imageInputId} type="file" accept="image/png, image/jpeg"
                className={visuallyHidden} tabIndex={-1}
                onChange={event => event.target.files?.[0] && onChangeImage(event.target.files[0])}/>
        </div>
    );
}
