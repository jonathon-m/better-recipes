import { motion } from 'framer-motion';
import { MouseEvent } from 'react';

export default function BorderBox(props: any) {
  const childProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.6 },
    ...props,
    className:
      (!!props.className ? props.className : '') +
      ' p-2 md:p-8 bg-white rounded-lg m-4 shadow-xl z-50',
  };
  return (
    <motion.div
      onClick={(e: MouseEvent) => e.stopPropagation()}
      {...childProps}
    >
      {props.children}
    </motion.div>
  );
}
