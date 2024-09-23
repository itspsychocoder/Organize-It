import { create } from 'zustand'

export const useUserStore = create((set) => ({

  Username: "Psycho",
  SetUsername: (newUsername:String) => set({Username:newUsername}),
  Email: "",
  SetEmail: (newEmail:String) => set({ Email:newEmail }),
  UserId: "",
  SetUserId: (newId:String) => set({ UserId:newId }),
  IsLogin: false,
  SetIsLogin: (newIsLogin:Boolean) => set({ isLogin: newIsLogin }),
  
  attachment: "",
  setAttachment: (newState) => set({ attachment:newState}),
  uploadProgressCaption: "",
  setUploadProgressCaption: (newState) => set({ uploadProgressCaption:newState}),
  attachmentProgress: 0,
  setAttachmentProgress: (newState) => set({ attachmentProgress:newState}),




}))