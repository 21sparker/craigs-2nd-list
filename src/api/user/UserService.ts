import User from './User';

class UserService {
    private static instance: UserService;

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    public async create(resource: any): Promise<User> {
        return await User.query().modify('create', resource).first();
    }

    public async readById(id: string): Promise<User> {
        return await User.query().modify('searchById', id).first();
    }

    public async getUserByEmail(email: string): Promise<User> {
        return await User.query().modify('searchByEmail', email).first();
    }

    public async patchById(id: string, resource: any): Promise<User> {
        return await User.query().modify('patchById', id, resource).first();
    }

    public async deleteById(id: string): Promise<void> {
        await User.query().modify('deleteById', id)
    }

    public async listAll(): Promise<Array<User>> {
        return await User.query().select();
    }
}

export default UserService.getInstance();