import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Gradient from '../../components/Gradient';
import {COLORS} from '../../utils/Constants';
import AdvancedBackButton from '../../components/AdvancedBackButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IMAGES} from '../../utils/Images';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {baseURL} from '../../utils/Axios';
import {
  deletePhoto,
  editProfile,
  getProfile,
} from '../../redux/slices/apiSlice';
import AuthContext from '../../context/AuthContext';
import {launchImageLibrary} from 'react-native-image-picker';

const {width} = Dimensions.get('window');

const EditPhotos = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {token} = useContext(AuthContext);
  const profileData = useSelector(
    state => state.API.data?.getProfileResponse?.data,
  );
  const truncatedImages = profileData?.images?.slice(1) || [];
  const handleDeletePic = data => {
    dispatch(deletePhoto({data, token: token})).then(res => {
      if (res?.payload?.status === 200) {
        dispatch(getProfile(token));
      }
    });
  };

  const handleAddPic = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selectedImages = response.assets;
        const formData = new FormData();
        // formData.append('images', {
        //   uri:
        //     Platform.OS === 'android'
        //       ? selectedImages[0].uri
        //       : selectedImages[0].uri.replace('file://', ''),
        //   type: selectedImages[0].type,
        //   name: `photo${1}.jpg`,
        // });
        if (profileData?.images) {
          profileData.images.forEach((image, index) => {
            formData.append('images', {
              uri: baseURL + '/' + image,
              type: 'image/jpeg',
              name: `photo${index + 1}.jpg`,
            });
          });
        }

        formData.append('images', {
          uri:
            Platform.OS === 'android'
              ? selectedImages[0].uri
              : selectedImages[0].uri.replace('file://', ''),
          type: selectedImages[0].type,
          name: `photo${profileData?.images.length + 1}.jpg`,
        });

        dispatch(editProfile({data: formData, token})).then(res => {
          if (res?.payload?.status === 200) {
            dispatch(getProfile(token));
          }
        });
      }
    });
  };

  return (
    <Gradient colors={[COLORS.LIGHT_PRIMARY, COLORS.LIGHT_SECONDARY]}>
      <AdvancedBackButton
        style={{
          paddingHorizontal: 20,
          position: 'absolute',
          top: Platform.OS === 'ios' ? insets.top + 5 : 30,
        }}
        heading={'Edit photos'}
      />

      <ScrollView
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
        style={styles.mainContainer}>
        <View style={styles.detailContainer}>
          <View style={styles.container}>
            <View>
              <Image
                source={{uri: baseURL + '/' + profileData?.images[0]}}
                style={styles.mainPic}
              />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeletePic(profileData?.images[0])}>
                <Image source={IMAGES.BIN} style={{height: 20, width: 20}} />
              </TouchableOpacity>
            </View>

            <View style={styles.additionalPicsContainer}>
              {truncatedImages.map((pic, index) => (
                <View key={index} style={styles.picWrapper}>
                  <Image
                    source={{uri: baseURL + '/' + pic}}
                    style={styles.additionalPic}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeletePic(pic)}>
                    <Image
                      source={IMAGES.BIN}
                      style={{height: 20, width: 20}}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <Button
        onPress={handleAddPic}
        title={'Add More Photos'}
        isBgWhite={true}
        source={IMAGES.TINTED_PLUS}
        isImage={true}
        style={{
          marginHorizontal: 20,
          marginBottom: Platform.OS === 'android' && 20,
        }}
      />
    </Gradient>
  );
};

export default EditPhotos;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  detailContainer: {
    marginTop: 10,
  },
  container: {
    paddingVertical: 10,
  },
  mainPic: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    marginBottom: 10,
  },
  additionalPicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  picWrapper: {
    position: 'relative',
  },
  additionalPic: {
    width: width / 2 - 30,
    height: 160,
    borderRadius: 16,
    marginBottom: 15,
  },
  deleteButton: {
    position: 'absolute',
    top: 1,
    right: 1,
    borderRadius: 15,
    padding: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
