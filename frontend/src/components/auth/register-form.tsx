import { useRouter } from 'next/router';
import Logo from '@/components/ui/logo';
import Input from '@/components/ui/forms/input';
import PasswordInput from '@/components/ui/forms/password-input';
import Button from '@/components/ui/button';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { Form } from '@/components/ui/forms/form';
import type { RegisterUserInput } from '@/types';
import * as yup from 'yup';

const registerFormSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  email: yup
    .string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es requerido'),
  password: yup.string().required('La contraseña es requerida'),
});

function RegisterForm() {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();

  function onSubmit({ name, email, password }: RegisterUserInput) {
    console.log(name)
  }

  return (
    <>
      <Form<RegisterUserInput>
        onSubmit={onSubmit}
        validationSchema={registerFormSchema}
        serverError={{}}
      >
        {({ register, formState: { errors } }) => (
          <>
            <Input
              label='Nombre'
              {...register('name')}
              variant="outline"
              className="mb-5"
              error={t(errors.name?.message!)}
            />
            <Input
              label="Correo electrónico"
              {...register('email')}
              type="email"
              variant="outline"
              className="mb-5"
              error={t(errors.email?.message!)}
            />
            <PasswordInput
              label="Contraseña"
              {...register('password')}
              error={t(errors.password?.message!)}
              variant="outline"
              className="mb-5"
            />
            <div className="mt-8">
              <Button
                className="h-12 w-full"
                loading={false}
                disabled={false}
              >
                Registrarse
              </Button>
            </div>
          </>
        )}
      </Form>
      {/* End of forgot register form */}

      <div className="relative mt-8 mb-6 flex flex-col items-center justify-center text-sm text-heading sm:mt-11 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute -top-2.5 bg-light px-2 ltr:left-2/4 ltr:-ml-4 rtl:right-2/4 rtl:-mr-4">
          O
        </span>
      </div>
      <div className="text-center text-sm text-body sm:text-base">
        Ya tienes una cuenta? {' '}
        <button
          onClick={() => openModal('LOGIN_VIEW')}
          className="font-semibold text-accent underline transition-colors duration-200 hover:text-accent-hover hover:no-underline focus:text-accent-hover focus:no-underline focus:outline-0 ltr:ml-1 rtl:mr-1"
        >
          Inicia sesión
        </button>
      </div>
    </>
  );
}
export default function RegisterView() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { closeModal } = useModalAction();
  function handleNavigate(path: string) {
    router.push(`/${path}`);
    closeModal();
  }

  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="mt-4 mb-7 px-2 text-center text-sm leading-relaxed text-body sm:mt-5 sm:mb-10 sm:px-0 md:text-base">
        Al registrarse, acepta nuestros
        <span
          onClick={() => handleNavigate('terms')}
          className="mx-1 cursor-pointer text-accent underline hover:no-underline"
        >
          Términos de servicio
        </span>
        &
        <span
          onClick={() => handleNavigate('privacy')}
          className="cursor-pointer text-accent underline hover:no-underline ltr:ml-1 rtl:mr-1"
        >
          Política de privacidad
        </span>
      </p>
      <RegisterForm />
    </div>
  );
}
