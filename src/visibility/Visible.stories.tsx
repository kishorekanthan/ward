import { bothThemes } from "../../.storybook/bothThemes";
import { Visible, VisibilityProvider } from "./Visible";

export default {
  title: "Visibility/Visible",
  component: Visible,
  decorators: [bothThemes],
};

const Demo = ({ hidden }: { hidden: string[] }) => (
  <VisibilityProvider hidden={hidden}>
    <Visible id="usage.costs" fallback={<p>Cost is hidden for your role.</p>}>
      <p>Build stage: $0.42</p>
    </Visible>
    <Visible id="usage.tokens">
      <p>Build stage: 120,000 tokens</p>
    </Visible>
  </VisibilityProvider>
);

export const EverythingShown = { render: () => <Demo hidden={[]} /> };

export const TokensHidden = { render: () => <Demo hidden={["usage.tokens"]} /> };

export const BothHidden = { render: () => <Demo hidden={["usage.costs", "usage.tokens"]} /> };
