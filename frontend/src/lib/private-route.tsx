import { useRouter } from 'next/router';
import { BackArrowRound } from '@/components/icons/back-arrow-round';
import LoginView from '@/components/auth/login-form';
import { useToken } from '@/lib/hooks/use-token';

import dynamic from 'next/dynamic';
import { useHasMounted } from '@/lib/use-has-mounted';
import axios from 'axios';
import { Routes } from '@/config/routes';
import NotFound from '@/components/404/404';
import {useUser} from '@/data/user';
import {siteSettings} from '@/config/site';
const Loader = dynamic(
  () => import('@/components/ui/loaders/spinner/spinner'),
  { ssr: false }
);

const PrivateRoute: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { data: me, isLoading, error } = useUser();
  const hasMounted = useHasMounted();
  const isUser = !!me;

  if (axios.isAxiosError(error)) {
    if (error?.response?.status === 417) {
      return (
        <NotFound
          title={`${process.env.NEXT_PUBLIC_VERSION}`}
          subTitle={`This copy of ${siteSettings.name} is not genuine.`}
          linkTitle="Please contact with site admin."
          link={Routes.home}
        />
      );
    }
  }

  if (!isUser && hasMounted) {
    return (
      <div className="relative flex min-h-screen w-full justify-center py-5 md:py-8">
        <button
          className="absolute top-5 flex h-8 w-8 items-center justify-center text-gray-200 transition-colors hover:text-gray-400 ltr:left-5 rtl:right-5 md:top-1/2 md:-mt-8 md:h-16 md:w-16 md:text-gray-300 ltr:md:left-10 rtl:md:right-10"
          onClick={router.back}
        >
          <BackArrowRound />
        </button>
        <div className="my-auto flex flex-col">
          <LoginView />
        </div>
      </div>
    );
  }
  if (isUser && !isLoading && hasMounted) {
    return <div>{children}</div>;
  }

  return <Loader showText={false} />;
};

export default PrivateRoute;
