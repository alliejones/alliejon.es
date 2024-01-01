import Sun from "ionicons/dist/svg/sunny-outline.svg?raw";
import Moon from "ionicons/dist/svg/moon-outline.svg?raw";

import RSS from "ionicons/dist/svg/logo-rss.svg?raw";
import LinkedIn from "ionicons/dist/svg/logo-linkedin.svg?raw";
import Github from "ionicons/dist/svg/logo-github.svg?raw";

interface IconProps {
  class?: string;
}

export const SunIcon = (props: IconProps) => (
  <div class={props.class} dangerouslySetInnerHTML={{ __html: Sun }} />
);

export const MoonIcon = (props: IconProps) => (
  <div class={props.class} dangerouslySetInnerHTML={{ __html: Moon }} />
);

export const LinkedInIcon = (props: IconProps) => (
  <div class={props.class} dangerouslySetInnerHTML={{ __html: LinkedIn }} />
);

export const GithubIcon = (props: IconProps) => (
  <div class={props.class} dangerouslySetInnerHTML={{ __html: Github }} />
);

export const RSSIcon = (props: IconProps) => (
  <div class={props.class} dangerouslySetInnerHTML={{ __html: RSS }} />
);
