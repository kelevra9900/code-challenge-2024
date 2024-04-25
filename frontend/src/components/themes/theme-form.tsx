import {useState} from "react";

import CheckboxGroup from "../search-view/checkbox-group";
import Button from "../ui/button";
import Card from "../ui/cards/card";
import FileInput from "../ui/forms/file-input";
import {Form} from "../ui/forms/form";
import Input from "../ui/forms/input";
import {useCategoriesQuery} from "@/data/category";
import Checkbox from "../ui/forms/checkbox/checkbox";
import {CreateThemeInput} from "@/types";

// const options = [
// 	{
// 		label: 'Imagen',
// 		value: 'allowImage',
// 	},
// 	{
// 		label: 'Videos',
// 		value: 'allowVideos',
// 	},
// 	{
// 		label: 'Texto',
// 		value: 'allowText',
// 	},
// ];
export default function ThemeForm(){
	const [ state, setState ] = useState('');
	const { data, isLoading, error } = useCategoriesQuery({});
	function handleSubmit(values: any){
		console.log(values);
	}

	function handleChange(values: any){
		console.log(values);
	}



	return(
		<Form<CreateThemeInput>
			onSubmit={handleSubmit}
			// validationSchema={}
			className="flex flex-col"
			// serverError={formError}
			>
				{({register,formState, control, formState: { errors }}) => (
				<div className='mb-8 flex'>
					<Card className="w-full">
						<div className="mb-8">
							<FileInput control={control} name="image" />
						</div>

						<div className="mb-6 flex flex-row">
							<Input
								className="flex-1"
								label="Nombre"
								{...register('name')}
								variant='outline'
							/>
							{
								errors.name && <p className="text-red-500">{errors.name.message}</p>
							}
						</div>

						{/* Column with 3 options */}
						<div className="grid grid-cols-1 gap-4">
							<Checkbox
								key={'allowImage'}
								name="type"
								label={'Imagen'}
								value={state}
								onChange={handleChange}
								multiple={false}
							/>
							<Checkbox
								key={'allowVideos'}
								name="type"
								label={'Videos'}
								value={state}
								onChange={handleChange}
								multiple={false}
							/>

							<Checkbox
								key={'allowText'}
								name="type"
								label={'Texto'}
								value={state}
								onChange={handleChange}
								multiple={false}
							/>
							<Checkbox
								key={'allowImage'}
								name="type"
								label={'Imagen'}
								value={state}
								onChange={handleChange}
								multiple={false}
							/>
						</div>

						<div className="flex">
							<Button
								className="ltr:ml-auto rtl:mr-auto"
								loading={isLoading}
								disabled={isLoading}
							>
								Guardar
							</Button>
						</div>
					</Card>
				</div>
				)}
		</Form>
	);
}