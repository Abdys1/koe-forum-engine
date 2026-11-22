import LocationTemplate from "@/components/templates/LocationTemplate/LocationTemplate";
import { getLocationPage } from "@/features/forum/queries/getLocationPage";

type LocationPageProps = {
    params: Promise<{ location: string }>,
    searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function LocationPage({ params, searchParams }: LocationPageProps) {
    const { location: locationId } = await params;
    const locationPage = await getLocationPage(locationId, await searchParams);

    return <LocationTemplate locationPage={locationPage}/>;
}
