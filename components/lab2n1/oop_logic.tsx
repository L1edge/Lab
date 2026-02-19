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
}

// --- Реалізація ---

// 1. Лінія
export class Line extends Figure {
    constructor(p1: Point, p2: Point, name?: string) { super([p1, p2], name); }
    get figureType() { return FigureType.Line; }
    get length() { return Point.distance(this.points[0], this.points[1]); }
    get perimeter() { return this.length; }
    get area() { return 0; }
    get details() { return `Довжина: ${this.length.toFixed(2)}`; }
}

// 2. Трикутник (Формула Герона)
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

// 3. Чотирикутник (Базовий клас)
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

// 3.1 Прямокутник (Наслідує Чотирикутник)
export class Rectangle extends Quadrangle {
    get details() { return "Прямокутник"; }
}

// 3.2 Ромб (Наслідує Чотирикутник)
export class Rhombus extends Quadrangle {
    get details() { return "Ромб"; }
}

// 3.3 Квадрат (Наслідує Чотирикутник)
export class Square extends Quadrangle {
    get details() { return "Квадрат"; }
}

// --- Mathematics ---
export class Mathematics {
    private _figures: Figure[] = [];
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
}