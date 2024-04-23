import pick from 'lodash/pick';

import {UpdateUserInput, User} from "@/types";
import {Form} from "@/components/ui/forms/form";
import Card from '@/components/ui/cards/card';
import Input from '../ui/forms/input';
import Button from '../ui/button';
import FileInput from '../ui/forms/file-input';

const ProfileForm = ({user}: { user: User }) => {
	function onSubmit(data: UpdateUserInput) {
		console.log(data);
	}
	
	return(
		<Form<UpdateUserInput>
			onSubmit={onSubmit}
			useFormProps={{
				...(user && {
					defaultValues: pick(user,['email', 'username', 'role']),
				}),
			}}
		>
			{({register, control}) => (
				<>
					<div className='mb-8 flex'>
						<Card className="w-full">
							<div className="mb-8">
								<FileInput control={control} name="avatar" />
							</div>

							<div className="mb-6 flex flex-row">
								<Input
									className="flex-1"
									label="username"
									{...register('username')}
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

export default ProfileForm;