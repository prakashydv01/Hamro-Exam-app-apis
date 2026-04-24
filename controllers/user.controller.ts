import User from "@/models/User";

export const UserController = {
  async getProfile(userId: string) {
    const user = await User.findById(userId).select("-password");

    if (!user) throw new Error("User not found");

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