import { UserInterface } from "./UserInterface";

export interface AuthInterface {
  isAuthenticated: boolean,
  token: string,
  user: UserInterface
}