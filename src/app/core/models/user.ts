import { Region } from "./business/region";

export interface User {
  id: number;
  email: string;
  name: string;
  filterByState: string;
  region: Region;
}
