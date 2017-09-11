export const vectorDistance = (first, second) => {
  return (first.x - second.x) * (first.x - second.x) +
           (first.y - second.y) * (first.y - second.y);
};

export const isSquare = (p1, p2, p3, p4) => {
  const d2 = vectorDistance(p1, p2);
  const d3 = vectorDistance(p1, p3);
  const d4 = vectorDistance(p1, p4);

  if (d2 === d3 && 2 * d2 === d4) {
    const d = vectorDistance(p2, p4);
    return (d === vectorDistance(p3, p4) && d === d2);
  }

  if (d3 === d4 && 2 * d3 === d2) {
    const d = vectorDistance(p2, p3);
    return (d === vectorDistance(p2, p4) && d === d3);
  }
  if (d2 === d4 && 2 * d2 === d3) {
    const d = vectorDistance(p2, p3);
    return (d === vectorDistance(p3, p4) && d === d2);
  }

  return false;
};
