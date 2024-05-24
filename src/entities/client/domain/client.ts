
type Client = {
    id: ClientId;
    name: ClientName;
    email: ClientName;
    avatar: ClientAvatar;
}

export type Profile = Client & {
    blocked: ClientId[];
    role: "profile";
}
export type User = Client & {
    role: "user";
}



//  создаём юзера из аутентификации пользователя и присваеваем ему id и другие поля
// также создаём коллекцию userchats которой присваеваем id пользователя из
// аутентификации и тем самым сцепляем их.
// 



