class ArrayUtilities {
  /* Your magic here */
  static addZeros = arr => arr.map( i => i * 10 );
  static moreThanFifty = arr => arr.filter( i => i > 50 );
  static removeFirst = ([i,...rest]) => rest;
  static sumAll = arr => arr.reduce( (p,c) => p + c );
  static divide = arr => Array.from(String(arr));
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const addZeros = ArrayUtilities.addZeros(numbers);
console.log(addZeros);

const moreThanFifty = ArrayUtilities.moreThanFifty(addZeros);
console.log(moreThanFifty);

const noFirst = ArrayUtilities.removeFirst(moreThanFifty);
console.log(noFirst);

const sumAll = ArrayUtilities.sumAll(noFirst);
console.log(sumAll);

const divided = ArrayUtilities.divide(sumAll);
console.log(divided);