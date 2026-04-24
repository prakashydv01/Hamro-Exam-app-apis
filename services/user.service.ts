import User from "@/models/User";

export const UserService = {
  async getProfile(userId: string) {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      const err: any = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    return user;
  },

  async updateProfile(userId: string, data: any) {
    const { name, avatar } = data;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, avatar },
      { new: true }
    ).select("-password");

    return user;
  },
};