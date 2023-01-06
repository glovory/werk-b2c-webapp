import { useRef, useState, useCallback } from "react";
import Skeleton from '@mui/material/Skeleton';
import LoadingButton from '@mui/lab/LoadingButton';
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import debounce from 'lodash/debounce';
//
import DialogWerk from "../DialogWerk";
import InputGroup from '~/components/form/InputGroup';
import { imgLoader, enterToClick } from '~/utils/dom';
import { unsplashApi } from './api';

export interface ModalGalleryUnsplash {
  open: boolean
  onClose?: () => void
  onOpen?: () => void
  onClickImage?: (item: any) => void
  onFetch?: (ctrl?: any) => void
  onDoneFetch?: (ctrl?: any) => void
}

export default function ModalGallery({
  open,
  onClose,
  onClickImage,
  onFetch,
  onDoneFetch,
}: ModalGalleryUnsplash){
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const refController: any = useRef();
  const [loadingUnsplash, setLoadingUnsplash] = useState<boolean>(false);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [dataUnsplash, setDataUnsplash] = useState<any>();
  const [queryValue, setQueryValue] = useState<any>('');

  const fetchUnsplash = (query?: any) => {
    setLoadingUnsplash(true);

    const controller = new AbortController();
    const signal = controller.signal;
    refController.current = controller;

    onFetch?.(refController.current); // For abort signal in parent component

    const searching = typeof query === 'string';
     // query: "work" | username: "surface"
    unsplashApi.search // search | users
      .getPhotos({
        orientation: "landscape",
        perPage: 12,
        query: searching ? query : "work",
      }, { signal })
      .then((res) => {
        // console.log('res: ', res);
        setDataUnsplash(res);
      })
      .catch((e) => {
        console.log('Unsplash e: ', e);
        // if (e.name === 'AbortError') {
        //   console.log('Fetch aborted');
        // }
      })
      .finally(() => {
        setLoadingUnsplash(false);
        if(searching){
          setLoadingSearch(false);
        }
        onDoneFetch?.(); // For abort signal in parent component
        refController.current = null;
      });
  }

  const debouncedSearch = useCallback(debounce((val) => {
    setLoadingSearch(true);
    fetchUnsplash(val);
  }, 500), []); // , { leading: true, trailing: false, maxWait: 1000 }

  const onSearch = (e: any) => {
    const val = e.target.value;
    const valTrim = val.trim();
    setQueryValue(val);
    if(valTrim.length > 2){ //  && /^[aA-zZ0-9._]+$/.test(val)
      debouncedSearch(valTrim);
      return;
    }
    setLoadingUnsplash(false);
    setLoadingSearch(false);
  }

  const onCloseModalUnsplash = () => {
    const controller = refController.current;
    if(controller){
      controller.abort();
      refController.current = null;
    }
  }

  return (
    <DialogWerk
      title="Choose From Unsplash"
      fullScreen={isFullScreen}
      fullWidth
      maxWidth="md" // lg | md | sm | xl
      scroll="body"
      open={open}
      onClose={onClose}
      onEnter={fetchUnsplash}
      onExit={onCloseModalUnsplash}
    >
      <div className="pt-3 pb-4 px-6 max-md:p-3">
        <div className="flex sticky top-14 z-1 bg-white p-3 mx-n3">
          <InputGroup
            className="w-input-gray"
            // @ts-ignore
            disabled={loadingUnsplash && !queryValue.length}
            size="small"
            fullWidth
            variant="outlined"
            label="Search for an image"
            type="search"
            value={queryValue}
            onChange={onSearch}
          />
          <LoadingButton
            disabled={loadingSearch}
            loading={loadingUnsplash && !loadingSearch}
            onClick={fetchUnsplash}
            variant="outlined"
            className="px-2 ml-2 min-w-0"
            title="Reload"
          >
            <RefreshTwoToneIcon />
          </LoadingButton>
        </div>

        <div className="flex flex-row flex-wrap gap-3 mt-3 min-h-[470px]">
          {loadingUnsplash ?
            Array.from({ length: 12 }).map((v: any, idx: number) => (
              <div key={idx} className="w-[calc(25%-9px)] max-md:w-full">
                <Skeleton variant="rounded" width="100%" height={120} className="bg-gray-200" />
                <Skeleton width="40%" className="bg-gray-200 mt-1" />
              </div>
            ))
            :
            (dataUnsplash?.response?.results || []).map((li: any) => (
              <figure key={li.id} className="w-[calc(25%-9px)] max-md:w-full">
                <div
                  onClick={() => onClickImage?.(li)}
                  onKeyDown={enterToClick}
                  tabIndex={0}
                  className="rounded-md overflow-hidden cursor-pointer focus:outline-none focus:ring focus:ring-blue-300 active:ring active:ring-blue-500"
                >
                  <img
                    {...imgLoader("w-full object-cover text-0 transition-all hover:scale-150")}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    height={120}
                    alt={li.alt_description}
                    src={li.urls?.regular} // full | raw | regular | small | small_s3 | thumb
                  />
                </div>
                <figcaption className="text-sm max-w-full truncate mt-1">
                  by {li.user?.name ? <span className="underline" title={li.user.name}>{li.user.name}</span> : 'No Author'}
                </figcaption>
              </figure>
            ))
          }
        </div>
      </div>
    </DialogWerk>
  );
}

