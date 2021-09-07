import toast from 'react-hot-toast';
import { Middleware } from 'redux';
import UndoToast from '../components/undoToast';
import { completeInstruction } from '../store/features/progress/progressSlice';
import { RootState } from '../store/store';

const ToastMiddleware: Middleware<{}, RootState> =
  (storeApi) => (next) => (action) => {
    if (action.type === completeInstruction.type) {
      toast((t) => <UndoToast toastId={t.id} instructionId={action.payload} />);
    }
    return next(action);
  };

export default ToastMiddleware;
