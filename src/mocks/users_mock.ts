import type { User } from "../types/user";

export const mockUsers: Record<string, User> = {
  superadmin: {
    id: "1",
    firstName: "علی",
    lastName: "رضایی",
    role: "SuperAdmin",
  },
  admin: {
    id: "2",
    firstName: "محمد",
    lastName: "احمدی",
    role: "ZoneAdmin",
  },
  guard: {
    id: "3",
    firstName: "رضا",
    lastName: "کریمی",
    role: "Guard",
  },
  rep: {
    id: "4",
    firstName: "سارا",
    lastName: "محمدی",
    role: "Representative",
  },
};



export async function mockLogin(username: string, password: string): Promise<{ accessToken: string, user: User }> {
  // شبیه‌سازی تاخیر شبکه
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const user = mockUsers[username]
  if (!user || password !== "1234") throw new Error("نام کاربری یا رمز اشتباه است")

  return { accessToken: "mock-token", user }
}
