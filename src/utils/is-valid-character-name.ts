/* eslint-disable no-misleading-character-class */
export const isValidCharacterName = (name: string) => {
  const nameRegex = /^[ A-Za-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝÞßàáâãäåçèéêëìíîïðñòóôõöøùúûüýÿĀāĂăĆćĈĉĊċČčĎďĐđĒēĔĕĖėęĚěĜĝĞğĠġĢģĤĥĨĩĪīĬĭİĴĵĶķĹĺĻļĽľĿŀŃńŅņŇňŉŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝşŠšŤťŨũŪūŬŭŮůŰűŴŵŶŷŸŹźŻżŽžƠơǍǎǏǐǑǒǓǔǞǟǢǣǦǧǨǩǮǯǴǵǺǻǼǽǾǿȘȚțȦȧȪȫȬȭȮȯȰȱȲȳʼ̂̃̄̈̊ḌḍḐḑḒḓḤḥḼḽṄṅṊṋṠṡṢṣṬṭṰṱẀẁẂẃẄẅẒẓẸẹẼẽỊịỌọỤụỲỳỸỹ-]+$/;
  return nameRegex.test(name);
};
