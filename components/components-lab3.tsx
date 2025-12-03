import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import * as Logic from '@/constants/lab3/logic'; // Імпорт логіки

export default function Lab3() {
    
    // --- State Task 1 ---
    const [factInput, setFactInput] = useState('');
    const [factResult, setFactResult] = useState<string>('');

    // --- State Task 2 ---
    const [sortInput, setSortInput] = useState('');
    const [sortResult, setSortResult] = useState<string>('');

    // --- State Task 3 ---
    const [charInput, setCharInput] = useState('');
    const [charResult, setCharResult] = useState<string>('');

    // --- State Task 4 ---
    const [strInput, setStrInput] = useState('');
    const [strResult, setStrResult] = useState<string>('');

    // --- State Task 5 ---
    const [calcA, setCalcA] = useState('');
    const [calcB, setCalcB] = useState('');
    const [calcRes, setCalcRes] = useState<string>('');

    // --- State Task 6 ---
    const [pointX, setPointX] = useState('');
    const [pointY, setPointY] = useState('');
    const [circleResult, setCircleResult] = useState<string>('');
    
    // Набір кіл
    const circles: Logic.Circle[] = [
        { x: 0, y: 0, r: 5 },
        { x: 2, y: 2, r: 2 },
        { x: 10, y: 10, r: 3 },
        { x: 0, y: 0, r: 10 }
    ];

    // --- Handlers ---

    const handleFactorial = () => {
        const num = parseInt(factInput);
        if (isNaN(num)) return setFactResult("Введіть число");
        setFactResult(Logic.calculateFactorial(num).toString());
    };

    const handleSort = (type: 'bubble' | 'select') => {
        const arr = sortInput.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
        if (arr.length === 0) return setSortResult("Введіть числа через кому");
        
        const sorted = type === 'bubble' 
            ? Logic.bubbleSort(arr) 
            : Logic.selectionSort(arr);
        
        setSortResult(`${type === 'bubble' ? 'Bubble' : 'Selection'}: [${sorted.join(', ')}]`);
    };

    const handleCharAnalysis = () => {
        setCharResult(Logic.analyzeCharacter(charInput));
    };

    const handleStrAnalysis = () => {
        const res = Logic.analyzeString(strInput);
        const str = Object.entries(res).map(([key, val]) => `'${key}': ${val}`).join('\n');
        setStrResult(str);
    };

    const handleCalc = (opName: string) => {
        const a = parseFloat(calcA);
        const b = parseFloat(calcB);
        if (isNaN(a) || isNaN(b)) return setCalcRes("Невірні числа");

        const opFunc = Logic.ops[opName];
        if (opFunc) {
            const res = Logic.calculate(a, b, opFunc);
            setCalcRes(res.toString());
        }
    };

    const handleCircle = () => {
        const x = parseFloat(pointX);
        const y = parseFloat(pointY);
        if (isNaN(x) || isNaN(y)) return setCircleResult("Невірні координати");

        const found = Logic.checkPointInCircles(circles, { x, y });
        if (found) {
            setCircleResult(`Найбільше коло: R=${found.r} at (${found.x}, ${found.y})`);
        } else {
            setCircleResult("Точка не входить у жодне з кіл");
        }
    };

    return (
        // ТУТ МИ ВИКОРИСТОВУЄМО styles.container ЗАМІСТЬ ІНЛАЙН СТИЛЮ
        <ThemedView style={styles.container}>
            
            {/* Task 1 */}
            <View style={styles.card}>
                <ThemedText type="defaultSemiBold">1. Факторіал</ThemedText>
                <TextInput 
                    style={styles.input} 
                    placeholder="Введіть число (n)" 
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    onChangeText={setFactInput} 
                />
                <Button title="Обчислити" onPress={handleFactorial} />
                <ThemedText>Result: {factResult}</ThemedText>
            </View>

            {/* Task 2 */}
            <View style={styles.card}>
                <ThemedText type="defaultSemiBold">2. Сортування</ThemedText>
                <TextInput 
                    style={styles.input} 
                    placeholder="Числа через кому (3, 1, 5...)" 
                    placeholderTextColor="#888"
                    onChangeText={setSortInput} 
                />
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Button title="Bubble Sort" onPress={() => handleSort('bubble')} />
                    <Button title="Selection Sort" onPress={() => handleSort('select')} />
                </View>
                <ThemedText>Result: {sortResult}</ThemedText>
            </View>

            {/* Task 3 */}
            <View style={styles.card}>
                <ThemedText type="defaultSemiBold">3. Аналіз символа</ThemedText>
                <TextInput 
                    style={styles.input} 
                    placeholder="Один символ" 
                    placeholderTextColor="#888"
                    maxLength={1}
                    onChangeText={setCharInput} 
                />
                <Button title="Аналіз" onPress={handleCharAnalysis} />
                <ThemedText>Result: {charResult}</ThemedText>
            </View>

            {/* Task 4 */}
            <View style={styles.card}>
                <ThemedText type="defaultSemiBold">4. Частота символів</ThemedText>
                <TextInput 
                    style={styles.input} 
                    placeholder="Введіть рядок" 
                    placeholderTextColor="#888"
                    onChangeText={setStrInput} 
                />
                <Button title="Аналіз" onPress={handleStrAnalysis} />
                <ThemedText>Result:</ThemedText>
                <ThemedText style={{ fontSize: 12 }}>{strResult}</ThemedText>
            </View>

            {/* Task 5 */}
            <View style={styles.card}>
                <ThemedText type="defaultSemiBold">5. Калькулятор (callbacks)</ThemedText>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <TextInput 
                        style={[styles.input, { flex: 1 }]} 
                        placeholder="A" keyboardType="numeric" 
                        placeholderTextColor="#888"
                        onChangeText={setCalcA} 
                    />
                    <TextInput 
                        style={[styles.input, { flex: 1 }]} 
                        placeholder="B" keyboardType="numeric" 
                        placeholderTextColor="#888"
                        onChangeText={setCalcB} 
                    />
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
                    <Button title="+" onPress={() => handleCalc('add')} />
                    <Button title="-" onPress={() => handleCalc('subtract')} />
                    <Button title="*" onPress={() => handleCalc('multiply')} />
                    <Button title="%" onPress={() => handleCalc('modulo')} />
                    <Button title="^" onPress={() => handleCalc('power')} />
                </View>
                <ThemedText>Result: {calcRes}</ThemedText>
            </View>

            {/* Task 6 */}
            <View style={styles.card}>
                <ThemedText type="defaultSemiBold">6. Точка в колі</ThemedText>
                <ThemedText style={{ fontSize: 10, color: '#666' }}>
                    Кола: (0,0,R5), (2,2,R2), (10,10,R3), (0,0,R10)
                </ThemedText>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <TextInput 
                        style={[styles.input, { flex: 1 }]} 
                        placeholder="X" keyboardType="numeric" 
                        placeholderTextColor="#888"
                        onChangeText={setPointX} 
                    />
                    <TextInput 
                        style={[styles.input, { flex: 1 }]} 
                        placeholder="Y" keyboardType="numeric" 
                        placeholderTextColor="#888"
                        onChangeText={setPointY} 
                    />
                </View>
                <Button title="Перевірити" onPress={handleCircle} />
                <ThemedText>Result: {circleResult}</ThemedText>
            </View>

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 500,        // Обмеження ширини
        alignSelf: 'center',  // Центрування
        gap: 20,
        paddingVertical: 10,
    },
    card: {
        backgroundColor: 'rgba(150, 150, 150, 0.1)',
        padding: 15,
        borderRadius: 12,
        gap: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgba(128, 128, 128, 0.5)',
        borderRadius: 8,
        padding: 10,
        color: '#808080',
        backgroundColor: 'rgba(255,255,255,0.05)',
        fontSize: 16,
    }
});