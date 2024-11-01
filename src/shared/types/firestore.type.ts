export type UserDbModel = {
  first_name: string;
  last_name: string;
  phone_number: string;
  avatar_url: string | null;
};

// export type UserAvatarDbModel = {
//     created_at?: string
//     primary: boolean
//     url: string
// }

export type ChatsRoomDbModel = {
  joined_at: string;
  updated_at: string;
  chat_members: string[];
  type: "private" | "public";
};

export type MessageDbModel = {
  created_at: string;
  recipient_id: string;
  seen: boolean;
  sender_id: string;
  text: string;
};

export type MessageAttechmentDbModel = {
  created_at: string;
  filepath: string;
  filetype: string;
};
