import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';

const CheckboxExample = ({isSelected,setSelection}) => {

  return (
      <CheckBox
        checked={isSelected}
        onPress={() => setSelection(!isSelected)}
        checkedIcon='check-square'
        uncheckedIcon='square'
      />
      
  );
};

export default CheckboxExample;
