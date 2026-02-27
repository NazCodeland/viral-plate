// convex/videos.ts
import { query } from "./_generated/server";

export const getFeed = query({
  args: {},
  handler: async (ctx) => {
    const videos = await ctx.db
      .query("videos")
      .withIndex("by_views")
      .order("desc")
      .take(10);

    const results = await Promise.all(
      videos.map(async (video) => {
        const user = await ctx.db.get(video.userId);

        const partner = await ctx.db
          .query("partners")
          .withIndex("by_user", (q) => q.eq("userId", video.userId))
          .unique();

        return {
          _id: video._id,
          title: video.title,
          videoKey: video.videoKey,
          posterUrl: null,
          price: video.price,
          views: video.views,
          rating: video.rating,
          restaurantName: video.restaurantName,
          arrivalTime: video.arrivalTime,
          arrivalMinutes: video.arrivalMinutes,
          distanceKm: video.distanceKm,
          likesCount: video.likesCount,
          savesCount: video.savesCount,
          commentsCount: video.commentsCount,
          description: video.description,
          dishDescription: video.dishDescription,
          creator: {
            handle: partner?.handle ?? user?.name ?? "Unknown",
            avatarUrl: user?.image ?? "",
          },
        };
      }),
    );

    return results;
  },
});
