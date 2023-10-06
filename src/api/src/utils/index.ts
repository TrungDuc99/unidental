import {AxiosError} from 'axios';
import {showMessage} from 'react-native-flash-message';
import {Dimensions, Platform} from 'react-native';

export const formatNumber = (q: number | null) => {
  const qq = q || '';

  return qq.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

// for onError react queries and mutations
export const showError = (error: AxiosError) => {
  const description = extractError(error?.response?.data).trimEnd();

  showMessage({
    message: 'Error',
    description,
    type: 'danger',
    duration: 4000,
    icon: 'danger',
  });
};

export const showErrorMessage = (message: string = 'Something went wrong ') => {
  showMessage({
    message,
    type: 'danger',
    duration: 4000,
  });
};

export const showInfoMessage = (message: string = 'Something is notice! ') => {
  showMessage({
    message,
    type: 'info',
    duration: 4000,
    icon: 'info',
  });
};

export const showSuccessMessage = (message: string = 'Success! ') => {
  showMessage({
    message,
    type: 'success',
    duration: 4000,
    icon: 'success',
  });
};
export const checkPassword = (str: string) => {
  var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  return re.test(str);
};
export const extractError = (data: unknown): string => {
  if (typeof data === 'string') {
    return data;
  }
  if (Array.isArray(data)) {
    const messages = data.map(item => {
      return `  ${extractError(item)}`;
    });

    return `${messages.join('')}`;
  }

  if (typeof data === 'object' && data !== null) {
    const messages = Object.entries(data).map(item => {
      const [key, value] = item;
      const separator = Array.isArray(value) ? ':\n ' : ': ';

      return `- ${key}${separator}${extractError(value)} \n `;
    });
    return `${messages.join('')} `;
  }
  return 'Something went wrong ';
};

export const IS_IOS = Platform.OS === 'ios';
const {width, height} = Dimensions.get('screen');

export const WIDTH = width;
export const HEIGHT = height;
