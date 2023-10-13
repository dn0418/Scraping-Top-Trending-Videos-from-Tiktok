import { atom } from "recoil";

const User = atom({
  key: "user",
  default: null,
});

export { User };
