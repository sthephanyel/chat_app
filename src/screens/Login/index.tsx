import 'react-native-url-polyfill/auto';
import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {AuthGoogleComponent} from '../../components/auth';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {transparentize} from 'polished';
import {useTheme} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

export default function Login() {
  const {editProfile} = useSelector((state: RootState) => state.profile);
  const theme = useTheme();
  const op = useSharedValue(0);
  const sv = useSharedValue(0);
  sv.value = withRepeat(
    withTiming(100, {duration: 800}, (finished, currentValue) => {
      if (finished) {
        console.log('current withRepeat value is ' + currentValue);
      }
      if (currentValue == 0) {
        op.value = withTiming(1, {duration: 10});
      }
      if (currentValue == 100) {
        op.value = withTiming(0);
      }
    }),
    -1,
    true,
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withRepeat(
            withSequence(
              withTiming(1.2, {duration: 1000}),
              withTiming(1.6, {duration: 1000}),
            ),
            -1,
            true,
          ),
        },
      ],
    };
  });

  const animated2Styles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withDelay(
            500,
            withRepeat(
              withSequence(
                withTiming(1.2, {duration: 1000}),
                withTiming(1.6, {duration: 1000}),
              ),
              -1,
              true,
            ),
          ),
        },
      ],
    };
  });

  const animated3Styles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withDelay(
            800,
            withRepeat(
              withSequence(
                withTiming(1.2, {duration: 1000}),
                withTiming(1.6, {duration: 1000}),
              ),
              -1,
              true,
            ),
          ),
        },
      ],
    };
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <LinearGradient
        colors={[theme.colors.background, '#0B2985']}
        style={{
          flex: 1,
          //   backgroundColor: theme.colors.background,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            position: 'relative',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AuthGoogleComponent style={{zIndex: 9999}} />
          <Animated.View
            style={[
              animatedStyles,
              {
                width: 150,
                height: 150,
                backgroundColor: transparentize(0.2, theme.colors.primary),
                borderRadius: 100,
                position: 'absolute',
              },
            ]}
          />
          <Animated.View
            style={[
              animated2Styles,
              {
                width: 150,
                height: 150,
                backgroundColor: transparentize(0.4, theme.colors.primary),
                borderRadius: 100,
                position: 'absolute',
              },
            ]}
          />
          <Animated.View
            style={[
              animated3Styles,
              {
                width: 150,
                height: 150,
                backgroundColor: transparentize(0.6, theme.colors.primary),
                borderRadius: 100,
                position: 'absolute',
              },
            ]}
          />
        </View>
      </LinearGradient>
      {/* <Auth/> */}
    </SafeAreaView>
  );
}
