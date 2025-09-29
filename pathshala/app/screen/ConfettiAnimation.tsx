import React from "react";
import { View, Animated, StyleSheet } from "react-native";

const ConfettiAnimation = ({ showConfetti, confettiAnim, width, height }) => {
  if (!showConfetti) return null;

  const confettiScale = confettiAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const confettiOpacity = confettiAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={[
        styles.confettiContainer,
        {
          opacity: confettiOpacity,
          transform: [{ scale: confettiScale }],
        },
      ]}
    >
      {Array.from({ length: 30 }).map((_, i) => {
        const size = Math.random() * 12 + 8;
        const color = ["#FF8C00", "#FFA500", "#FFB347", "#FFD700", "#FFE5B4"][
          Math.floor(Math.random() * 5)
        ];
        const left = Math.random() * width;
        const top = Math.random() * height;

        return (
          <Animated.View
            key={i}
            style={[
              styles.confetti,
              {
                width: size,
                height: size,
                backgroundColor: color,
                left,
                top,
                transform: [
                  {
                    rotate: `${Math.random() * 360}deg`,
                  },
                ],
              },
            ]}
          />
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  confettiContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  confetti: {
    position: "absolute",
    borderRadius: 2,
  },
});

export default ConfettiAnimation;
