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

    public async search(q: string | undefined,
                        sc: string | string[] | undefined,
                        loc: string | string[] | undefined,
                        uid: string | undefined): Promise<Good[]> {

        const results: Good[] = await Good.query().where((builder) => {
            if (sc) {
                if (Array.isArray(sc)) {
                    builder = builder.whereIn('subcategory_id', sc!.map(c => parseInt(c)));
                } else if (typeof sc === "string") {
                    builder = builder.where('subcategory_id', parseInt(sc));
                }
            }
            if (uid) {
                builder = builder.where('user_id', parseInt(uid));
            }
            if (q) {
                const queryWords = q.split(' ');
                queryWords.map((w: string) => {
                    console.log(`%${w}%`)
                    builder = builder.where('title', '~*', w);
                })
            }
        });
        
        // const results: Good[] = await Good.query().where('title', '~*', 'mens')
        console.log(results);
        return results;
    }

}

export default PostService.getInstance();