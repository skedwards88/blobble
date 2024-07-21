export function parseUrlQuery() {
  const searchParams = new URLSearchParams(document.location.search);
  const query = searchParams.get("id");

  // The seed query consists of two parts: the seed and the difficulty level, separated by an underscore
  let difficultyLevel;
  let seed;
  if (query) {
    [seed, difficultyLevel] = query.split("_");
    difficultyLevel = parseInt(difficultyLevel);
  }

  return [seed, difficultyLevel];
}
