import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  // Parallax (lighter than hero)
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 60]);

  const text1 = "Turn Your Closet Into";
  const text2 = "Cash or Style.";

  return (
    <section className="w-full py-28 relative overflow-hidden">

      {/* BACKGROUND WITH PARALLAX */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dygzp2lyy/image/upload/f_auto,q_auto,w_1600/ctabg_v0cyhl')"
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>

      {/* GLOW */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full blur-3xl opacity-30"
      />

      <div className="relative max-w-[900px] mx-auto px-6 text-center text-white">

        {/* TEXT REVEAL HEADING */}
        <h2 className="text-[40px] md:text-[48px] font-extrabold leading-tight">

          {/* Line 1 */}
          <div>
            {text1.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                viewport={{ once: true }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Line 2 */}
          <div className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {text2.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.02 }}
                viewport={{ once: true }}
              >
                {char}
              </motion.span>
            ))}
          </div>

        </h2>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-gray-300 text-[17px] max-w-[600px] mx-auto"
        >
          List your outfits, rent premium looks, and unlock value from your wardrobe.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-5"
        >

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/sell")}
            className="px-8 py-4 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
          >
            Start Selling →
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/explore")}
            className="px-8 py-4 rounded-full text-sm font-semibold border border-white/30 backdrop-blur-md hover:bg-white/10 transition"
          >
            Explore Styles →
          </motion.button>

        </motion.div>

      </div>
    </section>
  );
};

export default CTA;