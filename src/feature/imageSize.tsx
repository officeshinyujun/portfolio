export default function imageSize(imgSrc: string): Promise<[number, number]> {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => {
            resolve([img.naturalHeight, img.naturalWidth]);
        };
    });
}
