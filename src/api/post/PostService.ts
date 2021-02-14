import Category from '../category/Category';
import Subcategory from '../category/Subcategory';
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
        const good = await Good.query().modify('create', resource).first();
        this.getAdditionalRelatedFields(good);
        return good;
    }

    public async readGoodById(id: string): Promise<Good> {
        const good = await Good.query().modify('searchById', id).first();
        await this.getAdditionalRelatedFields(good);
        return good;
    }

    public async patchGoodById(id: string, resource: any): Promise<Good> {
        const good =  await Good.query().modify('patchById', id).first();
        await this.getAdditionalRelatedFields(good);
        return good;
    }

    public async deleteGoodById(id: string, resource: any): Promise<void> {
        await Good.query().modify('deleteById', id)
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


    private async getAdditionalRelatedFields(good: Good): Promise<Good> {
        good.user = await User.query().modify('searchById', good.user_id).first();
        good.category = (await Category.query().modify('searchById', good.category_id).first()).name;
        good.subcategory = (await Subcategory.query().modify('searchById', good.subcategory_id).first()).name;
        return good;
    }

}

export default PostService.getInstance();