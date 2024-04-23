import {Form} from "@/components/ui/forms/form";
import {ChangePasswordUserInput} from "@/types";

import * as yup from 'yup';
import Button from "../ui/button";
import PasswordInput from "../ui/forms/password-input";

export const changePasswordSchema = yup.object().shape({
	oldPassword: yup.string().required('La contraseña actual es obligatoria'),
	newPassword: yup.string().required('La nueva contraseña es obligatoria'),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('newPassword')],'Las contraseñas no coinciden')
		.required('Confirmar contraseña es obligatorio'),
});

export default function ChangePasswordForm() {
	function onSubmit({newPassword,oldPassword}: ChangePasswordUserInput) {
		// changePassword({
		// 	oldPassword,
		// 	newPassword,
		// });
	}
	return(
		<Form<ChangePasswordUserInput & {passwordConfirmation: string}>
			onSubmit={onSubmit}
			className="flex flex-col"
			validationSchema={changePasswordSchema}>
			{({register,formState, formState: { errors }}) => (
				<>
					<PasswordInput
						label="Contraseña actual"
						{...register('oldPassword')}
						error={errors.oldPassword?.message ?? ''}
						type="password"
						className="mb-5"
					/>
					<PasswordInput
						label="Nueva contraseña"
						{...register('newPassword')}
						error={errors.newPassword?.message ?? ''}
						type="password"
						className="mb-5"
					/>
					<PasswordInput
						label="Confirmar contraseña"
						{...register('passwordConfirmation')}
						error={errors.passwordConfirmation?.message ?? ''}
						type="password"
						className="mb-5"
					/>
					<Button className="ltr:ml-auto rtl:mr-auto">
						Cambiar contraseña
					</Button>
				</>
			)}
		</Form>
	);
}