import { toastStore } from '@skeletonlabs/skeleton';

export const handleToastSetting = (
  message = 'Something wrong!',
  background = 'variant-filled-error',
  classes = 'text-white',
  callback = () => {}
) => {
  const toastSetting = {
    message,
    background,
    classes,
    callback,
  };

  toastStore.trigger(toastSetting);
};
