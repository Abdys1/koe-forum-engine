import Image from "next/image";
import Title from "@/components/Title";
import { caveat, mrsSaintDelafield, sumana } from "@/app/fonts";
import PrimaryLink from "@/components/PrimaryLink";
import SecondaryLink from "@/components/SecondaryLink";

export default function Home() {
  return (
    <>
      <section className='relative w-full h-screen flex justify-start items-center flex-col bg-[url("/images/koe-bannerbg.png")] bg-no-repeat bg-cover bg-center'>
        <nav className='relative w-full flex justify-between items-start px-24 pt-10'>
          <div>
            <Image src="/images/logo.png" alt="bölcsek köve szimbólum, a játék logója" width={120} height={120}/>
          </div>
          <ul className='relative flex justify-end items-start'>
            <li className={`menuItem ${sumana.className}`}><a href="#">FRPG? Az mi?</a></li>
            <li className={`menuItem ${sumana.className}`}><a href="#">Világ</a></li>
            <li className={`menuItem ${sumana.className}`}><a href="#">Fajok</a></li>
          </ul>
        </nav>
        <div className='relative w-full flex justify-end items-start px-24'>
          <div className='relative h-full max-w-[35%] w-[35%] flex justify-start items-start flex-col'>
            <div className='relative w-full flex justify-start items-start flex-col'>
              <h2 className={`relative text-white text-[3.5rem] ml-[5.5rem] ${mrsSaintDelafield.className}`}>Key of</h2>
              <h1 className={`relative text-mainLight text-9xl leading-[1em] ${mrsSaintDelafield.className}`}>Eternity</h1>
            </div>
            <h4 className={`text-white leading-[1em] ${sumana.className}`}>A kulcs a te kezedben van.</h4>
            <h4 className={`text-white ${sumana.className}`}>Te döntöd el, melyik ajtót nyitod ki vele.</h4>
            <div className='relative w-full mt-6 flex justify-start items-center flex-col'>
              <div className='mb-6'>
                <PrimaryLink href="/auth/login">Belépek</PrimaryLink>
              </div>
              <div>
                <SecondaryLink href="/auth/registration">Regisztrálok</SecondaryLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className='relative w-full h-screen py-8 px-24 flex justify-start items-center flex-col bg-blackBg'>
        <div className='relative w-full mb-16'>
          <Title subTitle="Hogyan működik a" mainTitle="fórumos szerepjáték?"/>
        </div>
        <div className='relative w-full flex justify-between items-center'>
          <div className='relative max-w-[40%] h-full flex justify-start items-center flex-col'>
            <div className='relative w-full mb-6 pl-4'>
              <p className={`relative text-white text-left leading-7 tracking-wider ${sumana.className}`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt porro rem, provident voluptatibus deleniti modi aperiam unde optio architecto quis quia quibusdam labore doloribus a illo. Nemo officiis nam minus modi odit aspernatur velit. Tempora, praesentium. Officiis blanditiis ratione et exercitationem soluta repudiandae? Sed excepturi expedita harum consectetur temporibus.
              </p>
            </div>
            <div>
              <div className='relative mb-6'>
                <PrimaryLink href="">
                  <span className='tracking-widest'>
                    Szabályzat
                  </span>
                  <span className='relative w-auto h-full flex justify-center items-center text-2xl pt-1 ml-1.5'>
                      {/* <ion-icon name="chevron-forward-sharp"></ion-icon> */}
                  </span>
                </PrimaryLink>
              </div>
              <SecondaryLink href="/auth/registration">Regisztrálok</SecondaryLink>
            </div>
          </div>
          <div className='relative max-w-[40%] max-h-full flex justify-center items-end'>
            <Image className='absolute -top-[50%] -left-[50%] z-10' src="/images/kezek1.png" alt="illusztráció a játék világáról" width={340} height={200} />
            <Image className='relative z-20' src="/images/landscape_red1.png" alt="illusztráció a játék világáról" width={340} height={200}/>
            <Image className='absolute top-[60%] -left-[50%] z-30' src="/images/landscape1.png" alt="illusztráció a játék világáról" width={340} height={300}/>
          </div>
        </div>
      </section>

      <section className='relative w-full h-screen pt-8 flex justify-between items-center flex-col bg-[url("/images/waterfalls.jpg")] bg-center bg-no-repeat bg-cover before:content-[""] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-blackBg before:opacity-30 before:z-10 after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-32 after:bg-gradient-to-t after:from-transparent after:to-blackBg after:z-20'>
        <div className='relative w-full mb-16 z-30'>
        <Title subTitle="A játék világa," mainTitle="Ur'Elhalem"/>
        </div>
        <div className='absolute top-[40%] left-0 w-full flex justify-between items-center text-white'>
        <span className='text-7xl opacity-70 hover:opacity-100 cursor-pointer ml-8 z-50'>{/* <ion-icon name="chevron-back-sharp"></ion-icon> */}</span>
        <span className='text-7xl opacity-70 hover:opacity-100 cursor-pointer mr-8 z-50'>{/* <ion-icon name="chevron-forward-sharp"></ion-icon> */}</span>
        </div>
        <div className='relative w-full flex justify-center items-center flex-col py-8 px-24 bg-gradient-to-t from-blackBg to-mainLight'>
                <ul className='absolute -top-32 pr-24 w-full flex justify-end items-center'>
                  <li className='w-28 h-40 bg-[url("/images/world1.jpg")] bg-center bg-no-repeat bg-cover rounded mr-4 border border-solid border-[rgba(255,255,255,0.8)] cursor-pointer z-50 hover:opacity-80'></li>
                  <li className='w-28 h-40 bg-[url("/images/world2.jpg")] bg-center bg-no-repeat bg-cover rounded mr-4 opacity-60 border border-solid border-[rgba(255,255,255,0.8)] cursor-pointer z-50 hover:opacity-80'></li>
                  <li className='w-28 h-40 bg-[url("/images/world3.jpg")] bg-center bg-no-repeat bg-cover rounded mr-4 opacity-60 border border-solid border-[rgba(255,255,255,0.8)] cursor-pointer z-50 hover:opacity-80'></li>
                </ul>
                <h4 className={`relative w-full flex justify-start items-center mb-2 text-white text-lg font-bold ${caveat.className} tracking-wide uppercase`}>Leírás a világról 1</h4>
                <p className='text-white text-sm'>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat possimus, sed sequi, amet sunt cum eum, facere voluptatem excepturi alias corrupti dolorum a assumenda ea dicta. Possimus quidem expedita consequatur nihil illo minus odit, molestias et nostrum animi provident ipsa reprehenderit, maxime reiciendis exercitationem delectus explicabo fuga dignissimos minima vero recusandae quas. Aliquid quisquam quas facilis dicta sapiente quo neque esse alias rem unde impedit at eum accusamus, qui placeat molestiae, error deserunt ab tempora laudantium veritatis repellendus? Ut, soluta.
                </p>
        </div>
      </section>
    </>
  );
}
