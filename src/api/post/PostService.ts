import User from '../user/User';
import Good from './Good';

class PostService {
    private static instance: PostService;

    public static getInstance(): PostService {
        if (!PostService.instance) {
            PostService.instance = new PostService();
        }
        return PostService.instance;
    }

    public async createGood(resource: any): Promise<Good> {
        return await Good.query().modify('create', resource).first();
    }

    public async readGoodById(id: string): Promise<Good> {
        return await Good.query().modify('searchById', id).first();
    }

}

export default PostService.getInstance();