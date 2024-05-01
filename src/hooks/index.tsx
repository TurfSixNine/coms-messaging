import { useState, useEffect } from 'react';
interface screenProps{
    width: number;
    height: number; 
}
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<screenProps>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

