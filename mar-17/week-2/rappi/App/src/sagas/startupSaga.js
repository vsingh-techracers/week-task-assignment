import { NetInfo } from 'react-native';

const handleFirstConnectivityChange = () => {
  NetInfo.removeEventListener(
    'change',
    handleFirstConnectivityChange,
  );
};

const watchNetStatusChange = () => {
  NetInfo.fetch().done(() => {
    NetInfo.addEventListener(
      'change',
      handleFirstConnectivityChange,
    );
  });
};

export default function* () {
  yield watchNetStatusChange();
}
