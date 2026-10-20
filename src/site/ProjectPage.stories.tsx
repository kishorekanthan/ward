import { bothThemes } from "../../.storybook/bothThemes";
import { ProjectPage } from "./ProjectPage";

// A local picture, so the story needs no network.
const picture = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='900' viewBox='0 0 16 9'><rect width='16' height='9' fill='gray' fill-opacity='0.25'/><circle cx='8' cy='4.5' r='2' fill='gray'/></svg>",
)}`;

const shot = (alt: string) => ({ src: picture, alt, width: 1600, height: 900 });

export default {
  title: "Site/ProjectPage",
  component: ProjectPage,
  decorators: [bothThemes],
};

const source = { href: "https://example.com/loader", label: "Source code" };
const body = <p>Loader reads files in small batches and retries each one on its own.</p>;

export const NoScreenshots = {
  render: () => (
    <ProjectPage title="Loader" summary="A small batch loader." source={source}>
      {body}
    </ProjectPage>
  ),
};

export const OneScreenshot = {
  render: () => (
    <ProjectPage
      title="Loader"
      summary="A small batch loader."
      source={source}
      eyebrow="Side project"
      eyebrowHref="/projects"
      facts={[
        { term: "Status", value: "Active" },
        { term: "Language", value: "Python" },
      ]}
      screenshots={[{ ...shot("The run list"), caption: "Each run, with its retries." }]}
    >
      {body}
    </ProjectPage>
  ),
};

export const ManyScreenshots = {
  render: () => (
    <ProjectPage
      title="Loader"
      summary="A small batch loader."
      source={source}
      screenshots={[shot("The run list"), shot("One run"), shot("The settings")]}
      ratio="4/3"
    >
      {body}
    </ProjectPage>
  ),
};
