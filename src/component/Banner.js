// import React from 'react';
// import {
//   Dimensions,
//   Text,
//   View,
//   SafeAreaView,
//   TouchableOpacity,
// } from 'react-native';
// import {Easing} from 'react-native-reanimated';
// import Carousel from 'react-native-reanimated-carousel';
// const Banner = () => {
//   return (
//     <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
//       <Carousel
//         style={{width: '100%', backgroundColor: 'white'}}
//         loop
//         width={110}
//         height={150}
//         autoPlay={true}
//         // data={[...new Array(6).keys()]}
//         autoPlayInterval={1000}
//         withAnimation={{
//           type: 'timing',
//           config: {
//             duration: 7000,
//             easing: Easing.linear,
//           },
//         }}
//         onSnapToItem={index => console.log('current index:', index)}
//         renderItem={({index}) => (
//           <TouchableOpacity
//             onPress={() => {
//               console.log(index);
//             }}
//             style={{
//               backgroundColor: 'red',
//               margin: 10,
//               width: 100,
//               height: 100,
//               borderTopLeftRadius: 10,
//               borderBottomRightRadius: 10,
//               borderWidth: 2,
//             }}>
//             <Text style={{textAlign: 'center', fontSize: 30}}>{index}</Text>
//           </TouchableOpacity>
//         )}
//       />
//       <View
//         style={{
//           position: 'absolute',
//           bottom: 10,
//           width: '100%',
//           height: 35,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <TouchableOpacity
//           style={{
//             width: '90%',
//             height: 35,
//             backgroundColor: 'green',
//             justifyContent: 'center',
//             alignItems: 'center',
//             borderRadius: 6,
//           }}>
//           <Text style={{color: 'white'}}> onSubmit</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };
// export default Banner;
