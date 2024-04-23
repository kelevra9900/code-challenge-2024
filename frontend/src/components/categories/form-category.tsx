import * as yup from 'yup';
import {CreateCategoryInput} from '@/types/index';
import {Form} from '@/components/ui/forms/form';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';
import FileInput from '../ui/forms/file-input';


export const createCategorySchema = yup.object().shape({
	name: yup.string().required('Nombre es obligatorio'),
	slug: yup.string().required('Slug es obligatorio'),
	icon: yup.string(),
	image: yup.string(),
});
export default function CreateFormCategory() {

	function handleSubmit(values: CreateCategoryInput) {
		console.log(values);
	}
	return (
		<Form<CreateCategoryInput>
			onSubmit={handleSubmit}
			className="flex flex-col"
			validationSchema={createCategorySchema}>
			{({register,formState, control}) => (
				<>
					<div className="mb-8">
						<label className="mb-3 block text-sm font-semibold leading-none text-body-dark2">Portada</label>
						<FileInput control={control} name="imagen" />
					</div>

					<Input
						label="Nombre"
						{...register('name')}
						error={formState.errors['name']?.message}
						className="mb-5"
					/>

					<Input
						label="Slug"
						{...register('slug')}
						error={formState.errors['slug']?.message}
						className="mb-5"
					/>

					<Input
						label="Icono"
						{...register('icon')}
						error={formState.errors['icon']?.message}
						className="mb-5"
					/>

					<Button className="ltr:ml-auto rtl:mr-auto">
						Guardar
					</Button>
				</>
			)}
		</Form>
	);
}