import Button from "../ui/button";
import Card from "../ui/cards/card";
import FileInput from "../ui/forms/file-input";
import {Form} from "../ui/forms/form";
import Input from "../ui/forms/input";

export default function ThemeForm(){
	function handleSubmit(values: any){
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