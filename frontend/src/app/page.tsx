import Image from "next/image";
import Title from "@/components/Title/Title";
import PrimaryLink from "@/components/PrimaryLink/PrimaryLink";
import SecondaryLink from "@/components/SecondaryLink/SecondaryLink";
import * as styles from "./home.css";

export default function Home() {
  return (
    <>
      <section className={styles.heroSection}>
        <nav className={styles.heroNav}>
          <div>
            <Image src="/images/logo.png" alt="bölcsek köve szimbólum, a játék logója" width={120} height={120}/>
          </div>
          <ul className={styles.navList}>
            <li className="menuItem"><a href="#">FRPG? Az mi?</a></li>
            <li className="menuItem"><a href="#">Világ</a></li>
            <li className="menuItem"><a href="#">Fajok</a></li>
          </ul>
        </nav>
        <div className={styles.heroContent}>
          <div className={styles.heroTextBox}>
            <div className={styles.heroTitleBox}>
              <h2 className={styles.heroSubTitle}>Key of</h2>
              <h1 className={styles.heroTitle}>Eternity</h1>
            </div>
            <h4 className={styles.heroTagline1}>A kulcs a te kezedben van.</h4>
            <h4 className={styles.heroTagline2}>Te döntöd el, melyik ajtót nyitod ki vele.</h4>
            <div className={styles.heroCta}>
              <div className={styles.ctaItem}>
                <PrimaryLink href="/auth/login">Belépek</PrimaryLink>
              </div>
              <div>
                <SecondaryLink href="/auth/registration">Regisztrálok</SecondaryLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.aboutTitleWrap}>
          <Title subTitle="Hogyan működik a" mainTitle="fórumos szerepjáték?"/>
        </div>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <div className={styles.aboutPara}>
              <p className={styles.aboutParaText}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt porro rem, provident voluptatibus deleniti modi aperiam unde optio architecto quis quia quibusdam labore doloribus a illo. Nemo officiis nam minus modi odit aspernatur velit. Tempora, praesentium. Officiis blanditiis ratione et exercitationem soluta repudiandae? Sed excepturi expedita harum consectetur temporibus.
              </p>
            </div>
            <div>
              <div className={styles.aboutLinks}>
                <PrimaryLink href="">
                  <span style={{ letterSpacing: '0.1em' }}>Szabályzat</span>
                </PrimaryLink>
              </div>
              <SecondaryLink href="/auth/registration">Regisztrálok</SecondaryLink>
            </div>
          </div>
          <div className={styles.aboutImages}>
            <Image className={styles.imgAbsTop} src="/images/kezek1.png" alt="illusztráció a játék világáról" width={340} height={200} />
            <Image className={styles.imgRelative} src="/images/landscape_red1.png" alt="illusztráció a játék világáról" width={340} height={200}/>
            <Image className={styles.imgAbsBottom} src="/images/landscape1.png" alt="illusztráció a játék világáról" width={340} height={300}/>
          </div>
        </div>
      </section>

      <section className={styles.worldSection}>
        <div className={styles.worldTitleWrap}>
          <Title subTitle="A játék világa," mainTitle="Ur'Elhalem"/>
        </div>
        <div className={styles.worldArrows}>
          <span className={styles.arrowLeft}></span>
          <span className={styles.arrowRight}></span>
        </div>
        <div className={styles.worldBottom}>
          <ul className={styles.worldThumbnails}>
            <li className={`${styles.worldThumbBase} ${styles.worldThumb1}`}></li>
            <li className={`${styles.worldThumbBase} ${styles.worldThumb2}`}></li>
            <li className={`${styles.worldThumbBase} ${styles.worldThumb3}`}></li>
          </ul>
          <h4 className={styles.worldDescTitle}>Leírás a világról 1</h4>
          <p className={styles.worldDescText}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat possimus, sed sequi, amet sunt cum eum, facere voluptatem excepturi alias corrupti dolorum a assumenda ea dicta. Possimus quidem expedita consequatur nihil illo minus odit, molestias et nostrum animi provident ipsa reprehenderit, maxime reiciendis exercitationem delectus explicabo fuga dignissimos minima vero recusandae quas. Aliquid quisquam quas facilis dicta sapiente quo neque esse alias rem unde impedit at eum accusamus, qui placeat molestiae, error deserunt ab tempora laudantium veritatis repellendus? Ut, soluta.
          </p>
        </div>
      </section>
    </>
  );
}
