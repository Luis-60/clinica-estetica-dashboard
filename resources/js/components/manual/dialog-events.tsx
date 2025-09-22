export type ConfirmDialogOptions = {
  title: string;
  text: string;
  onConfirm?: (resolve: () => void, reject: (reason?: any) => void) => void;
  onCancel?: () => void;
};

type Listener = (options: ConfirmDialogOptions) => void;

let listeners: Listener[] = [];

export function confirmDialog(options: ConfirmDialogOptions) {
  listeners.forEach((listener) => listener(options));
}

export function subscribeConfirmDialog(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
