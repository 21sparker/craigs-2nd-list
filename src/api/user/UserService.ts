import User from './User';

class UserService {
    private static instance: UserService;

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    public async create(resource: any) {
        return await User.query().modify('create', resource);
    }

    public async readById(id: string) {
        return await User.query().modify('searchById', id);
    }

    public async patchById(id: string, resource: any) {
        return await User.query().modify('patchById', id, resource)
    }

    public async deleteById(id: string, resource: any) {
        return await User.query().modify('deleteById', id)
    }




}