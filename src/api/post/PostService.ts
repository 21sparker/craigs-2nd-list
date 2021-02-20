import { getOriginalNode } from 'typescript';
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
        await this.getAdditionalRelatedFields(good);
        return good;
    }

    public async readGoodById(id: string): Promise<Good> {
        const good = await Good.query().modify('searchById', id).first();
        await this.getAdditionalRelatedFields(good);
        return good;
    }

    public async patchGoodById(id: string, resource: any): Promise<Good> {
        console.log('Patch Good Id: ' + id);
        console.log('Patch Resource: ' + resource);
        const good =  await Good.query().modify('patchById', id, resource).first();
        await this.getAdditionalRelatedFields(good);
        return good;
    }

    public async deleteGoodById(id: string, resource: any): Promise<void> {
        await Good.query().modify('deleteById', id)
    }

    public async search(q: string | undefined,
                        sc: string | string[] | undefined,
                        loc: string | undefined,
                        uid: string | undefined): Promise<Good[]> {
        console.log("Running search")
        let qBuilder = Good.query();

        if (sc) {
            if (Array.isArray(sc)) {
                qBuilder = qBuilder.whereIn('subcategory_id', sc!.map(c => parseInt(c)));
            } else if (typeof sc === "string") {
                qBuilder = qBuilder.where('subcategory_id', parseInt(sc));
            }
        }
        if (uid) {
            qBuilder = qBuilder.where('user_id', parseInt(uid));
        }
        if (q) {
            q.split(' ').map((w: string) => {
                qBuilder.where(builder => {
                    builder.where('title', '~*', w).orWhere('description', '~*', w);
                });
            });
        }
        if (loc) {
            loc.split(' ').map((w: string) => {
                qBuilder.where(builder => {
                    builder.where('city', '~*', w).orWhere('state', '~*', w);
                });
            });
        }
        
        const results: Good[] = await qBuilder.orderBy('created_at', 'desc').debug();        
        results.map(async item => await this.getAdditionalRelatedFields(item));
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