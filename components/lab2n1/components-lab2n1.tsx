import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, Button, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Svg, { Line, Polygon, Circle, Text as SvgText, G } from 'react-native-svg';
import * as MathLogic from '@/components/lab2n1/oop_logic';

const CANVAS_SIZE = 350;
const SCALE = 35;
const PADDING = 20;

// Реалізація Делегата
class MyDelegate implements MathLogic.MathDelegate {
    private onUpdate: (msg: string) => void;

    constructor(onUpdate: (msg: string) => void) {
        this.onUpdate = onUpdate;
    }

    didFindStringRepresentation(description: string, type: string): void {
        this.onUpdate(`🔔 DELEGATE: Знайдено [${type}]: "${description}"`);
    }
}

export default function Lab2n1() {
    const [log, setLog] = useState<string[]>([]);
    const [figures, setFigures] = useState<MathLogic.Figure[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [closureResult, setClosureResult] = useState<string>("Очікування...");
    const [loading, setLoading] = useState(false);
    
    // Зберігаємо екземпляр класу
    const mathRef = useRef<MathLogic.Mathematics | null>(null);

    useEffect(() => {
        runMathDemo();
    }, []);

    const runMathDemo = () => {
        const logs: string[] = [];
        
        // --- 1. Ініціалізація з Замкненням (Constructor Closure) ---
        const math = new MathLogic.Mathematics((result) => {
            logs.push(`📦 CONSTRUCTOR CLOSURE: Отримано дані! Longest: ${result.longest}`);
        });

        // --- 2. Призначення Делегата ---
        math.delegate = new MyDelegate((msg) => {
            // Додаємо повідомлення від делегата в логи
            setLog(prev => [msg, ...prev]); 
        });

        mathRef.current = math;

        // Створення фігур
        const line = new MathLogic.Line(new MathLogic.Point(1, 8), new MathLogic.Point(4, 8), "Лінія A");
        const triangle = new MathLogic.Triangle(new MathLogic.Point(1, 1), new MathLogic.Point(1, 4), new MathLogic.Point(3, 1), "Трикутник");
        const rect = new MathLogic.Rectangle(new MathLogic.Point(5, 5), new MathLogic.Point(5, 7), new MathLogic.Point(8, 7), new MathLogic.Point(8, 5), "Прямокутник");
        const rhombus = new MathLogic.Rhombus(new MathLogic.Point(6, 0), new MathLogic.Point(7.5, 2), new MathLogic.Point(6, 4), new MathLogic.Point(4.5, 2), "Ромб");
        const square = new MathLogic.Square(new MathLogic.Point(1, 5), new MathLogic.Point(1, 7), new MathLogic.Point(3, 7), new MathLogic.Point(3, 5), "Квадрат");

        math.addFigure(line);
        math.addFigure(triangle);
        math.addFigure(rect);
        math.addFigure(rhombus);
        math.addFigure(square);

        setFigures(math.figures);

        // Логування базових даних
        math.figures.forEach((f: MathLogic.Figure) => {
            logs.push(`🔹 [${f.details}] ${f.name}`);
            logs.push(`   S: ${f.area.toFixed(2)} | P: ${f.perimeter.toFixed(2)}`);
            logs.push('--------------------------------');
        });
        setLog(logs);

        setStats({
            maxArea: math.maxAreaFigure?.name,
            minArea: math.minAreaFigure?.name,
            maxPerim: math.maxPerimeterFigure?.name,
            minPerim: math.minPerimeterFigure?.name,
        });
    };

    // --- Обробники кнопок ---

    const handleAsyncAnalysis = () => {
        setLoading(true);
        setClosureResult("Аналіз...");
        
        // Виклик асинхронної функції з замкненням
        mathRef.current?.analyzeAsync((res) => {
            setLoading(false);
            const text = `⏳ ASYNC RESULT:\nLongest: ${res.longest}\nShortest: ${res.shortest}`;
            setClosureResult(text);
        });
    };

    const handleSyncAnalysis = () => {
        // Виклик синхронної функції
        // Це також запустить Constructor Closure, який ми задали при ініціалізації
        mathRef.current?.analyzeSync((res) => {
            const text = `⚡ SYNC RESULT:\nLargest (Alpha): ${res.largest}\nSmallest (Alpha): ${res.smallest}`;
            setClosureResult(text);
        });
    };

    const toScreen = (val: number, isY: boolean = false) => {
        if (isY) return CANVAS_SIZE - (val * SCALE + PADDING);
        return val * SCALE + PADDING;
    };

    const renderFigure = (fig: MathLogic.Figure, index: number) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#C7F464'];
        const color = colors[index % colors.length];
        const pointsString = fig.points.map((p: MathLogic.Point) => `${toScreen(p.x)},${toScreen(p.y, true)}`).join(' ');
        const cx = fig.points.reduce((s:number, p:MathLogic.Point) => s + p.x, 0) / fig.points.length;
        const cy = fig.points.reduce((s:number, p:MathLogic.Point) => s + p.y, 0) / fig.points.length;

        return (
            <G key={index}>
                {fig.figureType === MathLogic.FigureType.Line ? (
                    <Line x1={toScreen(fig.points[0].x)} y1={toScreen(fig.points[0].y, true)} x2={toScreen(fig.points[1].x)} y2={toScreen(fig.points[1].y, true)} stroke={color} strokeWidth="3" />
                ) : (
                    <Polygon points={pointsString} fill={color} fillOpacity="0.3" stroke={color} strokeWidth="2" />
                )}
                {fig.points.map((p: MathLogic.Point, i: number) => (
                    <Circle key={i} cx={toScreen(p.x)} cy={toScreen(p.y, true)} r="3" fill="white" stroke={color} />
                ))}
                <SvgText x={toScreen(cx)} y={toScreen(cy, true)} fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">{fig.name}</SvgText>
            </G>
        );
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.canvasContainer}>
                <Svg height={CANVAS_SIZE} width={CANVAS_SIZE}>
                    <Line x1="20" y1={CANVAS_SIZE - 20} x2={CANVAS_SIZE} y2={CANVAS_SIZE - 20} stroke="gray" />
                    <Line x1="20" y1="0" x2="20" y2={CANVAS_SIZE - 20} stroke="gray" />
                    {figures.map((fig, i) => renderFigure(fig, i))}
                </Svg>
            </View>

            <View style={styles.controlPanel}>
                <Button title="Async Analyze (1.5s)" onPress={handleAsyncAnalysis} />
                <View style={{width: 10}} />
                <Button title="Sync Analyze" onPress={handleSyncAnalysis} color="orange" />
            </View>

            <View style={styles.resultBox}>
                {loading ? <ActivityIndicator color="white" /> : <ThemedText style={styles.resultText}>{closureResult}</ThemedText>}
            </View>

            <ScrollView style={styles.logContainer}>
                {log.map((line, index) => (
                    <ThemedText key={index} style={styles.logText}>{line}</ThemedText>
                ))}
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { gap: 15, height: 750 },
    canvasContainer: { alignItems: 'center', backgroundColor: '#222', borderRadius: 10, borderWidth: 1, borderColor: '#444' },
    controlPanel: { flexDirection: 'row', justifyContent: 'center', marginVertical: 5 },
    resultBox: { padding: 10, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 8, minHeight: 60, justifyContent: 'center' },
    resultText: { fontSize: 13, fontFamily: 'monospace', color: '#8F8' },
    logContainer: { backgroundColor: 'rgba(0,0,0,0.05)', padding: 10, borderRadius: 8, flex: 1 },
    logText: { fontSize: 11, fontFamily: 'monospace', marginBottom: 2 }
});