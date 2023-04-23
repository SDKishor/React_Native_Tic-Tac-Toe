
import React,{useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';


function App(): JSX.Element {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>("")
  const [gameState, setGameState] = useState(new Array(9).fill("empty", 0 , 9))

  const reloadGame = () =>{
    setIsCross(false);
    setGameWinner("");
    setGameState(new Array(9).fill("empty", 0 , 9))
  }

  const checkIsWinner = () => {
    if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] 
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game... ⌛️');
    }
  }

  const onChangeItem = (itemNum: number) =>{
    if(gameWinner){
      return Snackbar.show({
        text: gameWinner,
        backgroundColor:"#000",
        textColor:"#fff"
      })
    }
    if(gameState[itemNum] === "empty"){
      gameState[itemNum] = isCross ? "cross" : "circle"
      setIsCross(!isCross)
    }
    else{
      return Snackbar.show({
        text: "position is already filled",
        backgroundColor:"#000",
        textColor:"#fff"
      })
    }
    checkIsWinner()
  }
  

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <StatusBar/>

      {
        gameWinner ? (
          <View style={styles.sectionTitle1}>
            <Text style={styles.sectionTitle2}>{gameWinner}</Text>
          </View>
        ):(
          <View style={styles.sectionTitle1}>
            <Text style={styles.sectionTitle2}>Player {isCross? "X": "O"}'s Trun</Text>
          </View>
        )
      }

      <FlatList
      numColumns={3}
      data={gameState}
      style={styles.sectionTitle2}
      renderItem={({item,index}) => (
        <Pressable
        key={index}
        style={styles.sectionTitle3}
        onPress={()=> onChangeItem(index)}
        >
          <Icons name={item}/>
        </Pressable>
      )}
      />

      <Pressable onPress={reloadGame}>
        <Text>{gameWinner? "Start New Game": "Reload Game"}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    margin: 10, 
  },
  sectionTitle: {},
  sectionTitle1: {},
  sectionTitle2: {},
  sectionTitle3: {},
});

export default App;
