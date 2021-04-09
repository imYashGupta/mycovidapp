import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from "react-native";
import { THEME } from "../util/THEME";
import AntDesign from "react-native-vector-icons/AntDesign";
import AnimateNumber from "react-native-animate-number";
import { formatNumber } from "../util/helper";
const CardStyle = props => {
  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const showArrow = number => {
    // console.log(number)
    if (!isNaN(number)) {
      if (number > 0) {
        return true;
      }
    }
    return null;
  };

  const validateNumber = (fn, defaultVal, comma) => {
    try {
      let n = fn();
      if (n == undefined) {
        return defaultVal;
      }
      if (comma) {
        return numberWithCommas(fn());
      }
      return fn();
    } catch (e) {
      return defaultVal;
    }
  };

  return (
    <View style={[styles.cmp, props.containerStyle]}>
      <TouchableWithoutFeedback>
        <View style={[styles.block, props.style]}>
          <Text style={[styles.title, { color: props.color }]}>
            {props.title}
          </Text>
          <Text style={styles.value}>
            {/* <AnimateNumber value={parseInt(validateNumber(() => props.value,'0',false)).toFixed(0)} formatter={(val) => parseInt(validateNumber(() => val,'0',false)).toFixed(0) }/> */}
            {formatNumber(props.value, "short")}
          </Text>
          {showArrow(props.desc) ? (
            <Text style={[styles.desc, { color: props.color }]}>
              <AntDesign name="arrowup" /> {formatNumber(props.desc)}
            </Text>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CardStyle;

const styles = StyleSheet.create({
  cmp: {
    width: "50%",
    backgroundColor: "transparent",
    height: 110
  },
  block: {
    elevation: 5,
    flex: 1,
    backgroundColor: THEME.CARD,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    fontFamily: "OpenSans-Medium"
  },
  value: {
    fontSize: 26,
    color: "white",
    fontFamily: "OpenSans-Medium"
  },
  desc: {
    fontSize: 14,
    fontFamily: "OpenSans-Medium"
  }
});
