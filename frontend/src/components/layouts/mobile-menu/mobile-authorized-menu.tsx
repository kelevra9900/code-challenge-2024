import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import DrawerWrapper from '@/components/ui/drawer/drawer-wrapper';
import { useAtom } from 'jotai';
import { drawerAtom } from '@/store/drawer-atom';

export default function MobileAuthorizedMenu() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [_, closeSidebar] = useAtom(drawerAtom);

  function handleClick(path: string) {
    router.push(path);
    closeSidebar({ display: false, view: '' });
  }

  return (
    <DrawerWrapper>
      <ul className="grow">

        <li>
          <span
            className="block cursor-pointer px-5 py-3 text-sm font-semibold capitalize text-heading transition duration-200 hover:text-accent md:px-8"
            onClick={() => {}}
          >
            Salir
          </span>
        </li>
      </ul>
    </DrawerWrapper>
  );
}
