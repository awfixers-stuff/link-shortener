import QRCode from "qrcode";

export function generateQRCodeSVG(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    QRCode.toString(
      url,
      { type: "svg" },
      (err, svg: string | PromiseLike<string>) => {
        if (err) reject(err);
        resolve(svg);
      }
    );
  });
}
