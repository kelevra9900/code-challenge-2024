import {Controller} from "react-hook-form";

import Button from "@/components/ui/button";
import Card from "@/components/ui/cards/card";
import {Form} from "@/components/ui/forms/form";
import Input from "@/components/ui/forms/input";
import {useCategoriesQuery, useCategoryMutation} from "@/data/category";
import Checkbox from "@/components/ui/forms/checkbox/checkbox";
import {CreateThemeInput} from "@/types";
import Label from "@/components/ui/label";
import Select from "@/components/ui/select/select";
import {sluggify} from "@/lib/utils/sluggify";

export default function ThemeForm(){
	const {data,isLoading: loadingCategories, error } = useCategoriesQuery({});
	const {createCategory, isLoading } = useCategoryMutation();

	function handleSubmit(values: any){
		const body = {
			...values,
			categoryId: values.categoryId._id,
			slug: sluggify(values.name)
		}
		createCategory(body);
	}


	return(
		<Form<CreateThemeInput>
			onSubmit={handleSubmit}
			className="flex flex-col"
			>
				{({register, control, formState: { errors }}) => (
				<div className='mb-8 flex'>
					<Card className="w-full">
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
						<Controller
							name="categoryId"
							control={control}
							render={({field}) => (
								<>
									<div className="mb-5">
										<Label htmlFor="categoryId">
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

						<div>
							{/* 3 checkbox */}
							<Checkbox label="Imagen" {...register('allowImage')} />
							<Checkbox label="Videos" {...register('allowVideos')} />
							<Checkbox label="Texto" {...register('allowText')} />
						</div>

						<div className="flex">
							<Button
								className="ltr:ml-auto rtl:mr-auto"
								loading={loadingCategories || isLoading}
								disabled={loadingCategories || isLoading}
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