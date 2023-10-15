export const findKeyByTranslation = (translations: any, translatedValue: any) => {
    for (const key in translations) {
      if (translations[key] === translatedValue) {
        return key;
      }
    }
    return null;
}
  