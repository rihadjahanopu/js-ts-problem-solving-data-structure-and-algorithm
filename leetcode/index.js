// Counter prolem for LeetCode

// Day one 02/07/2026

var createCounter = function (n) {
  return function () {
    return n++;
  };
};

const counter = createCounter(-2);

console.log(counter()); // -2
console.log(counter()); // -1
console.log(counter()); // 0
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Day two 04/07/2026

// You are given a string S.
//
// Your task is to remove all duplicate characters from the string and print the result.
function processData(input) {
  input % 2 === 0 ? console.log("Even") : console.log("Odd");
}

// You are given a string S.
//
// Your task is to remove all duplicate characters from the string and print the result.
function processData2(input) {
  input > 0
    ? console.log("Positive")
    : input < 0
      ? console.log("Negative")
      : console.log("Zero");
}

// You are given a string S.
//
// Your task is to remove all duplicate characters from the string and print the result.
function processData3(input) {
  const [a, b] = input.trim().split(/\s+/).map(Number);
  console.log(a === b ? "Equal" : Math.max(a, b));
}

// You are given a string S.
//
// Your task is to remove all duplicate characters from the string and print the result.
function processData4(input) {
  const n = Number(input.trim());
  const sum = (n * (n + 1)) / 2;
  console.log(sum);
}

// You are given a string S.
//
// Your task is to remove all duplicate characters from the string and print the result.
function processData5(input) {
  const numbers = input.trim().split(/\s+/).map(Number);

  let allEqual = true;
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] !== numbers[0]) {
      allEqual = false;
      break;
    }
  }

  if (allEqual) {
    console.log("Equal");
    return;
  }

  let maxNumber = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > maxNumber) {
      maxNumber = numbers[i];
    }
  }

  console.log(maxNumber);
}

// You are given a string S.
//
// Your task is to remove all duplicate characters from the string and print the result.
function processData6(input) {
  let n = parseInt(input.trim());
  let factorial = 1;

  for (let i = 2; i <= n; i++) {
    factorial *= i;
  }

  console.log(factorial);
}

// You are given a string S.
//
// Your task is to remove all duplicate characters from the string and print the result.
function processData7(input) {
  let n = parseInt(input.trim());
  let factorial = 1;

  for (let i = 2; i <= n; i++) {
    factorial *= i;
  }

  console.log(factorial);
}

// You are given a string S.
//
// Your task is to remove all duplicate characters from the string and print the result.
function processData8(input) {
  let seen = new Set();
  let result = "";

  for (let char of input) {
    if (!seen.has(char)) {
      result += char;
      seen.add(char);
    }
  }

  console.log(result);
}

// You are given two big integers A and B.
//
// Your task is to find the remainder when A is divided by B.
function processData9(input) {
  const parts = input.trim().split(" ");
  const A = BigInt(parts[0]);
  const B = BigInt(parts[1]);

  const remainderNum = A % B;
  const remainder = remainderNum.toString();

  console.log(remainder);
}

// 08-07-2026
