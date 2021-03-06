import * as React from 'react';
import { useSelector } from '../redux/hooks';
import {
    StyleSheet,
    // Switch,
    Text,
    View,
} from 'react-native';

import { formatDateOrRelative } from '../util/string';
import { processAchievement } from '../util/users';

import $S from '../styles';

import Button from '../components/Button';
import Colors from '../constants/Colors';


const AchievementModal = ({navigation, route}) => {
  const { params: { achievementType } } = route;
  const currentUser = useSelector(state => state.users.current);
  const { data: { achievements = {} } = {} } = currentUser || {};
  const achievement = processAchievement(achievements, achievementType);
  const { icon: Icon, completed } = achievement;

  return (
    <View style={$S.modalContainer}>
      <View style={[$S.modalContent, styles.modalContent]}>
        <Text style={$S.headline} adjustsFontSizeToFit minimumFontScale={0.5} numberOfLines={1}>
          {completed ? 'Achievement Unlocked!' : 'Keep on Plogging'}
        </Text>
        <View style={{ width: '100%' }}>
        <Icon width="35%" height="35%" style={styles.achievementIcon} 
        fill={completed ? Colors.selectionColor : Colors.activeGray } />
          <Text style={[styles.achievementName,
                        completed ? styles.completedAchievementName : styles.incompleteAchievementName]}>
            {achievement.badgeTheme}
          </Text>
          <Text style={styles.achievementDescription}>
            {completed ? achievement.description : achievement.incompleteDescription}
          </Text>
          <Text style={styles.achievementBonus}>
            {achievement.points} bonus minutes
          </Text>
        {completed &&
         <Text style={styles.completionDesc}>
           Completed {formatDateOrRelative(completed.toDate())}
         </Text>}
        </View>
      <View />
      {/*  <View style={styles.shareOptions} >
          <Text>Share on Facebook</Text>
          <Switch value={false} />
        </View> */}
      </View>
      <View style={$S.modalButtonsContainer}>
        <Button
          title="OK" onPress={_ => { navigation.goBack(); }} 
          large
          style={$S.modalButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  shareOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badgeStyle: {
    alignSelf: 'center',
    backgroundColor: '#D8DCE7',
    width: '80%',
    margin: 30,
  },
  achievementIcon: {
    alignSelf: 'center',
    marginTop: 20,
  },
  achievementName: { 
    fontSize: 25,
    flexGrow: 0,
    textAlign: 'center',
    paddingTop: 5,
  },
  completedAchievementName: {
    color: Colors.activeColor,
    fontWeight: 'bold'
  },
  incompleteAchievementName: {
    color: Colors.activeGray,
    fontWeight: 'bold',
  },
  achievementDescription: {
    textAlign: 'center',
    paddingTop: 2,
    fontSize: 18
  },
  achievementBonus: {
    textAlign: 'center',
    paddingTop: 2,
    fontSize: 18,
    fontStyle: 'italic',
    color: Colors.activeColor,
  },
  completionDesc: {
    textAlign: 'center',
    paddingTop: 10,
  }
});

export default AchievementModal;
