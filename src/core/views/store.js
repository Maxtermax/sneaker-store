const products = [
  {
    id: "1",
    name: "Jordan",
    images: {
      140: [
        "/assets/images/jordan/140x140/jordan_1.png",
        "/assets/images/jordan/140x140/jordan_2.png",
        "/assets/images/jordan/140x140/jordan_4.png",
      ],
      500: [
        "/assets/images/jordan/500x500/jordan_1.png",
        "/assets/images/jordan/500x500/jordan_2.png",
        "/assets/images/jordan/500x500/jordan_4.png",
      ],
      700: [
        "/assets/images/jordan/700x700/jordan_1.png",
        "/assets/images/jordan/700x700/jordan_2.png",
        "/assets/images/jordan/700x700/jordan_4.png",
      ],
    },
    description: "Air Jordan 3 Retro OG",
    bio: "It's the return of a legend: the Tinker Hatfield design that solidified MJ's relationship with Nike returns to its original 1988 form. Passion red and white detailing and cracked black and iron gray leather on the toe and heel nod to the iconic release, while 'NIKE AIR' written across the back gives it an eye-catching retro touch. And speaking of Air, you can count on proven underfoot cushioning to keep you moving.",
    discount: 0,
    sizes: [8, 8.5, 9, 10],
    price: 250,
    value: 250,
  },
  {
    id: "2",
    images: {
      140: [
        "/assets/images/addidas/140x140/forum_1.png",
        "/assets/images/addidas/140x140/forum_2.png",
        "/assets/images/addidas/140x140/forum_3.png",
      ],
      500: [
        "/assets/images/addidas/500x500/forum_1.png",
        "/assets/images/addidas/500x500/forum_2.png",
        "/assets/images/addidas/500x500/forum_3.png",
      ],
      700: [
        "/assets/images/addidas/700x700/forum_1.png",
        "/assets/images/addidas/700x700/forum_2.png",
        "/assets/images/addidas/700x700/forum_3.png",
      ],
    },
    description: "Bad Bunny Forum Buckle Low sneakers",
    discount: 30,
    name: "Adidas Forum",
    bio: `
      The Bad Bunny Forum Buckle Low sneakers are made with high-quality materials and construction, and they are designed to be comfortable to wear all day long. The sneakers have a padded collar and tongue, and the insole is made of breathable material.
    `,
    price: 200,
    value: 140,
    sizes: [8, 8.5, 9, 10],
  },
  {
    id: "3",
    images: {
      140: [
        "/assets/images/addidas/140x140/response_1.png",
        "/assets/images/addidas/140x140/response_2.png",
        "/assets/images/addidas/140x140/response_3.png",
      ],
      500: [
        "/assets/images/addidas/500x500/response_1.png",
        "/assets/images/addidas/500x500/response_2.png",
        "/assets/images/addidas/500x500/response_3.png",
      ],
      700: [
        "/assets/images/addidas/700x700/response_1.png",
        "/assets/images/addidas/700x700/response_2.png",
        "/assets/images/addidas/700x700/response_3.png",
      ],
    },
    description: "Bad Bunny 'Paso fino'",
    discount: 30,
    name: "Bad Bunny 'Paso fino'",
    bio: `
      Bad Bunny is not afraid of color, and his sneakers reflect this. His designs often feature bright and unexpected color combinations that are sure to turn heads.
    `, 
    price: 240,
    value: 140,
    sizes: [8, 8.5, 9, 10],
  },
];

const productsStore = new Map();
productsStore.set("collection", products);

export default productsStore;
