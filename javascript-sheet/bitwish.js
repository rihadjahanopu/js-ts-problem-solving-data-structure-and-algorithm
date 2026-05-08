// 1. AND (&)
let a = 5; // 0101
let b = 3; // 0011
let andResult = a & b; // 0001 (1 in decimal)
console.log("AND (&) Result:", andResult);

//  ai kane ki hoyece bujiye bolte parbe  comment diye

// 2. OR (|)
let orResult = a | b; // 0111 (7 in decimal)
console.log("OR (|) Result:", orResult);

// 3. XOR (^)
let xorResult = a ^ b; // 0110 (6 in decimal)
console.log("XOR (^) Result:", xorResult);

// 4. NOT (~)
let notResult = ~a; // 1010 (-6 in decimal, two's complement)
console.log("NOT (~) Result:", notResult);

// 5. Left Shift (<<)
let leftShiftResult = a << 1; // 1010 (10 in decimal)
console.log("Left Shift (<<) Result:", leftShiftResult);

// 6. Right Shift (>>)
let rightShiftResult = a >> 1; // 0010 (2 in decimal)
console.log("Right Shift (>>) Result:", rightShiftResult);

// 7. Unsigned Right Shift (>>>)
let unsignedRightShiftResult = a >>> 1; // 0010 (2 in decimal)
console.log("Unsigned Right Shift (>>>) Result:", unsignedRightShiftResult);
