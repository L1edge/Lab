// --- ЗАВДАННЯ 3 (СЛОВНИКИ / DICTIONARIES) ---

// 1. Опишіть словник nDict (1:One ... 5:Five).
export const nDict: Record<string, string> = {
    "1": "One",
    "2": "Two",
    "3": "Three",
    "4": "Four",
    "5": "Five"
};

// 2. Значення за ключем "3".
export const valueKey3 = nDict["3"];

// 3. Значення за індексом ключа "4".
const keysForIndex = Object.keys(nDict); 
const indexOfKey4 = keysForIndex.indexOf("4"); 
export const valueByIndexKey4 = indexOfKey4 !== -1 ? nDict[keysForIndex[indexOfKey4]] : "Not found";

// 4. Створіть mutable словник mNDict (копію).
export const mNDict: Record<string, string> = { ...nDict };

// 5. Додайте елементи 6:Seven та 7:Six.
export const mNDictAdded: Record<string, string> = { ...mNDict, "6": "Seven", "7": "Six" };

// 6. Оновіть значення. 
// ДОДАНО: : Record<string, string>, щоб TypeScript не звужував тип.
export const mNDictUpdated: Record<string, string> = Object.assign({}, mNDictAdded, {
    "6": "Six",
    "7": "Seven",
    "8": "Eight"
});

// 7. Видаліть елемент за ключем 5.
// ДОДАНО: : Record<string, string>
const tempDelete5: Record<string, string> = { ...mNDictUpdated };
delete tempDelete5["5"]; 
export const mNDictNo5 = tempDelete5;

// 8. Видаліть елемент за індексом ключа "4".
// ДОДАНО: : Record<string, string>
const tempDeleteIndex4: Record<string, string> = { ...mNDictNo5 };
const currentKeys = Object.keys(tempDeleteIndex4);
const idx4 = currentKeys.indexOf("4");

if (idx4 !== -1) {
    // Тепер це дозволено, бо ми вказали Record<string, string>
    delete tempDeleteIndex4[currentKeys[idx4]];
}
export const mNDictNoIndex4 = tempDeleteIndex4;

// 9. Відстань між 1:One та 7:Seven.
const finalKeys = Object.keys(mNDictNoIndex4);
const index1 = finalKeys.indexOf("1");
const index7 = finalKeys.indexOf("7");
export const distance1to7 = (index1 !== -1 && index7 !== -1) 
    ? Math.abs(index7 - index1) 
    : "Один з ключів відсутній";

// 10. Масив усіх ключів.
export const mNDictKeys = Object.keys(mNDictNoIndex4);

// 11. Масив усіх значень.
export const mNDictValues = Object.values(mNDictNoIndex4);

// 12. Кількість елементів, ключів та значень.
export const countElements = Object.keys(mNDictNoIndex4).length;
export const countKeys = mNDictKeys.length;
export const countValues = mNDictValues.length;

// 13. Рядкове представлення словника.
export const mNDictString = JSON.stringify(mNDictNoIndex4);