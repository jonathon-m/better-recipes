import React from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { undoInstruction } from '../store/features/progress/progressSlice';

export default function UndoToast(props: {
  toastId: string;
  instructionId: string;
}) {
  const dispatch = useDispatch();

  const undo = () => {
    dispatch(undoInstruction(props.instructionId));
    toast.dismiss(props.toastId);
  };

  return (
    <div>
      <button onClick={undo}>Undo</button>
    </div>
  );
}
