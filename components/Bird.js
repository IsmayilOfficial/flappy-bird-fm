import React from 'react'
import {  View } from 'react-native'

const Bird = ({birdBottom, birdLeft}) =>{

    const birdWidth = 50
    const birdHeigth = 60

    return(
        <View style={{

            position: 'absolute',
            backgroundColor: 'blue',
            width: birdWidth ,
            height: birdHeigth,
            left: birdLeft - (birdWidth/2),
            bottom: birdBottom - (birdHeigth/2),


        }} / >

    )
}
export default Bird