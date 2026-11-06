import { bothThemes } from "../../.storybook/bothThemes";
import { CopyValue } from "./CopyValue";

export default {
  title: "Primitives/CopyValue",
  component: CopyValue,
  decorators: [bothThemes],
};

export const Address = {
  args: { label: "Redirect address", value: "https://trellis.example.com/" },
};

export const LongToken = {
  args: { label: "Token", value: "scim_7Hq2v9KxR4mWn8Lp3Tz6Yb1Cd5Fg0Jk2Ns4Uw7Xa9Ze3Qr6Vt8Hm1Pb5Lc0Dy" },
};
