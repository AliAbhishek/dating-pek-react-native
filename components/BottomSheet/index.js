import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {Modalize} from 'react-native-modalize';
import Button from '../Button';
import {COLORS, FONTS} from '../../utils/Constants';
import {IMAGES} from '../../utils/Images';
import TextField from '../TextField';
import RNCalendar from '../Calendar';
import DropdownComponent from '../Dropdown';
import {
  interestData,
  occupationData,
  qualificationData,
} from '../../utils/Static';
import AdvancedSelectable from '../AdvancedSelectable';
import {useDispatch} from 'react-redux';
import AuthContext from '../../context/AuthContext';
import {
  editEmail,
  editPhoneNumber,
  editProfile,
  getProfile,
  resendOTP,
  verifyOTP,
} from '../../redux/slices/apiSlice';
import Selectable from '../Selectable';
import {useNavigation} from '@react-navigation/native';
import OTP from '../OTP';
import CustomAlert from '../CustomAlert';
import PhoneNumberInput from '../PhoneNumberInput';

const occupationMapping = {
  Student: 1,
  Unemployed: 2,
  Employed: 3,
  'Self employed': 4,
};

const highestQualificationMapping = {
  'High school': 1,
  Undergraduate: 2,
  Graduate: 3,
  Postgraduate: 4,
  Doctorate: 5,
};

// MARK: Phone
const EditPhone = ({
  phoneEditStep,
  setPhoneNumber,
  phoneNumber,
  handleCountryCode,
  cCode,
  id,
  handleEditProfile,
}) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(30);
  const [isTimerStart, setIsTimerStart] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerStart]);

  const handleOTPChange = code => {
    setOtp(code);
  };

  const handleResendOtp = () => {
    dispatch(resendOTP({data: {type: 1, userId: id}})).then(res => {
      const status = res?.payload?.status;
      const OTP = res?.payload?.data?.updateduser?.phoneotp;
      if (status === 200) {
        CustomAlert({message: OTP.toString()});
        setIsTimerStart(!isTimerStart);
        setSeconds(30);
      }
    });
  };

  const handleVerify = () => {
    const formattedData = {
      userId: id,
      otp: Number(otp),
      type: 1,
    };

    dispatch(verifyOTP(formattedData)).then(async res => {
      const status = res?.payload?.status;
      if (status === 200) {
        handleEditProfile();
      }
    });
  };

  return (
    <View>
      {phoneEditStep === 0 ? (
        <PhoneNumberInput
          placeholder={'Edit phone no.'}
          onChange={setPhoneNumber}
          defaultValue={phoneNumber}
          handleCountryCode={handleCountryCode}
        />
      ) : (
        <View>
          <Text style={styles.otpGetText}>
            Please enter the 4 digit code sent to your registered phone number
            <Text style={styles.emailText}>
              {' '}
              {cCode}
              {phoneNumber}
            </Text>
          </Text>
          <OTP
            handleChange={handleOTPChange}
            containerStyle={{marginTop: 15}}
          />
          <Button
            title={'Verify'}
            onPress={handleVerify}
            textStyle={{
              fontFamily: FONTS.SEMI_BOLD,
              color: COLORS.WHITE,
              fontSize: 20,
            }}
            style={styles.saveButton}
          />
          {!seconds ? (
            <TouchableOpacity
              onPress={handleResendOtp}
              style={styles.resendCodeContainer}>
              <Text style={styles.resendCodeText}>Resend code</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.resendCodeContainer}>
              <Text style={styles.resendCodeIn}>
                Resend code in{' '}
                <Text style={styles.secondsText}>00:{seconds}</Text>
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

// MARK: Email
const EditEmail = ({handleEditProfile, id, data}) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(30);
  const [isTimerStart, setIsTimerStart] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerStart]);

  const handleOTPChange = code => {
    setOtp(code);
  };

  const handleVerify = () => {
    const formattedData = {
      userId: id,
      otp: Number(otp),
    };
    if (otp.length !== 4) {
      CustomAlert({message: 'Please Enter OTP'});
    } else {
      dispatch(verifyOTP(formattedData)).then(async res => {
        const status = res?.payload?.status;
        if (status === 200) {
          handleEditProfile();
        }
      });
    }
  };

  const handleResendOtp = () => {
    dispatch(resendOTP({data: {email: data, userId: id}})).then(res => {
      const status = res?.payload?.status;
      if (status === 200) {
        setIsTimerStart(!isTimerStart);
        setSeconds(30);
      }
    });
  };

  return (
    <View>
      <Text style={styles.otpGetText}>
        Please enter the 4 digit code sent to your registered email id
        <Text style={styles.emailText}> {data}</Text>
      </Text>
      <OTP handleChange={handleOTPChange} containerStyle={{marginTop: 15}} />

      <Button
        title={'Verify'}
        // onPress={handleEditProfile}
        onPress={handleVerify}
        textStyle={{
          fontFamily: FONTS.SEMI_BOLD,
          color: COLORS.WHITE,
          fontSize: 20,
        }}
        style={styles.saveButton}
      />
      {!seconds ? (
        <TouchableOpacity
          onPress={handleResendOtp}
          style={styles.resendCodeContainer}>
          <Text style={styles.resendCodeText}>Resend code</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.resendCodeContainer}>
          <Text style={styles.resendCodeIn}>
            Resend code in <Text style={styles.secondsText}>00:{seconds}</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

// MARK: Occupation
const Occupation = ({
  data,
  setDesignation,
  setOccupationValue,
  occupationValue,
  highestQualification,
  setHighestQualification,
}) => {
  return (
    <View style={{marginVertical: 20, marginTop: 0, gap: 10}}>
      <Text style={styles.label}>What’s your occupation?</Text>
      <DropdownComponent
        data={occupationData}
        placeholder="Select occupation"
        onChange={value => {
          setOccupationValue(value);
        }}
        value={occupationValue}
      />
      <Text style={styles.label}>What’s your designation?</Text>
      <TextField
        placeholder={'Designation'}
        placeholderTextColor={COLORS.LIGHT_BLACK}
        defaultValue={data.designation}
        onChange={setDesignation}
      />
      <Text style={styles.label}>What’s your highest qualification?</Text>
      <DropdownComponent
        data={qualificationData}
        placeholder="Select qualification"
        onChange={value => {
          setHighestQualification(value);
        }}
        value={highestQualification}
      />
    </View>
  );
};

// MARK: About
const Bio = ({data, setInputValue}) => {
  return (
    <TextInput
      placeholder="Type here..."
      key={'details'}
      placeholderTextColor={COLORS.LIGHT_BLACK}
      style={{...styles.textArea, height: 160}}
      multiline={true}
      textAlignVertical="top"
      defaultValue={data}
      onChangeText={setInputValue}
    />
  );
};

// MARK:Interest
const Interest = ({selectedTypes, setSelectedTypes}) => {
  const toggleInterest = name => {
    setSelectedTypes(prevSelected =>
      prevSelected.includes(name)
        ? prevSelected.filter(typeId => typeId !== name)
        : [...prevSelected, name],
    );
  };

  return (
    <View style={styles.interestContainer}>
      {interestData.map((el, index) => (
        <View key={index}>
          <AdvancedSelectable
            title={el.name}
            imageSource={el.image}
            selected={selectedTypes.includes(el.name)}
            onPress={() => toggleInterest(el.name)}
          />
        </View>
      ))}
    </View>
  );
};

// MARK: Gender
const Gender = ({value, setSelectedGender, selectedGender}) => {
  return (
    <View style={{gap: 10}}>
      <Selectable
        title={'Male'}
        selected={selectedGender === 'Male'}
        onPress={() => setSelectedGender('Male')}
      />
      <Selectable
        title={'Female'}
        selected={selectedGender === 'Female'}
        onPress={() => setSelectedGender('Female')}
      />
      <Selectable
        title={'Others'}
        selected={selectedGender === 'Others'}
        onPress={() => setSelectedGender('Others')}
      />
    </View>
  );
};

// MARK: Bottom Sheet
const BottomSheet = ({modalRef, label, value, userId, cCode}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const LABEL = label.toLowerCase();
  const {token} = useContext(AuthContext);
  const [inputValue, setInputValue] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [DOB, setDOB] = useState('');
  const [designation, setDesignation] = useState('');
  const [occupationValue, setOccupationValue] = useState('');
  const [highestQualification, setHighestQualification] = useState('');
  const [editStep, setEditStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState();
  const [countryCode, setCountryCode] = useState('');
  const [phoneEditStep, setPhoneEditStep] = useState(0);

  const handleCountryCode = text => {
    setCountryCode(`+${text}`);
  };

  // console.log(value, 'value', LABEL, 'LABEL');

  const getSelectedInterestIds = interests => {
    return interestData
      .filter(interest => interests.includes(interest.name))
      .map(interest => interest.name);
  };

  //MARK: Prefill values
  useEffect(() => {
    if (LABEL === 'gender') {
      setSelectedGender(value);
    }
    if (LABEL === 'date of birth') {
      setDOB(value);
    }
    if (LABEL === 'occupation') {
      setOccupationValue(value?.data?.occupation);
      setDesignation(value?.data?.designation);
      setHighestQualification(value?.data?.highestQualification);
    }
    if (LABEL == 'interest') {
      setSelectedTypes(getSelectedInterestIds(value));
    }
    if (LABEL == 'email') {
      setInputValue(value);
    }
    if (LABEL == 'height') {
      setInputValue(value.toString());
    }
    if (LABEL == 'phone') {
      setPhoneNumber(value.toString());
      setCountryCode(cCode);
    }
    return () => {
      setDOB('');
      setSelectedTypes([]);
      setSelectedGender(null);
    };
  }, [LABEL, value]);

  const handleClose = () => {
    modalRef.current.close();
    setEditStep(0);
    setInputValue(null);
    setPhoneEditStep(0);
  };

  const handleEditProfile = () => {
    const formData = new FormData();
    let key;
    let value;

    switch (LABEL) {
      case 'bio':
        key = 'about';
        value = inputValue;
        break;
      case 'interest':
        key = 'interest';
        selectedTypes.forEach(typeId => {
          formData.append('interest', typeId);
        });
        break;
      case 'gender':
        key = 'gender';
        value =
          selectedGender === 'Male' ? 0 : selectedGender === 'Female' ? 1 : 2;
        break;
      case 'occupation':
        key = 'occupation';
        formData.append('designation', designation);
        formData.append('occupation', occupationMapping[occupationValue]);
        formData.append(
          'highestQualification',
          highestQualificationMapping[highestQualification],
        );
        break;
      case 'date of birth':
        key = 'dob';
        value = DOB;
        break;
      case 'email':
        key = 'email';
        value = inputValue;
        break;
      case 'phone':
        key = 'phone';
        formData.append('phoneNumber', phoneNumber);
        formData.append('countryCode', countryCode);
        break;
      case 'height':
        key = 'height';
        value = Number(inputValue);
        break;
      default:
        key = LABEL;
        value = inputValue;
    }

    // If the key is not 'interest', append the value to formData
    if (key !== 'interest' && key !== 'occupation' && key !== 'phone') {
      formData.append(key, value);
    }

    dispatch(editProfile({data: formData, token})).then(res => {
      if (res?.payload?.status === 200) {
        dispatch(getProfile(token));
        navigation.goBack();
      }
    });
  };

  const handleVerify = () => {
    if (inputValue == value) {
      CustomAlert({message: 'Please enter a new email'});
    } else {
      dispatch(editEmail({data: {email: inputValue}, token})).then(res => {
        if (res?.payload?.status === 200) {
          setEditStep(editStep + 1);
        }
      });
    }
  };

  const handleVerifyPhone = () => {
    if (phoneNumber == value) {
      CustomAlert({message: 'Please enter a new number'});
    } else {
      setPhoneEditStep(phoneEditStep + 1);
      dispatch(editPhoneNumber({data: {phoneNumber: phoneNumber}, token})).then(
        res => {
          if (res?.payload?.status === 200) {
            setPhoneEditStep(phoneEditStep + 1);
          }
        },
      );
    }
  };

  // MARK: Fields
  const renderInputField = () => {
    switch (LABEL) {
      case 'date of birth':
        return (
          <RNCalendar selected={DOB} setSelected={setDOB} showLabel={true} />
        );
      case 'occupation':
        return (
          <Occupation
            occupationValue={occupationValue}
            setOccupationValue={setOccupationValue}
            setDesignation={setDesignation}
            highestQualification={highestQualification}
            setHighestQualification={setHighestQualification}
            data={value?.data}
          />
        );
      case 'gender':
        return (
          <Gender
            value={value}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
          />
        );
      case 'bio':
        return <Bio data={value} setInputValue={setInputValue} />;
      case 'interest':
        return (
          <Interest
            setSelectedTypes={setSelectedTypes}
            selectedTypes={selectedTypes}
          />
        );
      case 'phone':
        return (
          <EditPhone
            setPhoneNumber={setPhoneNumber}
            phoneNumber={phoneNumber}
            handleCountryCode={handleCountryCode}
            phoneEditStep={phoneEditStep}
            cCode={cCode}
            id={userId}
            handleEditProfile={handleEditProfile}
          />
        );
      default:
        return (
          <View>
            {editStep === 0 ? (
              <TextField
                placeholder={`Enter your ${LABEL?.toLowerCase()}`}
                onChange={setInputValue}
                defaultValue={value}
                value={inputValue}
                keyType={LABEL == 'height' ? 'numeric' : 'text'}
              />
            ) : (
              <EditEmail
                handleEditProfile={handleEditProfile}
                id={userId}
                data={inputValue}
              />
            )}
          </View>
        );
    }
  };

  return (
    <Modalize
      adjustToContentHeight
      withHandle={false}
      ref={modalRef}
      modalStyle={styles.modalStyle}>
      <ScrollView>
        <TouchableOpacity onPress={handleClose}>
          <Image source={IMAGES.CROSS} style={{width: 24, height: 24}} />
        </TouchableOpacity>
        <View style={{marginVertical: 15, marginTop: 10}}>
          <Text style={styles.heading}>
            {phoneEditStep === 1
              ? 'Verify phone no.'
              : editStep === 1
              ? 'Verify Email'
              : `Edit ${label}`}
          </Text>
        </View>

        {renderInputField()}

        {LABEL != 'phone' && editStep === 0 && (
          <Button
            title={'Save Changes'}
            onPress={LABEL !== 'email' ? handleEditProfile : handleVerify}
            textStyle={{
              fontFamily: FONTS.SEMI_BOLD,
              color: COLORS.WHITE,
              fontSize: 20,
            }}
            style={styles.saveButton}
          />
        )}

        {LABEL == 'phone' && phoneEditStep == 0 && (
          <Button
            title={'Save Changes'}
            onPress={handleVerifyPhone}
            textStyle={{
              fontFamily: FONTS.SEMI_BOLD,
              color: COLORS.WHITE,
              fontSize: 20,
            }}
            style={styles.saveButton}
          />
        )}
      </ScrollView>
    </Modalize>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  modalStyle: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  heading: {
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    marginVertical: 10,
    color: COLORS.BLACK,
  },
  saveButton: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontFamily: FONTS.SEMI_BOLD,
    marginTop: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GREY,
    padding: 15,
    borderRadius: 16,
    backgroundColor: COLORS.OFF_WHITE,
    color: COLORS.LIGHT_BLACK,
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
  },
  interestContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 5,
  },
  otpGetText: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.LIGHT_BLACK,
  },
  emailText: {
    fontSize: 16,
    fontFamily: FONTS.BOLD,
    color: COLORS.LIGHT_BLACK,
  },
  resendCodeContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  resendCodeText: {
    textDecorationLine: 'underline',
    fontSize: 14,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.BLACK,
  },
  resendCodeIn: {
    fontSize: 14,
    fontFamily: FONTS.SEMI_BOLD,
    color: COLORS.BLACK,
  },
  secondsText: {
    fontSize: 14,
    fontFamily: FONTS.BOLD,
    color: COLORS.BLACK,
  },
});
