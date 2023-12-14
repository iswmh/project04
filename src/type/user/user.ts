export interface RootObject {
	offset: number;
	size: number;
}

export interface CreateUser {
	name: string;
	realname: string;
	password: string;
	cellphone: number;
	departmentId: number;
	roleId: number;
}

export interface ChangeUser {
	name: string;
	realname: string;
	cellphone: number;
	departmentId: number;
	roleId: number;
}