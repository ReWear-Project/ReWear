import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    title: "Wedding Looks",

    image:
      "https://res.cloudinary.com/dygzp2lyy/image/upload/v1774164438/c1_fbxhdj.png",

    path:
      "/explore?category=wedding",

    size:
      "lg:col-span-2 lg:row-span-2",

    tag:
      "Luxury",
  },

  {
    title: "Party Nights",

    image:
      "https://res.cloudinary.com/dygzp2lyy/image/upload/v1774164436/c2_zfxrhd.png",

    path:
      "/explore?category=party",

    tag:
      "Trending",
  },

  {
    title: "Ethnic Elegance",

    image:
      "https://res.cloudinary.com/dygzp2lyy/image/upload/v1774164438/c3_fngbp1.png",

    path:
      "/explore?category=ethnic",

    tag:
      "Premium",
  },

  {
    title: "Streetwear Drops",

    image:
      "https://res.cloudinary.com/dygzp2lyy/image/upload/v1774164436/c4_saabux.png",

    path:
      "/explore?category=streetwear",

    tag:
      "Gen Z",
  },

  {
    title: "Designer Moments",

    image:
      "https://res.cloudinary.com/dygzp2lyy/image/upload/v1774164441/c5_vru5fb.png",

    path:
      "/explore?category=designer",

    tag:
      "Exclusive",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden bg-white py-24 sm:py-28">

      {/* BACKGROUND BLOBS */}
      <div className="absolute top-[-120px] left-[-80px] w-[280px] h-[280px] rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-100px] w-[320px] h-[320px] rounded-full bg-pink-200/30 blur-3xl" />

      {/* CONTAINER */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{ once: true }}

          transition={{
            duration: 0.8,
          }}

          className="max-w-2xl"
        >

          {/* MINI LABEL */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-100 bg-indigo-50 mb-6">

            <motion.div
              animate={{
                scale: [1, 1.4, 1],
              }}

              transition={{
                repeat: Infinity,
                duration: 2,
              }}

              className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
            />

            <span className="text-sm font-semibold text-gray-700">
              Fashion Categories
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 leading-[1.05]">

            Explore by

            <br />

            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Your Style
            </span>

          </h2>

          {/* DESCRIPTION */}
          <p className="mt-6 text-base sm:text-lg text-gray-600 leading-8 max-w-xl">
            From weddings to streetwear — discover fashion
            experiences curated for every vibe and every moment.
          </p>

        </motion.div>

        {/* GRID */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[280px] gap-6">

          {categories.map((cat, i) => (
            <motion.div
              key={i}

              initial={{
                opacity: 0,
                y: 70,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{ once: true }}

              transition={{
                delay: i * 0.12,
                duration: 0.8,
              }}

              whileHover={{
                y: -12,
              }}

              onClick={() => navigate(cat.path)}

              className={`group relative overflow-hidden rounded-[34px] cursor-pointer ${cat.size || ""}`}
            >

              {/* GLOW */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-2xl z-10" />

              {/* IMAGE */}
              <motion.img
                whileHover={{
                  scale: 1.08,
                }}

                transition={{
                  duration: 0.6,
                }}

                src={cat.image}

                alt={cat.title}

                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20" />

              {/* SPOTLIGHT */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}

                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}

                className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_35%)] z-20"
              />

              {/* FLOATING PARTICLE */}
              <motion.div
                animate={{
                  y: [0, -16, 0],
                  x: [0, 8, 0],
                }}

                transition={{
                  repeat: Infinity,
                  duration: 4 + i,
                }}

                className="absolute top-5 right-5 w-16 h-16 rounded-full bg-white/20 blur-2xl z-20"
              />

              {/* CONTENT */}
              <div className="absolute inset-0 z-30 flex flex-col justify-between p-6 sm:p-7">

                {/* TOP */}
                <div className="flex items-start justify-between">

                  {/* TAG */}
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                    }}

                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 text-white text-xs font-semibold"
                  >
                    <Sparkles size={14} />

                    {cat.tag}
                  </motion.div>

                  {/* BUTTON */}
                  <motion.div
                    whileHover={{
                      rotate: 45,
                      scale: 1.08,
                    }}

                    className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white"
                  >
                    <ArrowUpRight size={18} />
                  </motion.div>

                </div>

                {/* BOTTOM */}
                <div>

                  <motion.h3
                    whileHover={{
                      x: 4,
                    }}

                    className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight"
                  >
                    {cat.title}
                  </motion.h3>

                  {/* ANIMATED LINE */}
                  <motion.div
                    initial={{
                      width: 0,
                    }}

                    whileInView={{
                      width: "100%",
                    }}

                    transition={{
                      delay: i * 0.15,
                      duration: 0.8,
                    }}

                    className="mt-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-indigo-400 to-pink-400"
                  />

                </div>

              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Categories;