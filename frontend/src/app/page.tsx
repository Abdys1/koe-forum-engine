import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button/Button";
import BackgroundSlideshow from "@/components/Home/BackgroundSlideshow/BackgroundSlideshow";
import CharacterTeasers from "@/components/Home/CharacterTeasers/CharacterTeasers";
import QuickLogin from "@/components/Home/QuickLogin/QuickLogin";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Showcase from "@/components/Showcase/Showcase";
import { activityStats, characterSteps, cities, featuredCharacters, heroSlides, latestActivity, newestCharacter, news } from "@/dummydata/homepage";
import { accentLink, eyebrow, metaText } from "@/styles/shared.css";
import * as styles from "./home.css";

const romanNumerals = ["I", "II", "III"];

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <BackgroundSlideshow slides={heroSlides} />
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <span className={eyebrow}>Fórumos szerepjáték</span>
            <h1 className={styles.heroTitle}>Gloamfall</h1>
            <p className={styles.heroLead}>
              Amikor a nap lebukik a romok mögött, a világ megmutatja valódi arcát. Lépj be a 
              birodalomba, ahol minden történetet a játékosok írnak, és minden döntés nyomot hagy.
            </p>
            <div className={styles.heroActions}>
              <Button href="/auth/registration" title="Regisztráció" />
              <Button href="#world" variant="ghost" title="Fedezd fel a világot" />
            </div>
          </div>
          <div className={styles.heroLogin}>
            <QuickLogin />
          </div>
        </div>
        <div className={styles.activityBar}>
          <div className={styles.activityHeader}>
            <h2 className={styles.liveBadge}>
              <span className={styles.liveDot} />
              A világ most is mozgásban
            </h2>
            <dl className={styles.stats}>
              {activityStats.map(stat => (
                <div key={stat.label} className={styles.stat}>
                  <dt className={styles.statLabel}>{stat.label}</dt>
                  <dd className={styles.statValue}>{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ul className={styles.recentPosts}>
            {latestActivity.map(activity => (
              <li key={activity.id} className={styles.recentPost}>
                <div className={styles.recentBody}>
                  <p className={styles.recentMeta}>
                    <span className={styles.recentName}>{activity.characterName}</span> írt ide:{" "}
                    <Link href={activity.locationHref} className={accentLink}>
                      {activity.locationName}
                    </Link>
                  </p>
                </div>
                <span className={metaText}>{activity.timeAgo}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="chronicle" className={clsx(styles.section, styles.liveSection)}>
        <div className={styles.liveHeader}>
          <SectionHeading eyebrow="Élő krónika" title="Most történik" />
        </div>
        <div className={styles.liveGrid}>
          <div className={styles.activityList}>
            {latestActivity.map(activity => (
              <article key={activity.id} className={styles.activityCard}>
                <Image src={activity.imageUrl} alt={activity.characterName} width={64} height={64}
                  className={styles.activityAvatar} />
                <div className={styles.activityBody}>
                  <div className={styles.activityMeta}>
                    <span className={styles.activityName}>{activity.characterName}</span>
                    <span className={metaText}>{activity.timeAgo}</span>
                  </div>
                  <Link href={activity.locationHref} className={styles.activityLocation}>
                    {activity.locationName}
                  </Link>
                  <p className={styles.activityExcerpt}>{activity.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.liveSide}>
            <div className={styles.newestCharacter}>
              <span className={clsx("material-icons", styles.newestCharacterIcon)}>person_add</span>
              <div>
                <span className={styles.newestCharacterLabel}>Legújabb karakter</span>
                <Link href={newestCharacter.href} className={styles.newestCharacterName}>
                  {newestCharacter.name}
                </Link>
              </div>
            </div>
            <aside className={styles.newsPanel}>
              <h3 className={styles.newsTitle}>
                <span className={clsx("material-icons", styles.newsIcon)}>campaign</span>
                Hírek
              </h3>
              <ul className={styles.newsList}>
                {news.map(item => (
                  <li key={item.id} className={styles.newsItem}>
                    <time className={styles.newsDate}>{item.date}</time>
                    <span className={styles.newsText}>{item.title}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
        <div className={styles.joinBand}>
          <p className={styles.joinText}>A világot ti formáljátok.</p>
          <Button href="/auth/registration" title="Regisztrálok" />
        </div>
      </section>

      <section id="world" className={styles.section}>
        <div className={clsx(styles.split, styles.worldSplit)}>
          <div className={styles.sectionText}>
            <SectionHeading eyebrow="A világ" title="A tornyok fénye elhalványult" />
            <p className={styles.sectionLead}>
              Már semmi nem ugyanaz. A mágia kiszámíthatatlanabb, az erdők szeszélyesebbek. Az utak... nos, az utazás mindig is járt némi kockázattal, de ez eddig sem bírt rá mindenkit az otthon maradásra.
            </p>
            <Button href="/world" variant="gold" title="Kódexek a világról" />
          </div>
          <Showcase showcaseElements={cities} label="Játszható városok" />
        </div>
      </section>

      <section id="character-creation" className={clsx(styles.section, styles.characterSection)}>
        <div className={clsx(styles.split, styles.splitReverse)}>
          <div className={styles.sectionText}>
            <SectionHeading eyebrow="Te ki vagy ebben a történetben?" title="Mielőtt belépsz a világba..." />
            <p className={styles.sectionLead}>
              ...döntsd el, mit hozol magaddal.
            </p>
            <div className={styles.journey}>
              <p className={styles.journeyIntro}>A karakterlap csak a kezdet, néhány egyszerű lépés.</p>
              <ol className={styles.journeySteps}>
                {characterSteps.map((step, index) => (
                  <li key={step} className={styles.journeyStep}>
                    <span className={styles.journeyMarker} aria-hidden="true">{romanNumerals[index]}</span>
                    <span className={styles.journeyText}>{step}</span>
                  </li>
                ))}
              </ol>
              <p className={styles.journeyOutro}>A többit már a játékod írja tovább.</p>
            </div>
            <p className={styles.journeyHint}>Fajok, közösségek, fejlődés? Ismerd meg a karakteralkotás rendszerét és lehetőségeit.</p>
            <Button href="/character/create" variant="gold" title="Karakteralkotás részletei" />
          </div>
          <CharacterTeasers characters={featuredCharacters} />
        </div>
      </section>
    </main>
  );
}
