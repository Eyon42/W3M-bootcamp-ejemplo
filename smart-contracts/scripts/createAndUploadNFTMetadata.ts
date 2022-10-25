import pinataSDK from '@pinata/sdk';
import dotenv from 'dotenv';
import * as fs from 'fs'

dotenv.config()

const pinata = pinataSDK({ pinataJWTKey: process.env.PINATA_JWT});

async function main() {
    const hashes: string[] = []
    
    const catPics = ["https://cdn.pixabay.com/photo/2017/06/12/19/02/cat-2396473__480.jpg","https://cdn.pixabay.com/photo/2015/06/03/13/13/cats-796437__480.jpg","https://cdn.pixabay.com/photo/2012/11/26/13/58/cat-67345__480.jpg","https://cdn.pixabay.com/photo/2014/09/18/20/17/cat-451377__480.jpg","https://cdn.pixabay.com/photo/2015/01/31/12/36/cat-618470__480.jpg","https://cdn.pixabay.com/photo/2014/07/24/18/40/cat-401124__480.jpg","https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262__480.jpg","https://cdn.pixabay.com/photo/2015/02/14/10/16/cat-636172__480.jpg","https://cdn.pixabay.com/photo/2013/10/28/14/30/cat-201855__480.jpg","https://cdn.pixabay.com/photo/2015/04/16/15/21/cat-725793__480.jpg","https://cdn.pixabay.com/photo/2016/01/20/13/05/cat-1151519__480.jpg","https://cdn.pixabay.com/photo/2017/05/31/21/52/cat-2361787__480.jpg","https://cdn.pixabay.com/photo/2014/10/01/10/46/cat-468232__480.jpg","https://cdn.pixabay.com/photo/2014/04/29/13/19/cat-334383__480.jpg","https://cdn.pixabay.com/photo/2014/01/17/14/53/cat-246933__480.jpg","https://cdn.pixabay.com/photo/2017/05/31/21/46/cats-2361762__480.jpg","https://cdn.pixabay.com/photo/2017/05/21/22/06/cat-2332444__480.jpg","https://cdn.pixabay.com/photo/2014/03/30/23/35/cat-301720__480.jpg","https://cdn.pixabay.com/photo/2017/05/21/22/07/cat-2332451__480.jpg","https://cdn.pixabay.com/photo/2014/08/03/00/51/kitten-408798__480.jpg","https://cdn.pixabay.com/photo/2017/05/11/07/27/cat-2303146__480.jpg","https://cdn.pixabay.com/photo/2014/03/30/23/49/cat-301723__480.jpg","https://cdn.pixabay.com/photo/2013/07/18/20/27/cat-165068__480.jpg","https://cdn.pixabay.com/photo/2017/05/25/07/40/cat-2342562__480.jpg","https://cdn.pixabay.com/photo/2017/05/30/22/27/british-shorthair-2358404__480.jpg","https://cdn.pixabay.com/photo/2017/04/06/15/15/cat-2208535__480.jpg","https://cdn.pixabay.com/photo/2017/05/18/10/57/cat-2323258__480.jpg","https://cdn.pixabay.com/photo/2016/11/18/21/26/cat-1836936__480.jpg","https://cdn.pixabay.com/photo/2017/03/19/22/09/cat-2157747__480.jpg","https://cdn.pixabay.com/photo/2017/04/21/13/24/red-headed-cat-2248705__480.jpg"]
    const catSounds = ["Aohhuu","Bark","Barky","Caterwaul","Chatter","Chirp","Chirrup","Churr","Chuckling","Coughing","Cough","Eh","Grow","Grunt","Gurgl","Meow","Moan","Mrrr","Orr","o-o","Ouch","Piercing","Prusten","Puff","Purr","Hiss","Roar","Scream","Snar","Snort","Spit","Squeak","Stutter","Swallowed","Trill","Wah","Whistle","Yap","Yea","Yelp","Yowl"]
    const max = 100
    
    const catMetadata = catPics.slice(0, max).map((picURL, i) => ({
        "description": "A cute cat",
        "image": picURL, 
        "name": catSounds[i]
    }))
    
    for (let i=0; i<catMetadata.length; i++) {
        console.log("uploading", catMetadata[i].name)
        try {
            const res = await pinata.pinJSONToIPFS(catMetadata[i])
            hashes.push(res.IpfsHash)
        }
        catch (e) {
            console.log(e)
        }
        setTimeout(()=>"", 500)
    }
    catMetadata.forEach(async (m) => {

    })

    fs.writeFileSync("deployments/IPFS/cats.json", JSON.stringify(hashes))
}


main()