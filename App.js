import { registerRootComponent } from 'expo';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState , useEffect} from 'react'
import { Dimensions, StyleSheet, Text, View,TouchableWithoutFeedback } from 'react-native';
import Bird from './components/Bird'
import Obstacles from './components/Obstacles';
export default function App() {

  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom ] = useState(screenHeight/2)
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState (0)
  const [score, setScore] = useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState (0)
  const obstacleWidth = 60
  const obstacleHeight = 300 
  const gap = 200
  const gravity = 3 
  let gameTimerId
  let obstaclesTimerId
  let obstaclesTimerIdTwo
  const [isGameOver,setIsGameOver] = useState(false)

  // start bird falling
  useEffect(() => {
     if (birdBottom>0) {
      gameTimerId =  setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
       },30)

       return () => {
          clearInterval(gameTimerId)
      }
     }
 
  },[birdBottom])
  console.log(birdBottom)

  const jump = () => {
    if(!isGameOver && (birdBottom < screenHeight)){
      setBirdBottom(birdBottom => birdBottom + 50)
      console.log('jumped')
    }
  }

  //start first obstacles

  useEffect (() => {
    if (obstaclesLeft > -obstacleWidth) {

     obstaclesTimerId = setInterval(() =>{
          setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5 )
      },30)
      
      return () => {
        clearInterval(obstaclesTimerId)
      }
  
    }else{
      setObstaclesLeft(screenWidth)
     
      setObstaclesNegHeight( - Math.random() * 100)

      setScore( score => score + 1)
    }
  },[obstaclesLeft])


  

   //start second obstacles

   useEffect (() => {
    if (obstaclesLeftTwo > -obstacleWidth) {

     obstaclesTimerIdTwo = setInterval(() =>{
          setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5 )
      },30)
      
      return () => {
        clearInterval(obstaclesTimerIdTwo)
      }
  
    }else{
      setObstaclesLeftTwo(screenWidth)
      
      setObstaclesNegHeightTwo( - Math.random() * 100)

      setScore( score => score + 1)
    }
  },[obstaclesLeftTwo])


  //check for collisions
  useEffect(() => {
    console.log(obstaclesLeft)
    console.log(screenWidth/2)
    console.log(obstaclesLeft > screenWidth/2)
    if (
      ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
      birdBottom > (obstaclesNegHeight + obstacleHeight + gap -30)) &&
      (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30 )
      )
      || 
      ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
      birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
      (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30 )
      )
      ) 
      {
      console.log('game over')
      gameOver()
      
    }
  })

  const gameOver = () => {
      clearInterval(gameTimerId)
      clearInterval(obstaclesTimerId)
      clearInterval(obstaclesTimerIdTwo)
      setIsGameOver(true)
    
  }

  return (
    <TouchableWithoutFeedback onPress={jump}>
    <View style={styles.container}>

      {isGameOver && <Text>{score}</Text>}
      
      <Bird 
      
      birdBottom = {birdBottom}
      birdLeft = {birdLeft}

      />

      <Obstacles
      color = {'green'}
      obstacleWidth = {obstacleWidth}
      obstacleHeight = {obstacleHeight}
      randomBottom = {obstaclesNegHeight}
      gap = {gap}
      obstaclesLeft = {obstaclesLeft}

      />
      <Obstacles
      color = {'yellow'}
      obstacleWidth = {obstacleWidth}
      obstacleHeight = {obstacleHeight}
      randomBottom = {obstaclesNegHeightTwo}
      gap = {gap}
      obstaclesLeft = {obstaclesLeftTwo}

      />
    </View>
    </TouchableWithoutFeedback>
    

   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
