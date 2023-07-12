import type { AxiosError } from 'axios';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

// for onError react queries and mutations
export const showError = (error: AxiosError) => {
  console.log(JSON.stringify(error?.response?.data));
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

export const extractError = (data: unknown): string => {
  if (typeof data === 'string') {
    return data;
  }
  if (Array.isArray(data)) {
    const messages = data.map((item) => {
      return `  ${extractError(item)}`;
    });

    return `${messages.join('')}`;
  }

  if (typeof data === 'object' && data !== null) {
    const messages = Object.entries(data).map((item) => {
      const [key, value] = item;
      const separator = Array.isArray(value) ? ':\n ' : ': ';

      return `- ${key}${separator}${extractError(value)} \n `;
    });
    return `${messages.join('')} `;
  }
  return 'Something went wrong ';
};
export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green', borderBottomColor: 'red' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
    />
  ),

  error: (props: any) => <ErrorToast {...props} />,

  tomatoToast: ({ text1, props }: any) => (
    <View
      style={{
        height: 60,

        backgroundColor: 'tomato',
        paddingHorizontal: 15,
      }}
    >
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};
