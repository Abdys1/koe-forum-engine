export interface SelectableRace {
    id: string,
    title: string,
    teaser: string,
    desc: string,
    img: string,
    buttonImg: string
}

export const races: SelectableRace[] = [
    {
        id: 'sotetelf',
        title: 'Sötételf',
        teaser: 'Sokak szerint a lelkük épp olyan sötét, mint a hely, ahová születtek. Az igazság azonban ritkán ilyen egyszerű.',
        desc: 'A sötételfek lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
    {
        id: 'ember',
        title: 'Ember',
        teaser: 'Múlandóságuk árnyékában próbálnak a leggyorsabban és a legmagasabbra törni, mégha végül ezért is zuhannak a mélybe.',
        desc: 'Az emberek lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
    {
        id: 'ork',
        title: 'Ork',
        teaser: 'Mások a vasat tisztelik, az orkok azt, aki forgatja. A törzsek emlékezete hosszú, néha túlságosan hosszú.',
        desc: 'Orkok lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
    {
        id: 'elf',
        title: 'Elf',
        teaser: 'Évszázadokban mérik az időt és a figyelmesebbek közülük talán látják a csillagokat is elhalványulni. Magukban hordoznak valami ősit, legyen az régi bölcsesség vagy évszázados métely.',
        desc: 'Elf lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
    {
        id: 'torp',
        title: 'Törp',
        teaser: 'Úgy tartják, egy törp kézfogása szerződés, a sértést kőbe vésik, szavaik pedig olykor éppoly kemények, mint a hegymélyben kovácsolt acél.',
        desc: 'Törpök lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
    {
        id: 'felszerzet',
        title: 'Félszerzet',
        teaser: 'A többség hajlamos alábecsülni őket, de talán ez a legnagyobb fegyverük. Ahol egy félszerzet megfordul, ott talán valami hiányozni fog, vagy épp előkerül.',
        desc: 'Félszerzetek lorem ipsum dolor sit amet consectetur, reprehenderit assumenda mollitia tempora.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
    {
        id: 'gnom',
        title: 'Gnóm',
        teaser: 'Sose bízz abban a gnómban, aki azt feleli valamire, hogy az ő magasságával lehetetlen kivitelezni.',
        desc: 'Gnómok lorem ipsum dolor sit amet consectetur, reprehenderit assumenda mollitia tempora.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
    {
        id: 'bullywug',
        title: 'Bullywug',
        teaser: 'Senki sem figyel rájuk, és pontosan ez a legnagyobb fegyverük. Ahol egy félszerzet megfordul, ott valami hiányozni fog, vagy épp előkerül.',
        desc: 'Bullywug lorem ipsum dolor sit amet consectetur, reprehenderit assumenda mollitia tempora.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
    {
        id: 'dragonborn',
        title: 'Dragonborn',
        teaser: 'Senki sem figyel rájuk, és pontosan ez a legnagyobb fegyverük. Ahol egy félszerzet megfordul, ott valami hiányozni fog, vagy épp előkerül.',
        desc: 'Dragonborn lorem ipsum dolor sit amet consectetur, reprehenderit assumenda mollitia tempora.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
    {
        id: 'infey',
        title: 'Infey',
        teaser: 'Mindenkinek van egy elképzelése arról, honnan származnak vagy hogyan születnek. Talán mindannyiuknak igaza van. Talán tévednek. Egyetlen dolgot felejtenek el: az hogy honnan jöttél, nem mondja meg, hogy ki vagy.',
        desc: 'Infey lorem ipsum dolor sit amet consectetur, reprehenderit assumenda mollitia tempora.',
        img: '/images/ryldan-nobg.png',
        buttonImg: '/images/ryldan-nobg.png'
    },
];

export const findRace = (raceId?: string) => races.find(race => race.id === raceId) ?? races[0];
