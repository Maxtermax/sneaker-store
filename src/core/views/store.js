const products = [
  {
    id: "1",
    name: "Jordan",
    images: [
      "/assets/images/jordan_1.png",
      "/assets/images/jordan_2.png",
      "/assets/images/jordan_4.png",
    ],
    description: "Air Jordan 3 Retro OG",
    discount: 0,
    sizes: [8, 8.5, 9, 10],
    price: 250,
    value: 250,
  },
  {
    id: "2",
    images: [
      "/assets/images/addidas_1.png",
      "/assets/images/addidas_2.png",
      "/assets/images/addidas_3.png",
    ],
    description: "Bad Bunny Forum Buckle Low sneakers",
    discount: 30,
    name: "Adidas Forum",
    price: 200,
    value: 140,
    sizes: [8, 8.5, 9, 10],
  },
];

const productsStore = new Map();
productsStore.set("collection", products);

export default productsStore;
