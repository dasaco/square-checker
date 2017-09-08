export const vectorDistance = function(first, second) {
	return (first.x - second.x)*(first.x - second.x) +
           (first.y - second.y)*(first.y - second.y);
};

export const isSquare = function(p1, p2, p3, p4) {
    let d2 = vectorDistance(p1, p2);
    let d3 = vectorDistance(p1, p3);
    let d4 = vectorDistance(p1, p4); 

    if (d2 == d3 && 2*d2 == d4)
    {
        let d = vectorDistance(p2, p4);
        return (d == vectorDistance(p3, p4) && d == d2);
    }
 
    if (d3 == d4 && 2*d3 == d2)
    {
        let d = vectorDistance(p2, p3);
        return (d == vectorDistance(p2, p4) && d == d3);
    }
    if (d2 == d4 && 2*d2 == d3)
    {
        let d = vectorDistance(p2, p3);
        return (d == vectorDistance(p3, p4) && d == d2);
    }
 
    return false;
}