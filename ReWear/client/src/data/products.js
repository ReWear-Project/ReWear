export const products = [
  {
    id: 1,
    title: "Emerald Embroidered Sherwani",
    price: 7999,
    type: "sale",
    category: "wedding",
    size: "M",
    image: "https://res.cloudinary.com/dygzp2lyy/image/upload/v1774164438/c3_fngbp1.png"
  },
  {
    id: 2,
    title: "Ivory Embellished Lehenga",
    price: 1500,
    type: "rent",
    category: "wedding",
    size: "S",
    image: "https://res.cloudinary.com/dygzp2lyy/image/upload/v1774164438/c1_fbxhdj.png"
  },
  {
    id: 3,
    title: "Blush Pink Party Kurti",
    price: 2499,
    type: "both",
    category: "party",
    size: "M",
    image: "https://res.cloudinary.com/dygzp2lyy/image/upload/v1774164436/c2_zfxrhd.png"
  },
  {
    id: 4,
    title: "Blue Brocade Blazer",
    price: 4999,
    type: "both",
    category: "ethnic",
    size: "M",
    image: "https://res.cloudinary.com/dygzp2lyy/image/upload/v1774164436/c4_saabux.png"
  },
  {
    id: 5,
    title: "Black Floral Saree",
    price: 1999,
    type: "sale",
    category: "casual",
    size: "S",
    image: "https://res.cloudinary.com/dygzp2lyy/image/upload/v1774164441/c5_vru5fb.png"
  },

  // 🔥 DUPLICATE GENERATOR (AUTO SCALE)
  ...Array.from({ length: 30 }, (_, i) => ({
    id: i + 6,
    title: ["Sherwani", "Lehenga", "Kurti", "Blazer", "Saree"][i % 5],
    price: [1200, 2500, 3500, 4999, 1999][i % 5],
    type: ["sale", "rent", "both"][i % 3],
    category: ["wedding", "party", "ethnic", "casual"][i % 4],
    size: ["S", "M", "L"][i % 3],
    image: [
      "https://res.cloudinary.com/dygzp2lyy/image/upload/v1774164438/c3_fngbp1.png",
      "https://res.cloudinary.com/dygzp2lyy/image/upload/v1774164438/c1_fbxhdj.png",
      "https://res.cloudinary.com/dygzp2lyy/image/upload/v1774164436/c2_zfxrhd.png",
      "https://res.cloudinary.com/dygzp2lyy/image/upload/v1774164436/c4_saabux.png",
      "https://res.cloudinary.com/dygzp2lyy/image/upload/v1774164441/c5_vru5fb.png"
    ][i % 5]
  }))
];