import React, { useState, useEffect } from 'react';

const Timer = ({}) => {
  const [seconds, setSeconds] = useState(10);
  const [isActive, setIsActive] = useState(true);



  useEffect(() => {
    let interval = null;
    if(seconds<=0){
        setIsActive(false)
    }
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
  
      <div >
        {seconds}s
      </div>
    
  );
};

export default Timer;