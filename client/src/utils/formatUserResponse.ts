import type { user } from '../types/user';
export function formatUserResponse(user:user) {
  return {
    id: user._id,
    username: user.username,
    //拼接路径
    image: `http://localhost:3011${user.image}`,  // 拼接完整URL
    createdAt: user.createdAt,
    bio:user.bio,
  };
}