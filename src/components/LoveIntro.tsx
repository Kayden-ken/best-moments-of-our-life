import { useState, useRef } from "react";

import introVoice from "../imports/intro-voice.m4a";

export default function LoveIntro({
  onStart,
}: {
  onStart: () => void;
}) {

  const [playing, setPlaying] = useState(false);
  const [phase, setPhase] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);


  const startIntro = () => {

    setPlaying(true);

    const audio = audioRef.current;

    if (!audio) return;


    audio.currentTime = 0;


    audio.play().catch((error) => {
      console.error("Audio failed:", error);
    });



    audio.ontimeupdate = () => {

      const time = audio.currentTime;


      /*
        VOICE SYNC

        0.0 - 3.0
        When Everything Felt Black and White

        3.0 - 3.8
        You Came

        3.8 - 7.7
        And Showed Me The Colors I Never Knew Existed

        7.7+
        Final transition
      */


      if (time < 3.0) {

        setPhase(0);

      }

      else if (time < 3.8) {

        setPhase(1);

      }

      else if (time < 7.7) {

        setPhase(2);

      }

      else {

        setPhase(3);

      }

    };



    audio.onended = () => {

      setPhase(3);


      // Movie-like pause before entering the website
      setTimeout(() => {

        onStart();

      }, 4000);

    };

  };



  return (

    <section
      className={`
        fixed inset-0 z-[100]

        flex items-center justify-center

        overflow-hidden

        transition-all duration-[2000ms]

        ${
          phase >= 3
            ? "bg-[#faf6f0]"
            : "bg-black"
        }
      `}
    >



      <audio
  ref={audioRef}
  src="/intro-voice.m4a"
  preload="auto"
/>





      {/* PLAY SCREEN */}

      {!playing && (

        <div
          className="
            text-center
            animate-fade-up
          "
        >

          <p
            className="
              text-white
              text-4xl
              font-script
              mb-10
            "
          >
            It's just us being us ♡
          </p>



          <button
            onClick={startIntro}
            className="
              w-20
              h-20

              rounded-full

              bg-white/20

              border
              border-white/50

              text-white

              text-3xl

              backdrop-blur-sm

              hover:scale-110

              transition-all
            "
          >
            ▶
          </button>



          <p
            className="
              mt-6
              text-white/70
            "
          >
            Press play to witness something magical
          </p>


        </div>

      )}






      {/* STORY TEXT */}

      {playing && phase < 3 && (

        <div
          className="
            text-center
            px-6
          "
        >



          {phase === 0 && (

            <p
              className="
                text-white

                text-3xl
                md:text-5xl

                font-script

                animate-fade-up
              "
            >
              When Everything Felt Black and White,
            </p>

          )}





          {phase === 1 && (

            <p
              className="
                text-white

                text-4xl
                md:text-6xl

                font-script

                animate-fade-up
              "
            >
              You Came
            </p>

          )}





          {phase === 2 && (

            <p
              className="
                text-white

                text-3xl
                md:text-5xl

                font-script

                animate-fade-up
              "
            >
              And Showed Me The Colors I Never Knew Existed
            </p>

          )}



        </div>

      )}







      {/* FINAL TRANSITION */}

      {phase >= 3 && (

        <div
          className="
            absolute

            text-center

            animate-fade-up
          "
        >


          <h1
            className="
              font-script

              text-7xl

              text-[var(--brown)]
            "
          >
            Us Being Us ♡
          </h1>




          <p
            className="
              mt-5

              text-[var(--brown-light)]

              italic
            "
          >
            You're witnessing the love story of us being us.
          </p>




          <p
            className="
              mt-3

              text-[var(--muted)]

              text-sm
            "
          >
            A story made from little moments and endless memories.
          </p>



        </div>

      )}





    </section>

  );

}