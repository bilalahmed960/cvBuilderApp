import {Dimensions,PixelRatio} from 'react-native'

const {width, height} = Dimensions.get('window');
const widthToDp = nuumber =>{
    let givenWidth =
    typeof nuumber == 'number' ? number : parseFloat(nuumber);
    return PixelRatio.roundToNearestPixel((width*givenWidth)/100 );
};
const HeightToDp = number =>{
    let givenHeight =
    typeof nuumber == 'number' ? number : parseFloat(nuumber);
    return PixelRatio.roundToNearestPixel((height*givenHeight)/100 );
};

export {widthToDp,HeightToDp};