import 'reflect-metadata';
import { AppUserInfos } from './entities/AppUserInfos';


declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: AppUserInfos | null
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
