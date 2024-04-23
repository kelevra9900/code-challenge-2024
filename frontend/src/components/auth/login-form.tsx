import * as yup from 'yup';
import { toast } from 'react-toastify';

import Logo from '@/components/ui/logo';
import Alert from '@/components/ui/alert';
import Input from '@/components/ui/forms/input';
import PasswordInput from '@/components/ui/forms/password-input';
import Button from '@/components/ui/button';
import {useTranslation} from 'next-i18next';
import {useModalAction} from '@/components/ui/modal/modal.context';
import {Form} from '@/components/ui/forms/form';
import type {LoginUserInput} from '@/types';
import {useLogin} from '@/data/user';
import {useAtom} from 'jotai';
import {authorizationAtom} from '@/store/authorization-atom';
import {useToken} from '@/lib/hooks/use-token';

const loginFormSchema = yup.object().shape({
	email: yup
		.string()
		.email('Correo electrónico inválido')
		.required('El correo electrónico es requerido'),
	password: yup.string().required('La contraseña es requerida'),
});
function LoginForm() {
	const {openModal} = useModalAction();
	const [_,setAuthorized] = useAtom(authorizationAtom);
	const {setToken} = useToken();

	const {closeModal} = useModalAction();

	const {mutate: login,isLoading} = useLogin();

	function onSubmit({email,password}: LoginUserInput) {
		login(
			{
				email,
				password,
			},
			{
				onSuccess: (data) => {
					if(data.success) {
						setToken(data.responseObject.authentication.sessionToken)
						setAuthorized(data.success);
						closeModal();
					}
				},
				onError: () => { 
					toast.error('Error al iniciar sesión, por favor intenta de nuevo', {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
					});
				},
			}
		);
	}

	return (
		<>
			<Alert
				variant="error"
				message={''}
				className="mb-6"
				closeable={true}
				onClose={() => {}}
			/>
			<Form<LoginUserInput>
				onSubmit={onSubmit}
				validationSchema={loginFormSchema}
			>
				{({register,formState: {errors}}) => (
					<>
						<Input
							label='Correo electrónico'
							{...register('email')}
							type="email"
							variant="outline"
							className="mb-5"
							error={errors.email?.message!}
						/>
						<PasswordInput
							label='Contraseña'
							{...register('password')}
							error={errors.password?.message!}
							variant="outline"
							className="mb-5"
							forgotPageRouteOnClick={() => openModal('FORGOT_VIEW')}
						/>
						<div className="mt-8">
							<Button
								className="w-full h-11 sm:h-12"
								loading={isLoading}
								disabled={isLoading}
							>
								Iniciar sesión
							</Button>
						</div>
					</>
				)}
			</Form>
			{/* //===============// */}
			<div className="relative flex flex-col items-center justify-center mt-8 mb-6 text-sm text-heading sm:mt-11 sm:mb-8">
				<hr className="w-full" />
			</div>
			<div className="text-sm text-center text-body sm:text-base">
				No tienes una cuenta? {' '}
				<button
					onClick={() => openModal('REGISTER')}
					className="font-semibold underline transition-colors duration-200 text-accent hover:text-accent-hover hover:no-underline focus:text-accent-hover focus:no-underline focus:outline-0 ltr:ml-1 rtl:mr-1"
				>
					Regístrate
				</button>
			</div>
		</>
	);
}

export default function LoginView() {
	const {t} = useTranslation('common');
	return (
		<div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
			<div className="flex justify-center">
				<Logo />
			</div>
			<p className="mt-4 mb-8 text-sm text-center text-body sm:mt-5 sm:mb-10 md:text-base">
				Inicia sesión en tu cuenta
			</p>
			<LoginForm />
		</div>
	);
}
