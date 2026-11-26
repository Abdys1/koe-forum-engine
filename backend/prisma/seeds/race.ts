import { db } from "./db";

interface SeedRace {
  name: string;
  teaser: string;
  description: string;
  imageUrl: string;
  buttonImageUrl: string;
}

const races: SeedRace[] = [
  {
    name: "Sötételf",
    teaser:
      "Sokak szerint a lelkük épp olyan sötét, mint a hely, ahová születtek. Az igazság azonban ritkán ilyen egyszerű.",
    description:
      "A sötételfek lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis.",
    imageUrl: "/images/ryldan-nobg.png",
    buttonImageUrl: "/images/ryldan-nobg.png",
  },
  {
    name: "Ember",
    teaser:
      "Múlandóságuk árnyékában próbálnak a leggyorsabban és a legmagasabbra törni, mégha végül ezért is zuhannak a mélybe.",
    description:
      "Az emberek lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis.",
    imageUrl: "/images/ryldan-nobg.png",
    buttonImageUrl: "/images/ryldan-nobg.png",
  },
  {
    name: "Ork",
    teaser:
      "Mások a vasat tisztelik, az orkok azt, aki forgatja. A törzsek emlékezete hosszú, néha túlságosan hosszú.",
    description:
      "Orkok lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis.",
    imageUrl: "/images/ryldan-nobg.png",
    buttonImageUrl: "/images/ryldan-nobg.png",
  },
  {
    name: "Elf",
    teaser:
      "Évszázadokban mérik az időt és a figyelmesebbek közülük talán látják a csillagokat is elhalványulni. Magukban hordoznak valami ősit, legyen az régi bölcsesség vagy évszázados métely.",
    description:
      "Elf lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis.",
    imageUrl: "/images/ryldan-nobg.png",
    buttonImageUrl: "/images/ryldan-nobg.png",
  },
  {
    name: "Törp",
    teaser:
      "Úgy tartják, egy törp kézfogása szerződés, a sértést kőbe vésik, szavaik pedig olykor éppoly kemények, mint a hegymélyben kovácsolt acél.",
    description:
      "Törpök lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti esse repudiandae saepe, recusandae a quo atque deserunt vitae reprehenderit assumenda mollitia tempora. Tempora voluptas, quis explicabo officiis similique numquam nihil nulla? Vel, quia? Cumque corporis earum autem qui explicabo nobis.",
    imageUrl: "/images/ryldan-nobg.png",
    buttonImageUrl: "/images/ryldan-nobg.png",
  },
  {
    name: "Félszerzet",
    teaser:
      "A többség hajlamos alábecsülni őket, de talán ez a legnagyobb fegyverük. Ahol egy félszerzet megfordul, ott talán valami hiányozni fog, vagy épp előkerül.",
    description:
      "Félszerzetek lorem ipsum dolor sit amet consectetur, reprehenderit assumenda mollitia tempora.",
    imageUrl: "/images/ryldan-nobg.png",
    buttonImageUrl: "/images/ryldan-nobg.png",
  },
  {
    name: "Gnóm",
    teaser:
      "Sose bízz abban a gnómban, aki azt feleli valamire, hogy az ő magasságával lehetetlen kivitelezni.",
    description:
      "Gnómok lorem ipsum dolor sit amet consectetur, reprehenderit assumenda mollitia tempora.",
    imageUrl: "/images/ryldan-nobg.png",
    buttonImageUrl: "/images/ryldan-nobg.png",
  },
  {
    name: "Bullywug",
    teaser:
      "Senki sem figyel rájuk, és pontosan ez a legnagyobb fegyverük. Ahol egy félszerzet megfordul, ott valami hiányozni fog, vagy épp előkerül.",
    description:
      "Bullywug lorem ipsum dolor sit amet consectetur, reprehenderit assumenda mollitia tempora.",
    imageUrl: "/images/ryldan-nobg.png",
    buttonImageUrl: "/images/ryldan-nobg.png",
  },
  {
    name: "Dragonborn",
    teaser:
      "Senki sem figyel rájuk, és pontosan ez a legnagyobb fegyverük. Ahol egy félszerzet megfordul, ott valami hiányozni fog, vagy épp előkerül.",
    description:
      "Dragonborn lorem ipsum dolor sit amet consectetur, reprehenderit assumenda mollitia tempora.",
    imageUrl: "/images/ryldan-nobg.png",
    buttonImageUrl: "/images/ryldan-nobg.png",
  },
  {
    name: "Infey",
    teaser:
      "Mindenkinek van egy elképzelése arról, honnan származnak vagy hogyan születnek. Talán mindannyiuknak igaza van. Talán tévednek. Egyetlen dolgot felejtenek el: az hogy honnan jöttél, nem mondja meg, hogy ki vagy.",
    description:
      "Infey lorem ipsum dolor sit amet consectetur, reprehenderit assumenda mollitia tempora.",
    imageUrl: "/images/ryldan-nobg.png",
    buttonImageUrl: "/images/ryldan-nobg.png",
  },
];

export async function seedRaces(): Promise<void> {
  for (const [sortOrder, race] of races.entries()) {
    const data = { ...race, sortOrder };
    await db.race.upsert({
      where: { name: race.name },
      update: data,
      create: data,
    });
  }
}
