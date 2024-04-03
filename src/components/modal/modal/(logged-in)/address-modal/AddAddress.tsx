import Modal from '@/Modal';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ModalContext } from '../../../hooks/modalContext';
import {
  useCreateAddressMutation,
  useGetDistrictsQuery,
  useGetProvincesQuery,
  useGetWardsQuery,
} from '@/services/redux/features/userFeatures';
import {
  validateEmptyStr,
  validatePhoneNumber,
} from '@/services/utils/validate';
import LoadingV2 from '@/components/common/Loading/LoadingV2';
const AddAddressModal = () => {
  const { state, setVisibleModal } = useContext(ModalContext);
  const [err, setErr] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    state: {
      code: null,
      name: '',
    },
    city: {
      code: null,
      name: '',
    },
    district: {
      code: null,
      name: '',
    },
    address: '',
    isDefault: false,
  });
  const { data: dataProvinces, isSuccess: isSuccessProvinces } =
    useGetProvincesQuery(null);
  const { data: dataDistricts, isSuccess: isSuccessDistricts } =
    useGetDistrictsQuery(form.state.code, { skip: !form.state.code });
  const { data: dataWards, isSuccess: isSuccessWards } = useGetWardsQuery(
    form.city.code,
    { skip: !form.city.code }
  );
  const [
    createAddress,
    {
      data: dataCreate,
      isSuccess: isSuccessCreate,
      isLoading: isLoadingCreate,
    },
  ] = useCreateAddressMutation();
  const handleChangeForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, type, value, dataset } = e.target;
      setForm((prevForm) => {
        return {
          ...prevForm,
          [name]:
            dataset.type === 'object'
              ? {
                  code: (e.target as HTMLSelectElement).options[
                    (e.target as HTMLSelectElement)?.selectedIndex
                  ].getAttribute('data-code'),
                  name: value,
                }
              : type === 'checkbox'
              ? (e.target as HTMLInputElement).checked
              : value,
        };
      });
    },
    [form]
  );
  const renderedProvinces = useMemo(
    () =>
      isSuccessProvinces
        ? dataProvinces.map((p: any) => (
            <option key={p.code} value={p.name} data-code={p.code}>
              {p.name}
            </option>
          ))
        : [],
    [isSuccessProvinces, dataProvinces]
  );
  const renderedDistricts = useMemo(
    () =>
      isSuccessDistricts
        ? (dataDistricts || []).map((p: any) => (
            <option key={p.code} value={p.name} data-code={p.code}>
              {p.name}
            </option>
          ))
        : null,
    [dataProvinces, isSuccessDistricts, dataDistricts, form.state.code]
  );
  const renderedWards = useMemo(
    () =>
      isSuccessWards
        ? (dataWards || []).map((p: any) => (
            <option key={p.code} value={p.name} data-code={p.code}>
              {p.name}
            </option>
          ))
        : null,
    [dataDistricts, isSuccessWards, dataWards, form.city.code]
  );
  const handleSubmit = useCallback(() => {
    if (
      validatePhoneNumber(form.phone) &&
      !validateEmptyStr([
        form.name,
        form.state.name,
        form.city.name,
        form.district.name,
        form.address,
      ])
    ) {
      createAddress({
        name: form.name,
        phone: form.phone,
        state: form.state.name,
        city: form.city.name,
        district: form.district.name,
        address: form.address,
        isDefault: form.isDefault,
      });
    } else {
      setErr(true);
    }
  }, [validatePhoneNumber, createAddress, form]);
  useEffect(() => {
    if (isSuccessCreate) {
      setForm({
        name: '',
        phone: '',
        state: {
          code: null,
          name: '',
        },
        city: {
          code: null,
          name: '',
        },
        district: {
          code: null,
          name: '',
        },
        address: '',
        isDefault: false,
      });
      setVisibleModal({
        visibleAlertModal: {
          status: 'success',
          message: `${dataCreate?.message}`,
        },
      });
    }
  }, [isSuccessCreate]);
  useEffect(() => {
    if (err) {
      const timer = setTimeout(() => {
        setErr(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [err]);
  if (isLoadingCreate) {
    return <LoadingV2 />;
  }
  return (
    <Modal>
      <section
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-overlayBlack flex justify-center items-center text-darkGray ${
          state.visibleAddAddressModal
            ? 'w-full h-full z-[999]'
            : 'w-0 h-0 -z-10'
        }`}
      >
        <div className='bg-white w-4/5 laptop:w-1/3 p-6 flex flex-col justify-between gap-[40px] rounded'>
          <p className='text-lg font-semiBold'>New Address</p>
          <div className='flex flex-col gap-[20px]'>
            <div className='text-sm flex flex-col tablet:flex-row justify-between gap-[20px]'>
              <input
                data-type='string'
                className={`${
                  err && validateEmptyStr(form.name)
                    ? 'border-red'
                    : 'border-lightGray'
                } tablet:w-1/2 p-2 border rounded-[2px]`}
                type='text'
                name='name'
                value={form.name}
                aria-label='FullName'
                placeholder='Full name'
                onChange={handleChangeForm}
              />
              <input
                data-type='string'
                className={`${
                  err && !validatePhoneNumber(form.phone)
                    ? 'border-red'
                    : 'border-lightGray'
                } tablet:w-1/2 p-2 border border-lightGray rounded-[2px]`}
                type='text'
                name='phone'
                value={form.phone}
                aria-label='phoneNumber'
                placeholder='Phone Number'
                onChange={handleChangeForm}
              />
            </div>
            <div className='flex flex-col tablet:flex-row gap-[20px]'>
              <select
                data-type='object'
                name='state'
                id='state'
                value={form.state.name}
                data-code={form.state.code}
                className={`${
                  err && validateEmptyStr(form.state.name)
                    ? 'border-red border'
                    : ''
                } w-full text-gray text-sm`}
                onChange={handleChangeForm}
                aria-label='state'
              >
                <option value='' disabled hidden>
                  City
                </option>
                {renderedProvinces}
              </select>
              <select
                data-type='object'
                name='city'
                id='city'
                value={form.city.name}
                data-code={form.city.code}
                className={`${
                  err && validateEmptyStr(form.city.name)
                    ? 'border-red border'
                    : ''
                } w-full text-gray text-sm`}
                onChange={handleChangeForm}
                aria-label='city'
              >
                <option value='' disabled hidden>
                  District
                </option>
                {renderedDistricts}
              </select>
              <select
                data-type='object'
                name='district'
                id='district'
                value={form.district.name}
                data-code={form.district.code}
                className={`${
                  err && validateEmptyStr(form.district.name)
                    ? 'border-red border'
                    : ''
                } w-full text-gray text-sm`}
                onChange={handleChangeForm}
                aria-label='district'
              >
                <option value='' disabled hidden>
                  Ward
                </option>
                {renderedWards}
              </select>
            </div>
            <div>
              <input
                data-type='string'
                className={`${
                  err && validateEmptyStr(form.address)
                    ? 'border-red'
                    : 'border-lightGray'
                } w-full p-2 border  rounded-[2px]`}
                type='text'
                name='address'
                aria-label='address'
                value={form.address}
                placeholder='Street Name, Building, House No'
                onChange={handleChangeForm}
              />
            </div>
          </div>
          <div className='flex items-center gap-[10px]'>
            <input
              data-type='string'
              type='checkbox'
              name='isDefault'
              id='isDefault'
              checked={form.isDefault}
              onChange={handleChangeForm}
            />
            <label htmlFor='isDefault' className='text-gray'>
              Set as Default Address
            </label>
          </div>
          <div className='flex flex-col mobileLg:flex-row justify-end gap-[20px]'>
            <button
              className='mobileLg:w-[140px] h-[40px] border border-purple hover:border-darkGray text-purple hover:text-darkGray'
              onClick={() => setVisibleModal('visibleAddAddressModal')}
            >
              Cancel
            </button>
            <button
              className='mobileLg:w-[140px] h-[40px] bg-purple hover:bg-darkGray text-white'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </section>
    </Modal>
  );
};

export default AddAddressModal;
