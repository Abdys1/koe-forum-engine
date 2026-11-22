export interface Location {
    id: string,
    name: string,
    description: string
}

export const locations: Location[] = [
    {
        id: "fogado-a-feher-siralyhoz",
        name: "Fogadó a Fehér Sirályhoz",
        description:
            "A dokkok közelében álló, mindig nyüzsgő épület. Matrózok, kereskedők és kalandorok kedvelt találkozóhelye. Olcsó rum és gőzölgő halételek."
    }
];

export function findLocation(locationId: string): Location | undefined {
    return locations.find(location => location.id === locationId);
}

export function locationHref(locationId: string): string {
    return `/roleplay-area/locations/${locationId}`;
}
