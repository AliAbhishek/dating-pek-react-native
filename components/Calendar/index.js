import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {Text, View, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../utils/Constants';
import TextField from '../TextField';

const formatDate = dateString => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('default', {month: 'short'});
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const RNCalendar = ({style, selected, setSelected, showLabel}) => {
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().split('T')[0],
  );

  const renderHeader = () => {
    const date = new Date(currentMonth);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', {month: 'long'});

    return (
      <View style={[styles.headerContainer, style]}>
        <Text style={styles.yearText}>{year}</Text>
        <Text style={styles.monthText}>{month}</Text>
      </View>
    );
  };

  const onMonthChange = month => {
    setCurrentMonth(month.dateString);
  };

  return (
    <View>
      {showLabel && (
        <TextField
          placeholder={`Enter your DOB`}
          // onChange={setInputValue}
          // defaultValue={inputValue}
          value={selected ? formatDate(selected) : ''}
          disabled={false}
        />
      )}
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        onMonthChange={onMonthChange}
        renderHeader={renderHeader}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: 'orange',
          },
        }}
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          dayTextColor: COLORS.BLACK,
          selectedDayBackgroundColor: COLORS.PRIMARY,
          todayTextColor: COLORS.SECONDARY,
          arrowColor: COLORS.PRIMARY,
          textDayFontFamily: FONTS.SEMI_BOLD,
          textMonthFontFamily: FONTS.SEMI_BOLD,
          textDayHeaderFontFamily: FONTS.SEMI_BOLD,
          textDayFontSize: 14,
          textMonthFontSize: 20,
          'stylesheet.calendar.header': {
            dayTextAtIndex0: {
              color: COLORS.LIGHT_BLACK,
            },
            dayTextAtIndex1: {
              color: COLORS.LIGHT_BLACK,
            },
            dayTextAtIndex2: {
              color: COLORS.LIGHT_BLACK,
            },
            dayTextAtIndex3: {
              color: COLORS.LIGHT_BLACK,
            },
            dayTextAtIndex4: {
              color: COLORS.LIGHT_BLACK,
            },
            dayTextAtIndex5: {
              color: COLORS.LIGHT_BLACK,
            },
            dayTextAtIndex6: {
              color: COLORS.LIGHT_BLACK,
            },
          },
        }}
        onPressArrowLeft={subtractMonth => {
          subtractMonth();
        }}
        onPressArrowRight={addMonth => {
          addMonth();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  yearText: {
    fontSize: 32,
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY,
  },
  monthText: {
    fontSize: 20,
    fontFamily: FONTS.BOLD,
    color: COLORS.PRIMARY,
  },
});

export default RNCalendar;
