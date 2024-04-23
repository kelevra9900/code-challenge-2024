import { useModalAction } from '@/components/ui/modal/modal.context';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { HeartGhostIcon } from '@/components/icons/heart-ghost';

function FavoriteButton({
  className,
}: {
  contentId: string;
  className?: string;
  variant?: 'default' | 'minimal';
}) {

  const { openModal } = useModalAction();

  return (
    <button
      type="button"
      className={twMerge(
        classNames(
          'bg-black bg-opacity-20 text-white mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 text-xl transition-colors',
          className
        )
      )}
      onClick={() => {}}
    >
      <>
        <HeartGhostIcon />
      </>
    </button>
  );
}

export default FavoriteButton;
