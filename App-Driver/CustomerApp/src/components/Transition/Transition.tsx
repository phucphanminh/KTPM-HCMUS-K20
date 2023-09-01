import React from 'react';
import { PresenceTransition } from 'native-base'; // Replace with the actual import

export enum TransitionType {
  FADE,
  SCALE_FADE,
}

type TransitionProps = {
  type: TransitionType;
  isOpen: boolean; // Prop to control visibility
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // Prop to toggle visibility
  children?: React.ReactNode;
};

const Transition: React.FC<TransitionProps> = (props) => {
  const { type, isOpen, setIsOpen, children } = props;

  return (
    <>
      {type === TransitionType.FADE && (
        <PresenceTransition
          visible={isOpen}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 250,
            },
          }}
        >
          {children}
        </PresenceTransition>
      )}

      {type === TransitionType.SCALE_FADE && (
        <PresenceTransition
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 250,
            },
          }}
        >
          {children}
        </PresenceTransition>
      )}
    </>
  );
};

export default Transition;
