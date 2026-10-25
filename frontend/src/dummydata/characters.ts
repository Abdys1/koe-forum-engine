import type { SelectableSex } from "@/components/MultiStepForm/CreateCharacterForm/CharacterBasicsStep/CharacterBasicsStep";
import { dummyCharacter, PostCharacter } from "@/dummydata/posts";

export interface CharacterQuote {
  text: string;
  locationId: string;
  postNumber: number;
}

export interface Character extends PostCharacter {
  raceId: string;
  sex: SelectableSex;
  equipmentIds: string[];
  appearance?: string;
  backstory?: string;
  secrets?: string;
  notes?: string;
  quote?: CharacterQuote;
}

export const playerCharacters: Character[] = [
  {
    ...dummyCharacter,
    raceId: "sotetelf",
    sex: "ferfi",
    equipmentIds: ["hosszukard", "rovidkard", "okolpajzs", "borsisak", "borvert", "borkesztyu", "borkesztyu", "borlabvert"],
    appearance:
      "Magas, szikár alak, akinek hamuszürke bőre szinte elnyeli a fáklyák fényét. Hosszú, ezüstfehér haját többnyire egyszerű bőrszíjjal fogja hátra, vörösen izzó szemeit ritkán emeli huzamosabb ideig másokra.\n\nMozgása csendes és kimért, mintha minden lépését előre kiszámolta volna. Bal arcán halvány, régi vágás húzódik a halántékától az álláig.",
    backstory:
      "A mélység városainak egyik kisebb házába született, ahol a túlélés a ravaszságon és a hallgatáson múlt. Ifjú korában egy balul sikerült cselszövés miatt menekülnie kellett, és azóta a felszíni világban keresi a helyét.\n\nAz emberek városaiban zsoldosként és testőrként tartja fenn magát, de a múltja árnyai újra és újra utolérik.",
    secrets:
      "Valójában nem menekült, hanem száműzték: a háza őt áldozta fel, hogy elkerülje a bukást. Titokban levelez egyik egykori szövetségesével, aki visszatérést ígér neki a mélybe.\n\nCélja, hogy elég befolyást és aranyat gyűjtsön a felszínen ahhoz, hogy egy napon bosszút állhasson.",
    quote: {
      text: "Ha egyszer a szavát adja, inkább a saját árnyékát tagadja meg, mint téged. Csak azt ne kérdezd, kinek adta már korábban.",
      locationId: "fogado-a-feher-siralyhoz",
      postNumber: 12,
    },
    notes: "Következő játék: rákérdezni a kikötőmesternél a fekete vitorlás hajóra.",
  },
  {
    id: "2",
    name: "Aerin Valcourt",
    imageUrl: "/images/knight-withoutbg.png",
    raceId: "ember",
    sex: "ferfi",
    equipmentIds: ["csatabard", "kerekfapajzs", "fazeksisak", "lamellasvert", "pancelkesztyu", "femalkarvedo", "femlabvert"],
    appearance:
      "Széles vállú, napbarnított lovag, rövidre nyírt gesztenyebarna hajjal és gondosan ápolt szakállal. Páncélját mindig fényesre csiszolja, még akkor is, ha senki sem látja.",
  },
  {
    id: "3",
    name: "Rovéna O'mera Phorwentar",
    imageUrl: "/images/rovena.jpg",
    raceId: "ember",
    sex: "no",
    equipmentIds: ["langoloszablya", "kalandozoszablya", "borvert"],
    backstory:
      "Évszázadokon át őrizte népe ősi könyvtárát, mígnem egy éjjel a lángok mindent elemésztettek. Azóta a tűz titkait kutatja, és azt, aki a lángokat gyújtotta.",
  },
  {
    id: "4",
    name: "Valeria Blackpool",
    imageUrl: "/images/valeria.jpeg",
    raceId: "ember",
    sex: "no",
    equipmentIds: ["kalozszablya", "tisztiszablya", "borsisak"],
  },
  {
    id: "5",
    name: "Rasdeher Clion",
    imageUrl: "/images/rasdeher2.png",
    raceId: "ember",
    sex: "ferfi",
    equipmentIds: [],
  },
];

export const findCharacter = (characterId: string) => playerCharacters.find(character => character.id === characterId);
