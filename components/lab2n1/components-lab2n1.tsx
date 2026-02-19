import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Svg, { Line, Polygon, Circle, Text as SvgText, G } from 'react-native-svg';
import * as MathLogic from '@/components/lab2n1/oop_logic';

const CANVAS_SIZE = 350; // Трохи збільшив полотно
const SCALE = 35;        // Трохи зменшив масштаб, щоб все влізло
const PADDING = 20;

export default function Lab2n1() {
    const [log, setLog] = useState<string[]>([]);
    const [figures, setFigures] = useState<MathLogic.Figure[]>([]);
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        runMathDemo();
    }, []);

    const runMathDemo = () => {
        const logs: string[] = [];
        const math = new MathLogic.Mathematics();

        // --- СТВОРЕННЯ ФІГУР ---

        // 1. Лінія
        const line = new MathLogic.Line(
            new MathLogic.Point(1, 8), 
            new MathLogic.Point(4, 8), 
            "Лінія A"
        );
        
        // 2. Трикутник
        const triangle = new MathLogic.Triangle(
            new MathLogic.Point(1, 1), 
            new MathLogic.Point(1, 4), 
            new MathLogic.Point(3, 1), 
            "Трикутник"
        );
        
        // 3. Прямокутник (Rectangle) - Ширина 3, Висота 2
        // Координати: (5, 5) -> (5, 7) -> (8, 7) -> (8, 5)
        const rect = new MathLogic.Rectangle(
            new MathLogic.Point(5, 5),
            new MathLogic.Point(5, 7),
            new MathLogic.Point(8, 7),
            new MathLogic.Point(8, 5),
            "Прямокутник"
        );

        // 4. Ромб (Rhombus) - Витягнутий
        // Центр десь в (6, 2). Вершини: (6, 0), (7, 2), (6, 4), (5, 2)
        const rhombus = new MathLogic.Rhombus(
            new MathLogic.Point(6, 0),
            new MathLogic.Point(7.5, 2),
            new MathLogic.Point(6, 4),
            new MathLogic.Point(4.5, 2),
            "Ромб"
        );

        // 5. Квадрат (Square)
        const square = new MathLogic.Square(
            new MathLogic.Point(1, 5),
            new MathLogic.Point(1, 7),
            new MathLogic.Point(3, 7),
            new MathLogic.Point(3, 5),
            "Квадрат"
        );

        math.addFigure(line);
        math.addFigure(triangle);
        math.addFigure(rect);
        math.addFigure(rhombus);
        math.addFigure(square);

        setFigures(math.figures);

        // Логування
        math.figures.forEach((f: MathLogic.Figure) => {
            logs.push(`🔹 [${f.details}] ${f.name}`);
            logs.push(`   S (Площа): ${f.area.toFixed(2)}`);
            logs.push(`   P (Периметр): ${f.perimeter.toFixed(2)}`);
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

    const toScreen = (val: number, isY: boolean = false) => {
        if (isY) return CANVAS_SIZE - (val * SCALE + PADDING);
        return val * SCALE + PADDING;
    };

    const renderFigure = (fig: MathLogic.Figure, index: number) => {
        // Палітра кольорів
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#C7F464'];
        const color = colors[index % colors.length];
        
        const pointsString = fig.points.map((p: MathLogic.Point) => `${toScreen(p.x)},${toScreen(p.y, true)}`).join(' ');
        
        // Центр для тексту
        const cx = fig.points.reduce((s:number, p:MathLogic.Point) => s + p.x, 0) / fig.points.length;
        const cy = fig.points.reduce((s:number, p:MathLogic.Point) => s + p.y, 0) / fig.points.length;

        return (
            <G key={index}>
                {fig.figureType === MathLogic.FigureType.Line ? (
                    <Line
                        x1={toScreen(fig.points[0].x)} y1={toScreen(fig.points[0].y, true)}
                        x2={toScreen(fig.points[1].x)} y2={toScreen(fig.points[1].y, true)}
                        stroke={color} strokeWidth="3"
                    />
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
                    {/* Осі */}
                    <Line x1="20" y1={CANVAS_SIZE - 20} x2={CANVAS_SIZE} y2={CANVAS_SIZE - 20} stroke="gray" />
                    <Line x1="20" y1="0" x2="20" y2={CANVAS_SIZE - 20} stroke="gray" />
                    <SvgText x="10" y="20" fill="gray" fontSize="10">Y</SvgText>
                    <SvgText x={CANVAS_SIZE - 20} y={CANVAS_SIZE - 5} fill="gray" fontSize="10">X</SvgText>
                    
                    {figures.map((fig, i) => renderFigure(fig, i))}
                </Svg>
            </View>

            <View style={styles.statsCard}>
                <ThemedText>Max S: <ThemedText type="defaultSemiBold">{stats?.maxArea}</ThemedText></ThemedText>
                <ThemedText>Max P: <ThemedText type="defaultSemiBold">{stats?.maxPerim}</ThemedText></ThemedText>
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
    container: { gap: 15, height: 650 },
    canvasContainer: { alignItems: 'center', backgroundColor: '#222', borderRadius: 10, borderWidth: 1, borderColor: '#444' },
    statsCard: { backgroundColor: 'rgba(0, 150, 255, 0.1)', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(0, 150, 255, 0.3)' },
    logContainer: { backgroundColor: 'rgba(0,0,0,0.05)', padding: 10, borderRadius: 8, flex: 1 },
    logText: { fontSize: 11, fontFamily: 'monospace', marginBottom: 2 }
});