import CheckboxGroup from "../search-view/checkbox-group";
import Button from "../ui/button";
import Card from "../ui/cards/card";
import FileInput from "../ui/forms/file-input";
import {Form} from "../ui/forms/form";
import Input from "../ui/forms/input";
import {useCategoriesQuery} from "@/data/category";
import Checkbox from "../ui/forms/checkbox/checkbox";
import {useState} from "react";

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
		<Form<any>
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
						</div>
						<div className="mb-6 flex flex-row">
							<Input
								className="flex-1"
								label="Slug"
								{...register('slug')}
								variant='outline'
							/>
						</div>

						{/* Column with 3 options */}
						<div className="grid grid-cols-1 gap-4">
							<CheckboxGroup values={[state]} onChange={handleChange}>
								{data.map((category: any) => (
									<Checkbox
										key={category._id}
										label={category.name}
										name={category.slug}
										value={category._id}
										theme="secondary"
									/>
								))}
							</CheckboxGroup>
						</div>

						<div className="flex">
							<Button
								className="ltr:ml-auto rtl:mr-auto"
								loading={false}
								disabled={false}
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