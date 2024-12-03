import { PhoneAuthService } from "../services/phone.auth";

export class AuthClient {
  readonly phoneProvider = new PhoneAuthService();
}

export const authClient = new AuthClient();