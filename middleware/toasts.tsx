import toast from 'react-hot-toast';
import UndoToast from '../components/undoToast';
import { completeInstruction } from '../store/features/progress/progressSlice';

const UndoToastMiddleware = (storeApi: any) => (next: any) => (action: any) => {
  if (action.type === completeInstruction.type) {
    toast((t) => <UndoToast toastId={t.id} instructionId={action.payload} />);
  }
  return next(action);
};

export default UndoToastMiddleware;
