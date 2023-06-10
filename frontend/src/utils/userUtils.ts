import { User } from "../types";

export function generateGuestUser(): User {
  const id = Math.floor(Math.random() * 100000);
  const name = `Guest_${id}`;
  const username = `guest_${id}`;
  const email = `guest_${id}@guest.com`;

  return {
    id,
    name,
    username,
    email,
  };
}
