import React from 'react';
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

export const moveIconMap = {
  rock: { smallIcon: <FaHandRock style={{marginLeft: 10}} size={28} />, largeIcon:  <FaHandRock size={150} /> },
  paper: { smallIcon: <FaHandPaper style={{marginLeft: 10}}  size={28} />, largeIcon:  <FaHandPaper size={150} /> },
  scissors: { smallIcon: <FaHandScissors style={{marginLeft: 10}}  size={28} />, largeIcon:  <FaHandScissors size={150} /> }
};
