import pick from 'lodash/pick';

import {User} from "@/types";
import {Form} from "@/components/ui/forms/form";
import Card from '@/components/ui/cards/card';
import Input from '../ui/forms/input';
import Button from '../ui/button';
import FileInput from '../ui/forms/file-input';

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
							<div className="mb-6 flex flex-row">
								<Input
									className="flex-1"
									label="Tipo"
									{...register('type')}
									variant='outline'
								/>
							</div>
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
							<div className="mb-6 flex flex-row">
								<Input
									className="flex-1"
									label="Categoría"
									{...register('category')}
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
				</>
			)}
		</Form>
	);
}

export default ContentForm;