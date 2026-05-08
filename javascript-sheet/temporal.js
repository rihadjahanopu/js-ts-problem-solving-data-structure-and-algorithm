//  new temporal.PlainDateTime(year, month, day, hour, minute, second, millisecond, microsecond, nanosecond) exampul  all form

const { Temporal } = require("@js-temporal/polyfill");

// Example 1: Creating a PlainDateTime with only year, month, and day
const dateTime1 = new Temporal.PlainDateTime(2023, 5, 15);
console.log(dateTime1.toString()); // Output: 2023-05-15T00:00:00

// Example 2: Creating a PlainDateTime with year, month, day, hour, and minute
const dateTime2 = new Temporal.PlainDateTime(2023, 5, 15, 14, 30);
console.log(dateTime2.toString()); // Output: 2023-05-15T14:30:00

// Example 3: Creating a PlainDateTime with year, month, day, hour, minute, and second
const dateTime3 = new Temporal.PlainDateTime(2023, 5, 15, 14, 30, 45);
console.log(dateTime3.toString()); // Output: 2023-05-15T14:30:45

// Example 4: Creating a PlainDateTime with year, month, day, hour, minute, second, and millisecond
const dateTime4 = new Temporal.PlainDateTime(2023, 5, 15, 14, 30, 45, 123);
console.log(dateTime4.toString()); // Output: 2023-05-15T14:30:45.123

// Example 5: Creating a PlainDateTime with year, month, day, hour, minute, second, millisecond, and microsecond
const dateTime5 = new Temporal.PlainDateTime(2023, 5, 15, 14, 30, 45, 123, 456);
console.log(dateTime5.toString()); // Output: 2023-05-15T14:30:45.123456

// Example 6: Creating a PlainDateTime with year, month, day, hour, minute, second, millisecond, microsecond, and nanosecond
const dateTime6 = new Temporal.PlainDateTime(
	2023,
	5,
	15,
	14,
	30,
	45,
	123,
	456,
	789
);
console.log(dateTime6.toString()); // Output: 2023-05-15T14:30:45.123456789

// Example 7: Creating a PlainDateTime with default time values (all zeros)
const dateTime7 = new Temporal.PlainDateTime(2023, 5, 15);
console.log(dateTime7.toString()); // Output: 2023-05-15T00:00:00

// Example 8: Creating a PlainDateTime with only year and month (day defaults to 1)
const dateTime8 = new Temporal.PlainDateTime(2023, 5, 1);
console.log(dateTime8.toString()); // Output: 2023-05-01T00:00:00

// Example 9: Creating a PlainDateTime with only year (month and day default to 1)
const dateTime9 = new Temporal.PlainDateTime(2023, 1, 1);
console.log(dateTime9.toString()); // Output: 2023-01-01T00:00:00

// Example 10: Creating a PlainDateTime with all time components set to zero
const dateTime10 = new Temporal.PlainDateTime(2023, 5, 15, 0, 0, 0, 0, 0, 0);
console.log(dateTime10.toString()); // Output: 2023-05-15T00:00:00

// Example 11: Creating a PlainDateTime with fractional seconds
const dateTime11 = new Temporal.PlainDateTime(
	2023,
	5,
	15,
	14,
	30,
	45,
	123,
	456,
	789
);
console.log(dateTime11.toString()); // Output: 2023-05-15T14:30:45.123456789

// Example 12: Creating a PlainDateTime with negative time components (will throw an error)
try {
	const dateTime12 = new Temporal.PlainDateTime(2023, 5, 15, -1, 30);
	console.log(dateTime12.toString());
} catch (e) {
	console.log(e.message); // Output: Invalid time component
}

// Example 13: Creating a PlainDateTime with large time components (will throw an error)
try {
	const dateTime13 = new Temporal.PlainDateTime(2023, 5, 15, 25, 0);
	console.log(dateTime13.toString());
} catch (e) {
	console.log(e.message); // Output: Invalid time component
}

// Example 14: Creating a PlainDateTime with all components specified
const dateTime14 = new Temporal.PlainDateTime(
	2023,
	12,
	31,
	23,
	59,
	59,
	999,
	999,
	999
);
console.log(dateTime14.toString()); // Output: 2023-12-31T23:59:59.999999999

// Example 15: Creating a PlainDateTime with only date components (time defaults to 00:00:00)
const dateTime15 = new Temporal.PlainDateTime(2023, 7, 4);
console.log(dateTime15.toString()); // Output: 2023-07-04T

// Example 16: Creating a PlainDateTime with only year (month and day default to 1, time defaults to 00:00:00)
const dateTime16 = new Temporal.PlainDateTime(2024, 1, 1);
console.log(dateTime16.toString()); // Output: 2024-01-01T00:00:00
