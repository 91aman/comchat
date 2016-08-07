/**
 * Created by amanjain on 04/08/16 at 5:13 PM.
 * Description :
 */

const colors = ['FF1744', 'FF1744', 'D500F9', '651FFF', '3D5AFE', '2979FF', '00B0FF', '00E5FF', '1DE9B6', '00E676', 'FFC400', 'FF9100', 'FF3D00'];

export default {
    preFetchImage(src) {
        return new Promise((resolve, reject) => {
            const sprite = new Image();
            sprite.onload = function () {
                console.log('resolved');
                resolve();
            };
            sprite.src = src;
        })
    },

    preFetchImages(imagesList = []) {
        const that = this;
        return new Promise((resolve) => {
            Promise.all(imagesList.map(src => that.preFetchImage(src))).then(() => {
                    console.log('all resolved');
                    resolve();
                }
            )
        });
    },

    getRandomColor() {
        return colors[Math.floor(Math.random() * (colors.length - 1)) + 1]
    },

    pushNotification({title, body, icon = '/src/img/chatIcon.png'}){
        var notification = new Notification(title, {
            icon: icon,
            body: body
        });

        window.setTimeout(() => {
            notification.close()
        }, 2000);

        notification.onclick = function () {
            window.focus();
            notification.close();
        };
    }
}