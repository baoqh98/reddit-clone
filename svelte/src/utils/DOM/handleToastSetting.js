import { toastStore } from '@skeletonlabs/skeleton';

export const handleToastSetting = (
  message = 'Something wrong!',
  background = 'variant-filled-error',
  classes = 'text-white',
  callback = () => {},
  timeout = 3000
) => {
  const toastSetting = {
    message,
    background,
    classes,
    callback,
    timeout,
  };

  toastStore.trigger(toastSetting);
};
