/**
 * Created by amanjain on 04/08/16 at 5:13 PM.
 * Description :
 */


export default {
    preFetchImage: function (src) {
        return new Promise((resolve, reject) => {
            const sprite = new Image();
            sprite.onload = function () {
                console.log('resolved');
                resolve();
            };
            sprite.src = src;
        })
    },

    preFetchImages: function (imagesList = []) {
        const that = this;
        return new Promise((resolve) => {
            Promise.all(imagesList.map(src => that.preFetchImage(src))).then(() => {
                    console.log('all resolved');
                    resolve();
                }
            )
        });
    }
}