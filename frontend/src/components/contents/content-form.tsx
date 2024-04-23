import {Controller} from "react-hook-form";

import {Form} from "@/components/ui/forms/form";
import Card from '@/components/ui/cards/card';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';
import FileInput from '@/components/ui/forms/file-input';
import Select from "@/components/ui/select/select";
import Label from "@/components/ui/forms/label";

const icons = [
	{
		value: 'image',
		label: 'Imagen',
	},
	{
		value: 'video',
		label: 'Video',
	},
	{
		value: 'audio',
		label: 'Audio',
	},
	{
		value: 'pdf',
		label: 'PDF',
	},
	{
		value: 'doc',
		label: 'Documento',
	}
];
const ContentForm = () => {
	function onSubmit(data: any) {
		console.log(data);
	}

	return (
		<Form<any>
			onSubmit={onSubmit}
		>
			{({register,control}) => (
				<>
					<div className='mb-8 flex'>
						<Card className="w-full">
							<div className="mb-8">
								<FileInput control={control} name="avatar" />
							</div>

							<div className="mb-6 flex flex-row">
								<Input
									className="flex-1"
									label="Título"
									{...register('title')}
									variant='outline'
								/>
							</div>
							<div className="mb-6 flex flex-row">
								<Input
									className="flex-1"
									label="slug"
									{...register('slug')}
									variant='outline'
								/>
							</div>
							<Controller
								name="type"
								control={control}
								render={({field}) => (
									<>
										<div className="mb-5">
											<Label htmlFor="images">
												Selecciona un tipo de contenido
											</Label>
											<Select
												{...field}
												options={icons}
												isDisabled={false}
												isLoading={false}
												isSearchable={false}
												placeholder={'Selecciona un tipo de contenido'}
												className="basic-multi-select"
												classNamePrefix="select"
												isMulti={false}
											/>
										</div>
									</>
								)}
							/>
							<div className="mb-6 flex flex-row">
								<Input
									className="flex-1"
									label="URL"
									{...register('type')}
									variant='outline'
								/>
							</div>
							<div className="mb-6 flex flex-row">
								<Input
									className="flex-1"
									label="Texto"
									{...register('text')}
									variant='outline'
								/>
							</div>
							<Controller
								name="category"
								control={control}
								render={({field}) => (
									<>
										<div className="mb-5">
											<Label htmlFor="images">
												Selecciona una categoría
											</Label>
											<Select
												{...field}
												options={[]}
												isDisabled={false}
												isLoading={false}
												isSearchable={false}
												placeholder={'Selecciona una categoría'}
												className="basic-multi-select"
												classNamePrefix="select"
												isMulti={false}
											/>
										</div>
									</>
								)}
							/>

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
				</>
			)}
		</Form>
	);
}

export default ContentForm;