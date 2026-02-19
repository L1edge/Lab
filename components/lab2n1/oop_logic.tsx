// --- Базові сутності ---

// Точка
export class Point {
    constructor(public x: number, public y: number) {}

    static distance(p1: Point, p2: Point): number {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
}

// Вектор
export class Vector {
    public dx: number;
    public dy: number;

    constructor(p1: Point, p2: Point) {
        this.dx = p2.x - p1.x;
        this.dy = p2.y - p1.y;
    }

    get module(): number {
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    }
}

// Типи фігур
export enum FigureType {
    Unknown = "Невідома",
    Line = "Лінія",
    Triangle = "Трикутник",
    Quadrangle = "Чотирикутник"
}

// --- Абстракція ---
export abstract class Figure {
    constructor(public points: Point[], public name?: string) {}

    abstract get area(): number;
    abstract get perimeter(): number;
    abstract get figureType(): FigureType;
    abstract get details(): string;

    // Рядкове представлення для аналізу
    get description(): string {
        return `${this.name} (${this.details})`;
    }
}

// --- Реалізація ---

export class Line extends Figure {
    constructor(p1: Point, p2: Point, name?: string) { super([p1, p2], name); }
    get figureType() { return FigureType.Line; }
    get length() { return Point.distance(this.points[0], this.points[1]); }
    get perimeter() { return this.length; }
    get area() { return 0; }
    get details() { return `Довжина: ${this.length.toFixed(2)}`; }
}

export class Triangle extends Figure {
    constructor(p1: Point, p2: Point, p3: Point, name?: string) { super([p1, p2, p3], name); }
    get figureType() { return FigureType.Triangle; }
    private get sides() {
        return [
            Point.distance(this.points[0], this.points[1]),
            Point.distance(this.points[1], this.points[2]),
            Point.distance(this.points[2], this.points[0])
        ];
    }
    get perimeter() { return this.sides.reduce((a, b) => a + b, 0); }
    get area() {
        const s = this.perimeter / 2;
        const [a, b, c] = this.sides;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
    get details() { return "Трикутник"; }
}

export class Quadrangle extends Figure {
    constructor(p1: Point, p2: Point, p3: Point, p4: Point, name?: string) { super([p1, p2, p3, p4], name); }
    get figureType() { return FigureType.Quadrangle; }
    
    protected get sides() {
        return [
            Point.distance(this.points[0], this.points[1]),
            Point.distance(this.points[1], this.points[2]),
            Point.distance(this.points[2], this.points[3]),
            Point.distance(this.points[3], this.points[0])
        ];
    }
    
    get perimeter() { return this.sides.reduce((a, b) => a + b, 0); }
    
    get area() {
        const p = this.points;
        let sum1 = 0, sum2 = 0;
        for (let i = 0; i < 4; i++) {
            sum1 += p[i].x * p[(i + 1) % 4].y;
            sum2 += p[i].y * p[(i + 1) % 4].x;
        }
        return Math.abs(sum1 - sum2) / 2;
    }
    
    get details() { return "Довільний чотирикутник"; }
}

export class Rectangle extends Quadrangle {
    get details() { return "Прямокутник"; }
}

export class Rhombus extends Quadrangle {
    get details() { return "Ромб"; }
}

export class Square extends Quadrangle {
    get details() { return "Квадрат"; }
}

// --- НОВІ КОНСТРУКЦІЇ (LAB 2 Part 2) ---

// 1. Структура результату (чотири об'єкти)
export type StringStats = {
    longest: string;
    shortest: string;
    largest: string;  // Лексикографічно найбільше
    smallest: string; // Лексикографічно найменше
};

// 2. Визначення типу Замкнення (Closure)
export type StatsClosure = (result: StringStats) => void;

// 3. Протокол Делегата (Interface)
export interface MathDelegate {
    didFindStringRepresentation(description: string, type: 'longest' | 'shortest' | 'largest' | 'smallest'): void;
}

// --- Mathematics ---
export class Mathematics {
    private _figures: Figure[] = [];
    
    // Властивість для збереження замкнення з конструктора
    private initClosure?: StatsClosure;
    
    // Властивість делегата
    public delegate?: MathDelegate;

    // Конструктор приймає замкнення (optional)
    constructor(closure?: StatsClosure) {
        this.initClosure = closure;
    }

    addFigure(f: Figure) { this._figures.push(f); }
    get figures() { return this._figures; }
    
    get maxAreaFigure() { return this.find((a, b) => a.area > b.area); }
    get minAreaFigure() { return this.find((a, b) => a.area < b.area); }
    get maxPerimeterFigure() { return this.find((a, b) => a.perimeter > b.perimeter); }
    get minPerimeterFigure() { return this.find((a, b) => a.perimeter < b.perimeter); }

    private find(predicate: (a: Figure, b: Figure) => boolean): Figure | null {
        if (this._figures.length === 0) return null;
        return this._figures.reduce((prev, curr) => predicate(prev, curr) ? prev : curr);
    }

    // --- НОВІ МЕТОДИ ---

    // Допоміжний метод для розрахунку статистики рядків
    private calculateStats(): StringStats | null {
        if (this._figures.length === 0) return null;

        const descriptions = this._figures.map(f => f.description);
        
        const longest = descriptions.reduce((a, b) => a.length >= b.length ? a : b);
        const shortest = descriptions.reduce((a, b) => a.length <= b.length ? a : b);
        const largest = descriptions.reduce((a, b) => a >= b ? a : b); // За алфавітом (ASCII)
        const smallest = descriptions.reduce((a, b) => a <= b ? a : b);

        return { longest, shortest, largest, smallest };
    }

    // Метод 1: Повертає асинхронно через передане замкнення
    public analyzeAsync(callback: StatsClosure) {
        console.log("Mathematics: Починаю асинхронний аналіз...");
        setTimeout(() => {
            const stats = this.calculateStats();
            if (stats) {
                // Виклик замкнення
                callback(stats);
                // Виклик делегата (якщо є)
                this.delegate?.didFindStringRepresentation(stats.longest, 'longest');
            }
        }, 1500); // Імітація затримки 1.5 сек
    }

    // Метод 2: Повертає синхронно через замкнення (і використовує замкнення з конструктора)
    public analyzeSync(callback?: StatsClosure) {
        const stats = this.calculateStats();
        if (stats) {
            // 1. Виклик переданого колбеку
            if (callback) callback(stats);
            
            // 2. Виклик замкнення, заданого в конструкторі
            if (this.initClosure) this.initClosure(stats);

            // 3. Делегування
            this.delegate?.didFindStringRepresentation(stats.shortest, 'shortest');
        }
    }
}