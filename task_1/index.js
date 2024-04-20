import { encoded, translations } from "./data.js";

console.log("Let's rock");
console.log(encoded, translations);

/**
 * Функция расшифровки полей с суффиксом id
 * @param encoded - список объектов для расшифровками
 * @param translations - словарь с расшифровками
 * @returns список объектов после раскодировании
 */
function decode(encoded, translations) {
  const skipKeys = ["groupId", "service", "formatSize", "ca"];

  return encoded.map((item) => {
    const decodedItem = { ...item };

    for (const key in decodedItem) {
      if (key.endsWith("Id") && !skipKeys.includes(key)) {
        const translation = translations[decodedItem[key]];

        translation !== undefined
          ? (decodedItem[key] = translation)
          : delete decodedItem[key];
      }
    }

    return decodedItem;
  });
}

const decoded = decode(encoded, translations);
console.log(decoded);

/**
 * Функция для нахождения уникальных id
 * @param encoded - список объектов, содержащих ключи с окончанием Id
 * @returns список уникальных id
 */
function getUniqueIds(encoded) {
  const uniqueIds = new Set();

  encoded.forEach((item) => {
    for (const key in item) {
      if (key.endsWith("Id") && !!item[key]) {
        uniqueIds.add(item[key]);
      }
    }
  });

  return Array.from(uniqueIds);
}

const uniqueIds = getUniqueIds(encoded);
console.log(uniqueIds);
