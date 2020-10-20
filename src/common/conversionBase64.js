function getBase64Image(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    let dataURL = canvas.toDataURL("image/" + ext);
    return dataURL
}
const conversionBase64 = (img) => {
    let image = new Image();
    image.src = img;
    return getBase64Image(image)
}
export {
    conversionBase64
}