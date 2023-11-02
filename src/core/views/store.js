const products = [
  {
    id: "1",
    name: "Jordan",
    images: [
      "/assets/images/jordan/jordan_1.png",
      "/assets/images/jordan/jordan_2.png",
      "/assets/images/jordan/jordan_4.png",
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
      "/assets/images/addidas/addidas_1.png",
      "/assets/images/addidas/addidas_2.png",
      "/assets/images/addidas/addidas_3.png",
    ],
    description: "Bad Bunny Forum Buckle Low sneakers",
    discount: 30,
    name: "Adidas Forum",
    price: 200,
    value: 140,
    sizes: [8, 8.5, 9, 10],
  },
  {
    id: "3",
    images: [
      "/assets/images/addidas/response_1.png",
      "/assets/images/addidas/response_2.png",
      "/assets/images/addidas/response_3.png",
    ],
    description: "Bad Bunny response",
    discount: 30,
    name: "Adidas Bad Bunny response",
    price: 240,
    value: 140,
    sizes: [8, 8.5, 9, 10],
  },
];

const productsStore = new Map();
productsStore.set("collection", products);

export default productsStore;
