import client from "../client";

export default {
  Category: {
    totalShops: ({ id }, _) =>
      client.coffeeshop.count({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      }),
    shops: ({ id }, { lastId }) =>
      client.category.findUnique({ where: { id } }).shops({
        take: 3,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
