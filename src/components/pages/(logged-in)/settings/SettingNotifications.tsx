import { useContext, useEffect, useMemo } from 'react';
import { FaRegBell } from 'react-icons/fa6';
import EditButtonNotify from './EditButtonNotify';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings, setSettings } from '@/services/redux/slice/authSlice';
import {
  useGetSettingsQuery,
  useUpdatedSettingsMutation,
} from '@/services/redux/features/userFeatures';
import LoadingV2 from '@/components/common/Loading/LoadingV2';
import { ModalContext } from '@/components/modal/hooks/modalContext';
import { useAuth } from '@/hooks/useAuth';

const SettingNotifications = () => {
  const { setVisibleModal } = useContext(ModalContext);
  const dispatch = useDispatch();
  const user = useAuth();
  const token = window.localStorage.getItem('coza-store-token');
  const settings = useSelector(getSettings);
  const {
    data: settingsData,
    isSuccess: isSuccessData,
    isLoading: isLoadingSettings,
  } = useGetSettingsQuery(
    { token: token, id: user?.id },
    { skip: !user?.id ? true : false }
  );
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
    return (
      settings &&
      settings.notifications?.map((s) => {
        return (
          <div
            className='flex flex-col tablet:flex-row justify-between tablet:items-center gap-[10px]'
            key={s.description}
          >
            <p className='text-sm text-gray font-bold capitalize'>
              {s.description}
            </p>
            <EditButtonNotify
              isActive={s.enabled}
              toggleNotify={() =>
                toggleNotify({
                  token: token,
                  id: user.id,
                  enabled: s.enabled,
                  idNotify: s._id,
                })
              }
            />
          </div>
        );
      })
    );
  }, [settings]);
  if (isLoadingToggle) {
    return <LoadingV2 />;
  }
  return (
    <section className='container flex flex-col gap-[40px]'>
      <div className='text-[20px] font-bold pb-4 border-b-2 border-lightGray flex items-center gap-[20px]'>
        <FaRegBell />
        <h2>Notifications</h2>
      </div>
      <div className='flex flex-col gap-[20px]'>{renderedSettings}</div>
    </section>
  );
};

export default SettingNotifications;
