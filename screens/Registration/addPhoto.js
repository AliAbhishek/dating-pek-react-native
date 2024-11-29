import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Gradient from '../../components/Gradient';
import {COLORS, FONTS, SCREEN_NAME} from '../../utils/Constants';
import BackButton from '../../components/BackButton';
import {launchImageLibrary} from 'react-native-image-picker';
import {IMAGES} from '../../utils/Images';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {setImages} from '../../redux/slices/registerFormSlice';
import CustomAlert from '../../components/CustomAlert';

const {width} = Dimensions.get('window');

const AddPhoto = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [photos, setPhotos] = useState([]);
  const dispatch = useDispatch();

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 4,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selectedImages = response.assets.map(asset => asset.uri);
        setPhotos(prevImages => [
          ...prevImages,
          ...selectedImages.slice(0, 4 - prevImages.length),
        ]);
      }
    });
  };

  // const handleNext = async () => {
  //   if (photos.length < 3) {
  //     return;
  //   }

  //   const formData = new FormData();

  //   photos.forEach((image, index) => {
  //     formData.append('images', {
  //       uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
  //       type: 'image/jpeg',
  //       name: `photo${index + 1}.jpg`,
  //     });
  //   });
  // };

  const handleNext = () => {
    if (photos.length > 2) {
      const formData = new FormData();

      photos.forEach((image, index) => {
        formData.append('images', {
          uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
          type: 'image/jpeg',
          name: `photo${index + 1}.jpg`,
        });
      });
      dispatch(setImages(formData._parts));
      navigation.navigate(SCREEN_NAME.SUBSCRIPTION);
    } else {
      CustomAlert({message: 'Please Upload Minimum three Photos'});
    }
  };

  const renderImageBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 4; i++) {
      if (photos[i]) {
        boxes.push(
          <Image key={i} source={{uri: photos[i]}} style={styles.imageBox} />,
        );
      } else if (i === 3) {
        boxes.push(
          <TouchableOpacity
            key={i}
            style={{...styles.imageBox, borderColor: COLORS.PRIMARY}}
            onPress={pickImage}>
            <Image
              source={IMAGES.TINTED_PLUS}
              style={{width: 28, height: 28}}
            />
            <Text style={styles.addText}>Add more photos</Text>
          </TouchableOpacity>,
        );
      } else {
        boxes.push(
          <TouchableOpacity key={i} style={styles.imageBox} onPress={pickImage}>
            <Image source={IMAGES.PLUS} style={{width: 28, height: 28}} />
          </TouchableOpacity>,
        );
      }
    }
    return boxes;
  };

  return (
    <Gradient colors={[COLORS.LIGHT_PRIMARY, COLORS.LIGHT_SECONDARY]}>
      <BackButton
        style={{
          paddingHorizontal: 20,
          position: 'absolute',
          top: Platform.OS === 'ios' ? insets.top + 5 : 30,
        }}
        currentSignUpStep={8}
      />

      <View style={styles.mainContainer}>
        <Text style={styles.heading}>Add your photos</Text>
        <Text style={styles.subHeading}>
          Upload minimum 3 photos of yourself.
        </Text>
        <View style={styles.container}>{renderImageBoxes()}</View>
      </View>
      <Button
        title={'Next'}
        // disabled={photos.length >= 3 ? false : true}
        onPress={handleNext}
        style={{
          paddingHorizontal: 20,
          opacity: photos.length >= 3 ? 1 : 0.5,
          paddingBottom: Platform.OS === 'android' && 20,
        }}
      />
    </Gradient>
  );
};

export default AddPhoto;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 50,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontFamily: FONTS.BOLD,
    color: COLORS.BLACK,
  },
  subHeading: {
    fontSize: 16,
    fontFamily: FONTS.REGULAR,
    color: COLORS.LIGHT_BLACK,
    marginTop: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  imageBox: {
    width: width * 0.43,
    height: width * 0.43,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.LIGHT_GREY,
    backgroundColor: COLORS.OFF_WHITE,
  },
  addText: {
    color: COLORS.PRIMARY,
    fontFamily: FONTS.SEMI_BOLD,
    fontSize: 14,
    textAlign: 'center',
  },
});
