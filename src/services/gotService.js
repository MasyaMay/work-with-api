export default class gotService {
    constructor() {
        this._basic = 'https://anapioficeandfire.com/api/';
    }

    getPost = async (url) => {
        let res = await fetch(this._basic + url)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return await res.json();
    }

    _transformCharacter = post => {
        post = {
            id: this.installId(post.url),
            name: post.name,
            gender: post.gender,
            born: post.born,
            died: post.died,
            culture: post.culture
        }
        return this.checkEmpty(post);
    }

    _transformBooks = post => {
        post = {
            id: this.installId(post.url),
            name: post.name,
            authors: post.authors,
            numberOfPages: post.numberOfPages,
            publisher: post.publisher
        }
        return this.checkEmpty(post);
    }

    _transformHouses = async post => {
        const {name} = await this.getPost('houses/' + this.installId(post.overlord));
        
        post = {
            id: this.installId(post.url),
            name: post.name,
            region: post.region,
            words: post.words,
            titles: post.titles.join(', '),
            overlord: name,
            ancestralWeapons: post.ancestralWeapons.join(', ')
        }
        return this.checkEmpty(post);
    }

    installId = (url) => {
        url += "";
        return url = url.slice(url.lastIndexOf('/') + 1, url.length);
    }

    checkEmpty = post => {
        for (let key in post) {
            if (!post[key]) {
                post[key] = 'no data'
            }
        }
        return post;
    }


    getFirstCharacter = async () => {
        const posts = await this.getCharacterAll();
        return +posts[0].id;
    }

    getCharacter = async id => {
        return this._transformCharacter(await this.getPost('characters/' + id));
    }

    getCharacterAll = async () => {
        const posts = await this.getPost('characters/?page=8&pageSize=14');
        return posts.map(this._transformCharacter);
    }



    getFirstBook = async () => {
        const posts = await this.getBooksAll();
        return +posts[0].id;
    }

    getBook = async id => {
        return this._transformBooks(await this.getPost('books/' + id));
    }

    getBooksAll = async () => {
        const posts = await this.getPost('books');
        return posts.map(this._transformBooks)
    }



    getFirstHouse = async () => {
        const posts = await this.getHousesAll();
        return +posts[0].id;
    }

    getHouse = async id => {
        return await this._transformHouses(await this.getPost('houses/' + id));
    }

    getHousesAll = async () => {
        const posts = await this.getPost('houses/?page=15&pageSize=7');
        return Promise.all(posts.map(this._transformHouses));
    }

}
