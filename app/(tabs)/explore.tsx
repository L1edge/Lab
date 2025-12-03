import React from "react";
import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";

import { Collapsible } from "@/components/ui/collapsible";
import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import * as Elements1 from "@/constants/lab1/elements1-lab1";
import * as Elements2 from "@/constants/lab1/elements2-lab1";
import * as Elements3 from "@/constants/lab1/elements3-lab1";

import * as Lab2Task1 from "@/constants/lab2/elements1-lab2";
import * as Lab2Task2 from "@/constants/lab2/elements2-lab2";
import * as Lab2Task3 from "@/constants/lab2/elements3-lab2";

import Lab3 from '@/components/components-lab3';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Labs
        </ThemedText>
      </ThemedView>

      <Collapsible title="Lab 1">
        <ThemedView>
          <ThemedText style={{ fontWeight: "700" }}>Task 1</ThemedText>

          {Object.entries(Elements1).map(([key, value]) => (
            <React.Fragment key={`e1-${key}`}>
              <ThemedText>
                {key}: {String(value)}
              </ThemedText>
            </React.Fragment>
          ))}

          <ThemedText style={{ fontWeight: "700", marginTop: 8 }}>
            Task 2
          </ThemedText>

          {Object.entries(Elements2).map(([key, value]) => (
            <React.Fragment key={`e2-${key}`}>
              <ThemedText>
                {key}: {String(value)}
              </ThemedText>
            </React.Fragment>
          ))}

          <ThemedText style={{ fontWeight: "700", marginTop: 8 }}>
            Task 3
          </ThemedText>

          {Object.entries(Elements3).map(([key, value]) => (
            <React.Fragment key={`e3-${key}`}>
              <ThemedText>
                {key}: {String(value)}
              </ThemedText>
            </React.Fragment>
          ))}
<ThemedText>
  {Elements3.decimalNumber1?.toString() ?? "Значення не задане"}
</ThemedText>
<ThemedText>
  {Elements3.decimalNumber2?.toString() ?? "Значення не задане"}
</ThemedText>
        </ThemedView>
      </Collapsible>

      <Collapsible title="Lab 2">
        <ThemedView>
            <ThemedText style={{ fontWeight: "700" }}>Task 1 (Arrays)</ThemedText>
            
            {/* Проходимось по всіх експортах з файлу elements1-lab2 */}
            {Object.entries(Lab2Task1).map(([key, value]) => (
                <ThemedView key={key} style={{ marginBottom: 4 }}>
                    <ThemedText style={{ color: '#888', fontSize: 12 }}>{key}:</ThemedText>
                    <ThemedText>
                        {/* Перевірка: якщо масив, з'єднати коми, інакше перетворити в рядок */}
                        {Array.isArray(value) ? `[${value.join(', ')}]` : String(value)}
                    </ThemedText>
                </ThemedView>
            ))}
              {/* --- TASK 2 (Sets) --- */}
              <ThemedText style={{ fontWeight: "700", marginTop: 10 }}>Task 2 (Sets)</ThemedText>

              {Object.entries(Lab2Task2).map(([key, value]) => (
                <ThemedView key={key} style={{ marginBottom: 4 }}>
                  <ThemedText style={{ color: '#888', fontSize: 12 }}>{key}:</ThemedText>
                  <ThemedText>
                    {/* ПЕРЕВІРКА: Якщо це Set -> перетворюємо в масив -> з'єднуємо комою */}
                    {value instanceof Set 
                      ? `{ ${Array.from(value).join(', ')} }` 
                      : Array.isArray(value) 
                        ? `[${value.join(', ')}]` 
                        : String(value)}
                  </ThemedText>
                </ThemedView>
              ))}


                {/* --- TASK 3: Dictionaries (НОВЕ) --- */}
                    <ThemedText style={{ fontWeight: "700", marginTop: 10 }}>Task 3 (Dictionaries)</ThemedText>
                    {Object.entries(Lab2Task3).map(([key, value]) => (
                      <ThemedView key={key} style={{ marginBottom: 4 }}>
                        <ThemedText style={{ color: '#888', fontSize: 12 }}>{key}:</ThemedText>
                        <ThemedText>
                            {/* Перевірка: якщо це об'єкт (але не null і не масив), виводимо як JSON */}
                            {typeof value === 'object' && value !== null && !Array.isArray(value)
                                ? JSON.stringify(value).replace(/,/g, ', ') // Красивий JSON в один рядок
                                : Array.isArray(value)
                                    ? `[${value.join(', ')}]`
                                    : String(value)
                            }
                        </ThemedText>
                      </ThemedView>
                    ))}
        </ThemedView>
      </Collapsible>

      <Collapsible title="Lab 3">
        <ThemedText>Tasks</ThemedText>
        <Lab3 />
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});