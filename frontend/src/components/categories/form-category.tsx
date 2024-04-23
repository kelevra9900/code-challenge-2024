import * as yup from 'yup';
import {CreateCategoryInput} from '@/types/index';
import {Form} from '@/components/ui/forms/form';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';
import FileInput from '../ui/forms/file-input';
import {useCategoryMutation} from '@/data/category';
import {sluggify} from '@/lib/utils/sluggify';
import Select from '../ui/select/select';
import {Controller} from 'react-hook-form';
import Label from '../ui/forms/label';
import {getIcon} from '@/lib/get-icon';
import * as CategoryIcons from '@/components/icons/category';
import {useState} from 'react';

export const createCategorySchema = yup.object().shape({
	name: yup.string().required('Nombre es obligatorio'),
});

const icons = [
	{
		value: 'ImageIcon',
		label: 'Imagen',
	},
	{
		value: 'VideosIcon',
		label: 'Video',
	},
	{
		value: 'DocsIcon',
		label: 'Documento',
	}
]

export default function CreateFormCategory() {
	const {createCategory,isLoading: creating} = useCategoryMutation();
	const [ icon, setIcon ] = useState<string>('');

	function handleSubmit(values: CreateCategoryInput) {
		const objc = {
			name: values.name,
			icon,
			slug: sluggify(values.name),
		}
		createCategory(objc);
	}


	return (
		<Form<CreateCategoryInput>
			onSubmit={handleSubmit}
			className="flex flex-col"
			validationSchema={createCategorySchema}>
			{({register,formState,control}) => (
				<>
					<div className="mb-8">
						<label className="mb-3 block text-sm font-semibold leading-none text-body-dark2">Portada</label>
						<FileInput control={control} name="imagen" />
					</div>


					<Controller
						name="icon"
						control={control}
						render={({field,formState: {errors }}) => (
							<>
								<div className="mb-10">
									<Label htmlFor="icon">
										Selecciona un icono disponible
									</Label>
									<Select
										{...field}
										options={icons}
										isDisabled={false}
										isLoading={false}
										isSearchable={false}
										placeholder={'Iconos disponibles'}
										className="basic-multi-select"
										classNamePrefix="select"
										onChange={(value: any) => {
											setIcon(value.value);
										}}
										isMulti={false}
									/>
									{errors.icon && (
												<p className="mt-2 text-xs text-red-500">
													{errors.icon?.message!}
												</p>
											)}
								</div>
							</>
						)}
					/>

					<Input
						label="Nombre"
						{...register('name')}
						error={formState.errors['name']?.message}
						className="mb-5"
					/>
					<Button className="ltr:ml-auto rtl:mr-auto" disabled={creating} loading={creating}>
						Guardar
					</Button>
				</>
			)}
		</Form>
	);
}