import {Controller, useForm} from "react-hook-form";

import {Form} from "@/components/ui/forms/form";
import Card from '@/components/ui/cards/card';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';
import Select from "@/components/ui/select/select";
import Label from "@/components/ui/forms/label";
import {useCategoriesQuery} from "@/data/category";
import {useCreateContentMutation} from "@/data/content";
import {useUser} from "@/data/user";
import {sluggify} from "@/lib/utils/sluggify";
import {useThemesQuery} from "@/data/theme";
import TextArea from "../ui/text-area";
import FileInput from "../ui/forms/file-input";

export enum ContentType {
	TEXT = 'TEXT',
	IMAGE = 'IMAGE',
	VIDEO = 'VIDEO',
}
const contentsTypes = [
	{title: 'Texto', value: ContentType.TEXT},
	{title: 'Imagen', value: ContentType.IMAGE},
	{title: 'Video', value: ContentType.VIDEO},
]


const ContentForm = () => {
	const { setValue } = useForm();

	const setCustomValue = (id: string,value: any) => {
		setValue(id,value,{
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true
		})
	}

	const { data, isLoading: loadingCategories, error } = useCategoriesQuery({});
	const { data: themes, isLoading: loadingThemes, error: errorThemes } = useThemesQuery({});
	const { mutate: createContent, isLoading: creating, error: errorCreating } = useCreateContentMutation();

	const { data: me } = useUser();
	function onSubmit(data: any) {		// console.log(data)
		const body = {
			...data,
			userId: me?._id,
			slug: sluggify(data.title),
			category: data.category._id,
			type: data.type.value,
			themeId: data.themeId._id,
		}
		createContent(body);
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
								<FileInput control={control} name="url" />
							</div>

							<div className="mb-6 flex flex-row">
								<Input
									className="flex-1"
									label="Título"
									{...register('title')}
									variant='outline'
								/>
							</div>
							<Controller
								name="type"
								control={control}
								render={({field}) => (
									<>
										<div className="mb-5">
											<Label htmlFor="type">
												Selecciona un tipo de contenido
											</Label>
											<Select
												{...field}
												options={contentsTypes}
												isDisabled={false}
												isLoading={false}
												isSearchable={false}
												getOptionLabel={(options: any) => {
													return options.title;
												}}
												placeholder={'Selecciona un tipo de contenido'}
												className="basic-multi-select"
												classNamePrefix="select"
												isMulti={false}
											/>
										</div>
									</>
								)}
							/>

							<Controller
								name="themeId"
								control={control}
								render={({field}) => (
									<>
										<div className="mb-5">
											<Label htmlFor="theme">
												Selecciona un tema
											</Label>
											<Select
												{...field}
												options={themes}
												isDisabled={false}
												isLoading={loadingThemes}
												isSearchable={false}
												getOptionLabel={(options: any) => {
													return options.name;
												}}
												placeholder={'Selecciona un tema'}
												className="basic-multi-select"
												classNamePrefix="select"
												isMulti={false}
											/>
										</div>
									</>
								)}
							/>

							<Controller
								name="category"
								control={control}
								render={({field}) => (
									<>
										<div className="mb-5">
											<Label htmlFor="images">
												Selecciona una categoría
											</Label>
											{
												!loadingCategories && !error && (
													<Select
														{...field}
														options={data}
														isDisabled={false}
														isLoading={loadingCategories}
														isSearchable={false}
														getOptionLabel={(options: any) => {
															return options.name;
														}}
														placeholder={'Selecciona una categoría'}
														className="basic-multi-select"
														classNamePrefix="select"
														isMulti={false}
													/>
												)
											}
										</div>
									</>
								)}
							/>

							{/* <div className="mb-6 flex flex-row">
								<Input
									className="flex-1"
									label="URL"
									{...register('url')}
									variant='outline'
								/>
							</div> */}
							<div className="mb-6 flex flex-row">
								<TextArea
									className="flex-1"
									label="Texto"
									{...register('text')}
									variant='outline'
								/>
							</div>

							<div className="flex">
								<Button
									className="ltr:ml-auto rtl:mr-auto"
									loading={loadingCategories || creating}
									disabled={loadingCategories || creating}
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