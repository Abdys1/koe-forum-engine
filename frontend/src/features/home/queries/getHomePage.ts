import { activityStats, characterSteps, cities, featuredCharacters, heroSlides, latestActivity, newestCharacter, news } from "@/dummydata/homepage";
import { HeroSlide, HomePageData } from "@/features/home/model/homePage";

export async function getHomePage(): Promise<HomePageData> {
    return { heroSlides, activityStats, latestActivity, newestCharacter, news, characterSteps, cities, featuredCharacters };
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
    return heroSlides;
}
