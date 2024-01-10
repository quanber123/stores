import { useContext, useEffect, useMemo } from 'react';
import { FaRegEnvelope } from 'react-icons/fa6';
import EditButtonNotify from './EditButtonNotify';
import { useDispatch, useSelector } from 'react-redux';
import {
  authInfo,
  getSettings,
  setSettings,
} from '@/services/redux/slice/authSlice';
import {
  useGetSettingsQuery,
  useUpdatedSettingsMutation,
} from '@/services/redux/features/userFeatures';
import { capitalize } from '@/services/utils/format';
import LoadingV2 from '@/components/common/Loading/LoadingV2';
import { GlobalModalContext } from '@/components/modal/global/hooks/globalContext';

const SettingNotifications = () => {
  const { setVisibleModal } = useContext(GlobalModalContext);
  const dispatch = useDispatch();
  const user = useSelector(authInfo);
  const settings = useSelector(getSettings);
  const {
    data: settingsData,
    isSuccess: isSuccessData,
    isLoading: isLoadingSettings,
  } = useGetSettingsQuery(user._id, { skip: !user._id ? true : false });
  const [
    toggleNotify,
    {
      data: dataToggle,
      isSuccess: isSuccessToggle,
      isLoading: isLoadingToggle,
      error: errorToggle,
    },
  ] = useUpdatedSettingsMutation();
  useEffect(() => {
    if (isSuccessData && !isLoadingSettings) {
      dispatch(setSettings(settingsData));
    }
  }, [settingsData, isLoadingSettings]);
  useEffect(() => {
    if (isSuccessToggle && !isLoadingToggle) {
      setVisibleModal({
        visibleAlertModal: {
          status: 'success',
          message: `Success: ${dataToggle?.message}`,
        },
      });
    }
    if (!isLoadingToggle && errorToggle && 'data' in errorToggle) {
      const errorData = errorToggle.data as { message: string };
      setVisibleModal({
        visibleAlertModal: {
          status: 'failed',
          message: `Failed: ${errorData.message}`,
        },
      });
    }
  }, [dataToggle, isSuccessToggle, isLoadingToggle, errorToggle]);
  const renderedSettings = useMemo(() => {
    return settings.notifications.map((s) => {
      return (
        <div
          className='flex flex-col tablet:flex-row justify-between items-center gap-[10px]'
          key={s.description}
        >
          <p className='text-sm text-gray font-bold'>
            {capitalize(s.description)}
          </p>
          <EditButtonNotify
            isActive={s.enabled}
            toggleNotify={() =>
              toggleNotify({
                id: user._id,
                enabled: s.enabled,
                idNotify: s._id,
              })
            }
          />
        </div>
      );
    });
  }, [settings]);
  if (isLoadingToggle) {
    return <LoadingV2 />;
  }
  return (
    <section className='container flex flex-col gap-[40px]'>
      <div className='text-[20px] font-bold pb-4 border-b-2 border-lightGray flex items-center gap-[20px]'>
        <FaRegEnvelope />
        <h2>Notifications</h2>
      </div>
      <div className='flex flex-col gap-[20px]'>{renderedSettings}</div>
    </section>
  );
};

export default SettingNotifications;
