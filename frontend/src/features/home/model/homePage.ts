export interface HeroSlide {
    src: string,
    alt: string
}

export interface ActivityStat {
    value: string,
    label: string
}

export interface ActivityEntry {
    id: string,
    characterName: string,
    imageUrl: string,
    locationName: string,
    locationHref: string,
    excerpt: string,
    timeAgo: string
}

export interface NewestCharacter {
    name: string,
    href: string
}

export interface NewsItem {
    id: string,
    date: string,
    title: string
}

export interface PlayableCity {
    id: string,
    name: string,
    imageUrl: string,
    imageAlt: string,
    description: string
}

export interface FeaturedCharacter {
    id: string,
    name: string,
    imageUrl: string,
    role: string,
    quote: string
}

export interface HomePageData {
    heroSlides: HeroSlide[],
    activityStats: ActivityStat[],
    latestActivity: ActivityEntry[],
    newestCharacter: NewestCharacter,
    news: NewsItem[],
    characterSteps: string[],
    cities: PlayableCity[],
    featuredCharacters: FeaturedCharacter[]
}
