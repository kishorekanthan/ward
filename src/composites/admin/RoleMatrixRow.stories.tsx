import { bothThemes } from "../../../.storybook/bothThemes";
import { Tree } from "../../primitives/Tree";
import { RoleMatrixRow } from "./RoleMatrixRow";
import s from "./RoleMatrixRow.module.css";

export default { title: "Admin/RoleMatrixRow", component: RoleMatrixRow, decorators: [bothThemes] };

export const Scope = {
  render: () => (
    <div className={s.frame} tabIndex={0} role="region" aria-label="People and access">
      <Tree label="People and access">
        <RoleMatrixRow index={0} depth={0} node={{ name: "Data engineering", adGroup: "AAD-TRELLIS-DE", people: 24 }} expanded>
          <RoleMatrixRow
            index={1}
            depth={1}
            node={{ name: "Stream admin", matrixRole: "streamAdmin", adGroup: "AAD-TRELLIS-DE-ADMIN", people: 3, requestedVia: "SR-8841" }}
            expanded
          >
            <RoleMatrixRow index={2} depth={2} node={{ name: "M. Chen", matrixRole: "streamAdmin", requestedVia: "SR-8841" }} leaf />
          </RoleMatrixRow>
        </RoleMatrixRow>
      </Tree>
    </div>
  ),
};

export const Inherited = {
  render: () => (
    <div className={s.frame} tabIndex={0} role="region" aria-label="People and access">
      <Tree label="People and access">
        <RoleMatrixRow index={0} depth={1} node={{ name: "Member", matrixRole: "member", adGroup: "AAD-TRELLIS-ALL", people: 182, inherited: true }} leaf />
      </Tree>
    </div>
  ),
};

export const Unresolved = {
  render: () => (
    <div className={s.frame} tabIndex={0} role="region" aria-label="People and access">
      <Tree label="People and access">
        <RoleMatrixRow index={0} depth={1} node={{ name: "MEMBER?", adGroup: "AAD-TRELLIS-DE-LEGACY", people: 6, unresolved: true }} leaf />
      </Tree>
    </div>
  ),
};

export const Floor = {
  render: () => (
    <div className={s.frame} tabIndex={0} role="region" aria-label="People and access">
      <Tree label="People and access">
        <RoleMatrixRow index={0} depth={1} node={{ name: "Viewer", matrixRole: "viewer", adGroup: "AAD-TRELLIS-ALL", people: 182, floor: true }} leaf />
      </Tree>
    </div>
  ),
};

export const Approver = {
  render: () => (
    <div className={s.frame} tabIndex={0} role="region" aria-label="People and access">
      <Tree label="People and access">
        <RoleMatrixRow index={0} depth={1} node={{ name: "Approver", matrixRole: "approver", adGroup: "AAD-TRELLIS-DE-GATE", people: 5, requestedVia: "SR-8902" }} leaf />
      </Tree>
    </div>
  ),
};

export const PlatformAdmin = {
  render: () => (
    <div className={s.frame} tabIndex={0} role="region" aria-label="People and access">
      <Tree label="People and access">
        <RoleMatrixRow index={0} depth={0} node={{ name: "Platform", matrixRole: "platformAdmin", adGroup: "AAD-TRELLIS-PLATFORM", people: 4 }} leaf />
      </Tree>
    </div>
  ),
};
