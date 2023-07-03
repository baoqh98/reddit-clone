import { toastStore } from '@skeletonlabs/skeleton';

export const handleToastSetting = (
  message = 'Something wrong!',
  background = 'variant-filled-error',
  classes = 'text-white'
) => {
  const toastSetting = {
    message,
    background,
    classes,
  };

  toastStore.trigger(toastSetting);
};
