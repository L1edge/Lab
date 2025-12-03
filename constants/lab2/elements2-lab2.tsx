// --- ЗАВДАННЯ 2 (МНОЖИНИ / SETS) ---

// 1. Опишіть множину chSet із символів а, b, c та d.
export const chSet = new Set(['a', 'b', 'c', 'd']);

// 2. Створіть mutable множину mChSet (у JS Sets завжди mutable, робимо копію).
export const mChSet = new Set(chSet);

// 3. Виведіть кількість елементів.
export const mChSetCount = mChSet.size;

// 4. Вставте символ 'е'.
// Робимо копію для ланцюжка
const tempSetWithE = new Set(mChSet);
tempSetWithE.add('e');
export const mChSetWithE = tempSetWithE;

// 5. Створіть множину srtChSet (відсортовану).
// Sets не мають порядку, тому результат сортування — це Масив.
export const srtChSet = [...mChSetWithE].sort();

// 6. Видаліть символ 'f'.
const tempRemoveF = new Set(mChSetWithE);
export const removedF = tempRemoveF.delete('f'); // поверне false, бо 'f' немає
export const removedFResult = removedF ? "Видалено" : "Не знайдено";

// 7. Видаліть символ 'd' за його індексом.
// Sets не мають індексів. Емулюємо через масив.
const tempArrForIndex = [...tempRemoveF]; // ['a', 'b', 'c', 'd', 'e']
const indexD = tempArrForIndex.indexOf('d');
if (indexD !== -1) {
    tempArrForIndex.splice(indexD, 1);
}
export const mChSetAfterDeleteDIndex = new Set(tempArrForIndex);
// Рядкове представлення
export const mChSetString = [...mChSetAfterDeleteDIndex].join(', ');

// 8. Відстань між першим елементом та 'a'.
const tempArrDist = [...mChSetAfterDeleteDIndex];
const indexA = tempArrDist.indexOf('a');
// Оскільки 'a' зазвичай перший (індекс 0), відстань буде 0.
export const distanceToA = indexA - 0;

// 9. Вставте символ 'a' (він вже є, дублікати ігноруються).
const tempInsertA = new Set(mChSetAfterDeleteDIndex);
tempInsertA.add('a');
export const mChSetFinal = tempInsertA;

// 10. Різнотипні множини aSet та bSet.
export const aSet = new Set<string | number>(["One", "Two", "Three", 1, 2]);
export const bSet = new Set<string | number>([1, 2, 3, "One", "Two"]);

// 11. Спільні елементи (Intersection).
// Фільтруємо елементи A, які є в B
export const intersectionSet = new Set([...aSet].filter(x => bSet.has(x)));

// 12. Унікальні елементи (Difference).
// Унікальні в A (A - B)
export const uniqueInA = new Set([...aSet].filter(x => !bSet.has(x)));
// Унікальні в B (B - A)
export const uniqueInB = new Set([...bSet].filter(x => !aSet.has(x)));

// 13. Не спільні елементи (Symmetric Difference).
// Об'єднання унікальних з обох сторін
const diffA = [...aSet].filter(x => !bSet.has(x));
const diffB = [...bSet].filter(x => !aSet.has(x));
export const symmetricDifferenceSet = new Set([...diffA, ...diffB]);

// 14. Об'єднання (Union).
export const unionSet = new Set([...aSet, ...bSet]);

// 15. Числові множини.
export const xSet = new Set([2, 3, 4]); // 2...4
export const ySet = new Set([1, 2, 3, 4, 5, 6]); // 1...6
export const zSet = new Set([3, 4, 2]);
export const x1Set = new Set([5, 6, 7]);

// Хелпери для перевірки підмножин (бо в JS (ES6) немає вбудованих методів isSubset)
const isSubset = (subset: Set<any>, superset: Set<any>) => 
    [...subset].every(elem => superset.has(elem));

const areEqual = (s1: Set<any>, s2: Set<any>) => 
    s1.size === s2.size && isSubset(s1, s2);

// 16. xSet входить в ySet? ySet входить в xSet?
export const xIsSubsetOfY = isSubset(xSet, ySet); // true
export const yIsSubsetOfX = isSubset(ySet, xSet); // false

// 17. xSet містить ySet? ySet містить xSet?
export const xSupersetY = isSubset(ySet, xSet); // false
export const ySupersetX = isSubset(xSet, ySet); // true

// 18. Рівність xSet та zSet.
export const xEqualsZ = areEqual(xSet, zSet); // true

// 19. xSet входить у zSet, але не рівна? (Strict Subset)
export const xStrictSubsetZ = isSubset(xSet, zSet) && !areEqual(xSet, zSet); // false

// 20. xSet містить zSet, але не рівна? (Strict Superset)
export const xStrictSupersetZ = isSubset(zSet, xSet) && !areEqual(xSet, zSet); // false