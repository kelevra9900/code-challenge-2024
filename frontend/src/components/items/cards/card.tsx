import dynamic from 'next/dynamic';
import Image from 'next/image';
import { itemPlaceholder } from '@/lib/placeholders';
import {useModalAction} from '@/components/ui/modal/modal.context';
import {Content} from '@/types';

interface ProductCardProps {
  item: Content;
  className?: string;
  cardType?: any;
}
const ItemCard: React.FC<ProductCardProps> = ({
  item,
  className,
  ...props
}) => {


  const {openModal} = useModalAction();

  function handleItemQuickView() {
    return openModal('ITEM_DETAILS',item._id);
  }
  return(
    <article className="h-full overflow-hidden rounded border border-border-200 bg-light transition-shadow duration-200 hover:shadow-sm">
      <div 
      onClick={handleItemQuickView}
        className="relative flex h-48 w-auto items-center justify-center sm:h-64 rounded-sm">
        <span className="sr-only">item image</span>
        <Image
          src={item.url || itemPlaceholder}
          alt="item image"
          fill
          sizes="(max-width: 768px) 100vw"
          className="block object-contain item-image"
        />
      </div>
      <header className="relative p-3 md:p-5 md:py-6">
        <h3 role="button" className="mb-2 text-sm font-semibold truncate text-heading">
          {item?.title}
        </h3>
      </header>
    </article>
  )
};
export default ItemCard;
