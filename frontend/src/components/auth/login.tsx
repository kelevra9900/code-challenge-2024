import {useSession} from 'next-auth/react';
import {useEffect} from 'react';

const Login = () => {
	const {data: session} = useSession();
	useEffect(() => {
		// is true when valid login access token and provider is available in the session
		// but not authorize/logged in
		//@ts-ignore
		if (session?.access_token && session?.provider) {
			console.log('session',session);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[session]);
	return null;
}