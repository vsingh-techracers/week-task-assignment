import React, { PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import _ from 'lodash';
import { filterBarBGColor } from '../../constants/styles';
import ListItem from './ListItem';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 5,
  },
  header: {
    fontSize: 17,
    fontWeight: '600',
    color: filterBarBGColor,
  },
  headerWrapper: {
    margin: 5,
  },
  headerDecoration: {
    marginHorizontal: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletStyle: {
    width: 10,
    height: 10,
  },
  listWrapper: {
    margin: 5,
    justifyContent: 'space-around',
  },
  separator: {
    margin: 5,
  },
});

const List = ({
    header,
    clearHeaderDecoration,
    clearBottomSeparator,
    headerStyles,
    items,
    icon,
    renderItem,
    horizontal,
  }) => (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={[styles.header, headerStyles]}> {header} </Text>
      </View>

      { !clearHeaderDecoration && <View style={styles.headerDecoration}>
        <View style={{ backgroundColor: filterBarBGColor, height: 0.5 }} />
      </View>}

      <View style={[styles.listWrapper, horizontal && { flexDirection: 'row' }]}>
        { _.map(items, (item, index) => (
          renderItem ? renderItem(item, index) :
          <ListItem icon={icon} key={index} itemText={item} />
          ))
        }
      </View>
      { !clearBottomSeparator && <View style={styles.separator} /> }
    </View>
  );

List.propTypes = {
  header: PropTypes.string,
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.number,
  renderItem: PropTypes.func,
  headerStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  horizontal: PropTypes.bool,
  clearHeaderDecoration: PropTypes.bool,
  clearBottomSeparator: PropTypes.bool,
};

List.defaultProps = {
  header: undefined,
  items: undefined,
  icon: undefined,
  renderItem: undefined,
  headerStyles: undefined,
  horizontal: false,
  clearHeaderDecoration: false,
  clearBottomSeparator: false,
};

export default List;
