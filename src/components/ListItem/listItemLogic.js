import { encode, decode } from "base64-arraybuffer";

export function decodeImage(encodedImage) {
  const decoded = decode(encodedImage);
  return decoded;
}

export function encodeImage(decodedImage) {
  const encoded = encode(decodedImage);
  return encoded;
}
