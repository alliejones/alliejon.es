export const getPostPathFromSlug = (slug: string) => {
  const [year, month, day, ...slugParts] = slug.split("-");
  return `${year}/${month}/${day}/${slugParts.join("-")}`;
};
