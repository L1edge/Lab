// 1
 export const fibArray = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
// 2 
 export const revArray = [...fibArray].reverse();
// 3
// Допоміжна функція для перевірки, чи є число простим
const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};
export const snglArray = Array.from({ length: 100 }, (_, i) => i + 1).filter(isPrime);

// 4
export const snglArrayLength = snglArray.length;
 
// 5

export const snglArrayElement10 = snglArray[9];

// 6 
export const snglArray15to20 = snglArray.slice(14, 20).join(' ');

// 7

export const rptArray = new Array(10).fill(snglArray[9]);

// 8

export const oddArray = [1, 3, 5, 7, 9];

// 9
// Використовуємо спред-оператор [...], щоб створити новий масив з доданим числом
export const oddArray11 = [...oddArray, 11];

// 10
export const oddArray19 = [...oddArray11, 15, 17, 19];

// 11
// splice змінює масив, тому спочатку робимо копію
const tempArray13 = [...oddArray19]; 
tempArray13.splice(6, 0, 13); // Вставляємо 13 на 6-й індекс
export const oddArray13 = tempArray13;

// 12

const tempArrayPop = [...oddArray13];
tempArrayPop.splice(4, 3); // Видаляємо 3 елементи починаючи з 4-го індексу
export const oddArrayPop = tempArrayPop;

// 13

export const oddArrayPopLast = oddArray.pop;

// 14

export const tempArray19pop = oddArray19.splice(1, 6);
export const Array19pop = [tempArray19pop, 2, 3, 4];

// 15

export const oddArrayminus3 = oddArray.splice(1, 1);

// 16

export const include3 = oddArrayminus3.includes(3);

// 17

export const oddArrayString = oddArray.toString;