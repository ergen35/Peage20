import 'reflect-metadata';
import { AppUserInfos } from './lib/models/AppUserInfos';


declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: AppUserInfos | null
		}
		interface PageData {
			user: AppUserInfos | null
		}
		interface LayoutData{
			user:  AppUserInfos | null
		}
		interface LayoutServerData{
			user:  AppUserInfos
		}
		// interface Platform {}
	}
}

export {};
