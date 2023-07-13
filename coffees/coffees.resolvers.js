import client from "../client";

export default {
  CoffeeShop: {
    user: ({ id }, _) =>
      client.user.findFirst({
        where: {
          shops: {
            some: {
              id,
            },
          },
        },
      }),
    categories: ({ id }, { lastId }) =>
      client.coffeeShop.findUnique({ where: { id } }).categories({
        take: 3,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
    photos: ({ id }, { lastId }) =>
      client.coffeeShop
        .findUnique({
          where: { id },
        })
        .photos({
          take: 3,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
  },
};
