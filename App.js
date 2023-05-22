import { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [ modalIsVisible, setModalIsVisible ] = useState(false);
  const [ courseGoals, setCourseGoals ] = useState([]);

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(prev => [...prev, {text: enteredGoalText, id: Math.random().toString()}])
    endAddGoalHandler()
  }

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return (
        currentCourseGoals.filter((goal) => goal.id !== id)
      )
    })
  }

  function startAddGoalHandler() {
    setModalIsVisible(true)
  }
  
  function endAddGoalHandler() {
    setModalIsVisible(false)
  }
  return (
    <View style={styles.appContainer}>
      <Button title="Add New Goal" color="#530acc" onPress={startAddGoalHandler}/>
      
      <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler} />

      <View style={styles.goalsContainer}>
        <FlatList 
          data={courseGoals} 
          renderItem={itemData => {
            return <GoalItem id={itemData.item.id} text={itemData.item.text} onDeleteGoal={deleteGoalHandler} />
          }}
          keyExtractor={(item, index) => {
            return item.id
          }}
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 4,
},
});
