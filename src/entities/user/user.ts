export interface User {
  id: string;
  phone_number: string;
}

export function createUser(userId: string, phoneNumber: string): User {
  return {
    id: userId,
    phone_number: phoneNumber,
  };
}
