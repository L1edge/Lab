// --- ЗАВДАННЯ 1: Факторіал ---
export const calculateFactorial = (n: number): number => {
    if (n < 0) return 0; // Факторіал не існує для від'ємних
    if (n === 0) return 1;
    let result = 1;
    // Не використовуємо вбудованих функцій, тільки цикл
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
};

// --- ЗАВДАННЯ 2: Сортування ---
// Допоміжна функція заміни (щоб не юзати swap)
const manualSwap = (arr: number[], i: number, j: number) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

// Бульбашка (Bubble Sort)
export const bubbleSort = (originalArr: number[]): number[] => {
    const arr = [...originalArr]; // Копія
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                manualSwap(arr, j, j + 1);
            }
        }
    }
    return arr;
};

// Вибір (Selection Sort)
export const selectionSort = (originalArr: number[]): number[] => {
    const arr = [...originalArr]; // Копія
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        manualSwap(arr, minIdx, i);
    }
    return arr;
};

// --- ЗАВДАННЯ 3: Аналізатор символа ---
export const analyzeCharacter = (char: string): string => {
    if (char.length !== 1) return "Введіть один символ";
    
    const code = char.charCodeAt(0);
    let result = [`Символ: "${char}"`];

    // Цифри (0-9)
    if (code >= 48 && code <= 57) {
        result.push("Це цифра");
    } else {
        result.push("Це літера");
        
        // Регістр
        if (char === char.toUpperCase() && char !== char.toLowerCase()) {
            result.push("Великий регістр (Uppercase)");
        } else {
            result.push("Малий регістр (Lowercase)");
        }

        // Абетка (спрощена перевірка за Unicode діапазонами)
        // Англійська: A-Z (65-90), a-z (97-122)
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            result.push("Англійська абетка");
        } 
        // Українська (Є, І, Ї, Ґ + кирилиця)
        else if (/[а-щА-ЩЬьЮюЯяЄєІіЇїҐґ]/.test(char)) {
            result.push("Українська абетка");
        } else {
            result.push("Інша абетка або спецсимвол");
        }
    }

    return result.join(", ");
};

// --- ЗАВДАННЯ 4: Аналіз рядка ---
export const analyzeString = (str: string): Record<string, number> => {
    const stats: Record<string, number> = {};
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (stats[char]) {
            stats[char]++;
        } else {
            stats[char] = 1;
        }
    }
    return stats; // Повертає таблицю { "a": 2, "b": 1 ... }
};

// --- ЗАВДАННЯ 5: Калькулятор ---
// Функція піднесення до степеня без Math.pow
const manualPower = (base: number, exponent: number): number => {
    if (exponent === 0) return 1;
    let res = 1;
    for (let i = 0; i < exponent; i++) res *= base;
    return res;
};

// Тип операції
type Operation = (a: number, b: number) => number;

// Функції-операції
export const ops: Record<string, Operation> = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    modulo: (a, b) => a % b,
    power: (a, b) => manualPower(a, b),
};

// Головна функція калькулятора (приймає функцію як аргумент)
export const calculate = (a: number, b: number, operation: Operation): number => {
    return operation(a, b);
};

// --- ЗАВДАННЯ 6: Точка і Коло ---
// Заборонено класи, тому використовуємо прості об'єкти (type)
export type Point = { x: number; y: number };
export type Circle = { x: number; y: number; r: number };

export const checkPointInCircles = (circles: Circle[], point: Point): Circle | null => {
    let bestCircle: Circle | null = null;

    for (let i = 0; i < circles.length; i++) {
        const c = circles[i];
        // Формула відстані: (x - x0)^2 + (y - y0)^2 <= R^2
        // Без Math.pow
        const dx = point.x - c.x;
        const dy = point.y - c.y;
        const distSquared = (dx * dx) + (dy * dy);
        const radiusSquared = c.r * c.r;

        if (distSquared <= radiusSquared) {
            // Якщо точка входить, шукаємо найбільше коло (за радіусом)
            if (bestCircle === null || c.r > bestCircle.r) {
                bestCircle = c;
            }
        }
    }
    return bestCircle;
};