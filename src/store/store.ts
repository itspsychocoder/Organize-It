import { create } from 'zustand'

export const useUserStore = create((set) => ({
  Username: "Psycho",
  Email: "",
  UserId: "",
  IsLogin: false,
  SetIsLogin: (newIsLogin:Boolean) => set({ isLogin: newIsLogin }),
  SetUsername: (newUsername:String) => set({Username:newUsername}),
  SetEmail: (newEmail:String) => set({ Email:newEmail }),
  SetUserId: (newId:String) => set({ UserId:newId }),
}))