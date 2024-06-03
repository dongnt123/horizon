"use client";

import CountUp from 'react-countup';

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <CountUp decimal="." separator="," prefix="$" end={amount} duration={2} decimals={2} />
  )
}

export default AnimatedCounter;