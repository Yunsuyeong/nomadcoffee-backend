import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, page }) => {
      const users = client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowercase(),
          },
        },
        take: 3,
        skip: (page - 1) * 3,
      });
      const totalResult = await client.user.count({
        where: { username: { startsWith: keyword.toLowercase() } },
      });
      return {
        users,
        totalPages: Math.ceil(totalResult / 3),
      };
    },
  },
};
