'use client'

import PrimaryButton from "@/components/PrimaryButton";

export default function RegulationLink() {
    return (
        <PrimaryButton onClick={() => {}}>
            <span className='tracking-widest'>
                Szabályzat
            </span>
            <span className='relative w-auto h-full flex justify-center items-center text-2xl pt-1 ml-1.5'>
                {/* <ion-icon name="chevron-forward-sharp"></ion-icon> */}
            </span>
        </PrimaryButton>
    );
}