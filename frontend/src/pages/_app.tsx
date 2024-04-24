import type {AppProps} from "next/app";
import dynamic from "next/dynamic";
import {SessionProvider} from 'next-auth/react';
import {appWithTranslation} from 'next-i18next';

import QueryProvider from "@/data/client/query-provider";
import {NextPageWithLayout} from '@/types';
import '@/assets/css/main.css';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from '@/lib/private-route';

import DefaultSeo from "@/components/seo/default-seo";
import {ModalProvider} from "@/components/ui/modal/modal.context";
import {SearchProvider} from "@/components/ui/search/search.context";
import ManagedModal from "@/components/ui/modal/managed-modal";
import ManagedDrawer from "@/components/ui/drawer/managed-drawer";
import {useRouter} from "next/router";
import {getDirection} from "@/lib/constants";
import {useEffect,useState} from "react";

const ToastContainer = dynamic(
  () => import('react-toastify').then((module) => module.ToastContainer),
  {ssr: false},
);

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({
  Component,
  pageProps: {
    session,
    ...pageProps
  },
}: AppPropsWithLayout) {
  const [domLoaded,setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  },[]);


  const getLayout = Component.getLayout ?? ((page) => page);
  const authenticationRequired = Component.authenticationRequired ?? false;
  const {locale} = useRouter();
  const dir = getDirection(locale);

  return (
    <>
      <div dir={dir}>
        <SessionProvider session={session}>
          <QueryProvider pageProps={pageProps}>
            <SearchProvider>
              <ModalProvider>
                {
                  domLoaded && (
                    <>
                      <DefaultSeo />
                      {authenticationRequired ? (
                        <PrivateRoute>
                          {getLayout(<Component {...pageProps} />)}
                        </PrivateRoute>
                      ) : (
                        getLayout(<Component {...pageProps} />)
                      )}
                      <ManagedModal />
                      <ManagedDrawer />
                      <ToastContainer autoClose={2000} theme="colored" />
                    </>
                  )
                }
              </ModalProvider>
            </SearchProvider>
          </QueryProvider>
        </SessionProvider>
      </div>
    </>
  );
}

export default appWithTranslation(CustomApp);
