export function parseUrlQuery(): [string, number] | [undefined, undefined] {
  const searchParams = new URLSearchParams(document.location.search);
  const query = searchParams.get("id");

  // The seed query consists of two parts: the seed and the difficulty level, separated by an underscore
  if (query) {
    const [seed, difficultyLevelRaw] = query.split("_");
    const difficultyLevel = parseInt(difficultyLevelRaw);
    return [seed, difficultyLevel];
  }

  return [undefined, undefined];
}
