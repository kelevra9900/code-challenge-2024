import dynamic from 'next/dynamic';

import Modal from '@/components/ui/modal/modal';
import {useModalAction,useModalState} from './modal.context';

const Login = dynamic(() => import('@/components/auth/login-form'),{
	ssr: false,
});
const Register = dynamic(() => import('@/components/auth/register-form'),{
	ssr: false,
});

const ContentDetails = dynamic(() => import('@/components/items/details/popup'),{
	ssr: false,
})

const ManagedModal = () => {
	const {isOpen,view,data} = useModalState();
	const {closeModal} = useModalAction();

	return (
		<Modal open={isOpen} onClose={closeModal}>
			{view === 'LOGIN_VIEW' && <Login />}
			{view === 'REGISTER' && <Register />}
			{view === 'ITEM_DETAILS' && (
				<ContentDetails itemID={data} />
			)}
		</Modal>
	);
}

export default ManagedModal;