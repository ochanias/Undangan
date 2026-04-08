import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function App() {
  const [rsvp, setRsvp] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  useEffect(() => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (!audio) return;

    audio.play().catch(() => {});

    const enableSound = () => {
      audio.muted = false;
      audio.play().catch(() => {});
    };

    document.addEventListener("click", enableSound);
    document.addEventListener("scroll", enableSound);

    return () => {
      document.removeEventListener("click", enableSound);
      document.removeEventListener("scroll", enableSound);
    };
  }, []);   

  if (submitted) {
    return (
      <div className="h-screen flex items-center justify-center text-center bg-pink-100">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md">
          <h1 className="text-3xl text-pink-500 font-bold mb-4">
            Thank You
          </h1>

          <p className="text-lg">
            {rsvp === "yes"
              ? `Terima kasih ${name}, ditunggu kehadirannya.`
              : `Terima kasih ${name}, ditunggu di acara berikutnya.`}
          </p>

          <button
            onClick={() => {
              setSubmitted(false);
              setName("");
              setRsvp(null);
            }}
            className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-full"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative font-[Poppins] text-gray-700 bg-gradient-to-b from-pink-100 via-pink-50 to-white overflow-x-hidden">

      {/* MUSIC */}
      <audio id="bg-music" autoPlay loop muted>
        <source src="/music/Kisah_Kasih.mp3" type="audio/mpeg" />
      </audio>

      {/* GLOBAL BACKGROUND */}
      <div
        className="absolute inset-0 opacity-[0.15] bg-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/images/bg-pattern.png')",
          backgroundSize: "300px"
        }}
      />

      <div className="relative z-10">

        {/* HERO */}
        <section className="flex flex-col items-center text-center pt-20 pb-10 relative">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-5xl md:text-7xl font-bold text-pink-500"
          >
            Halal Bihalal
          </motion.h1>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 text-2xl text-pink-400"
          >
            Reconnect With Heart
          </motion.h2>

          <p className="mt-4 text-lg">Keluarga Besar ITCC</p>
        </section>

        {/* EVENT DETAILS */}
        <section className="relative py-16 px-6 text-center overflow-hidden">

          <div
            className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
            style={{ backgroundImage: "url('/images/bg-details.jpg')" }}
          />

          <div className="absolute inset-0 bg-white/50 z-0" />

          <div className="relative z-10">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              className="text-3xl font-semibold text-pink-500 mb-10"
            >
              Event Details
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Location",
                  text: "Laboratorium ITCC",
                  img: "/images/lab.jpg"
                },
                {
                  title: "Time",
                  text: "16.00 - bosan",
                  img: "/images/time.jpg"
                },
                {
                  title: "Dresscode",
                  text: "Your cutest outfit",
                  img: "/images/dress.jpg"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 rounded-3xl shadow-xl overflow-hidden"
                >
                  <img src={item.img} className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="text-pink-500 font-semibold">{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="mt-10 max-w-xl mx-auto text-sm">
              Bebas berekspresi dengan outfit paling lucu dan unik dengan bertema kasih sayang.
            </p>
          </div>
        </section>

        {/* ACTIVITIES */}
        <section className="relative py-20 text-center overflow-hidden">

          <div
            className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
            style={{ backgroundImage: "url('/images/bg-activity.jpg')" }}
          />

          <div className="absolute inset-0 bg-white/50 z-0" />

          <div className="relative z-10">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              className="text-3xl text-pink-500 mb-10"
            >
              What’s Waiting For You?
            </motion.h2>

            <div className="flex flex-col gap-6 items-center">
              {[
                "Games seru",
                "Doorprize menarik",
                "Hadiah outfit ter-cute"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  className="bg-white p-5 rounded-2xl shadow-lg w-72"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section className="relative py-20 text-center overflow-hidden">

          <div
            className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
            style={{ backgroundImage: "url('/images/bg-rsvp.jpg')" }}
          />

          <div className="absolute inset-0 bg-white/50 z-0" />

          <div className="relative z-10">
            <h2 className="text-3xl text-pink-500 mb-6">
              Will you attend?
            </h2>

            <input
              type="text"
              placeholder="Masukkan nama kamu"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 rounded-full shadow-md w-72 text-center mb-6"
            />

            <div className="flex justify-center gap-6">
              <button
                onClick={() => {
                  if (!name) return;
                  setRsvp("yes");
                  setSubmitted(true);
                }}
                className="px-6 py-3 bg-white rounded-full shadow-lg"
              >
                Yes
              </button>

              <button
                onClick={() => {
                  if (!name) return;
                  setRsvp("no");
                  setSubmitted(true);
                }}
                className="px-6 py-3 bg-white rounded-full shadow-lg"
              >
                No
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <section className="relative py-16 text-center overflow-hidden">

          <div
            className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
            style={{ backgroundImage: "url('/images/bg-footer.jpg')" }}
          />

          <div className="absolute inset-0 bg-white/50 z-0" />

          <div className="relative z-10">
            <h2 className="text-2xl text-pink-600">
              See you kakak abang!!
            </h2>
            <p className="mt-4">Keluarga Besar ITCC</p>
            <p className="mt-6 text-sm">© 2026 ITCC. Made with Love</p>
          </div>
        </section>

      </div>
    </div>
  );
}
